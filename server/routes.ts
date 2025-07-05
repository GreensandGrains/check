import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { aiAssistant } from "./aiAssistant";
import { insertProjectSchema, insertAiSessionSchema, insertPricingPlanSchema } from "../shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Project routes
  app.get('/api/projects', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const projects = await storage.getProjects(userId);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  app.get('/api/projects/:id', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const project = await storage.getProject(projectId);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      // Check if user owns the project or it's public
      if (project.userId !== req.user.claims.sub && !project.isPublic) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  app.post('/api/projects', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const projectData = insertProjectSchema.parse({
        ...req.body,
        userId
      });
      
      const project = await storage.createProject(projectData);
      res.status(201).json(project);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  app.patch('/api/projects/:id', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      
      // Check if user owns the project
      const existingProject = await storage.getProject(projectId);
      if (!existingProject || existingProject.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      const updates = req.body;
      const project = await storage.updateProject(projectId, updates);
      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  app.delete('/api/projects/:id', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const userId = req.user.claims.sub;
      
      // Check if user owns the project
      const existingProject = await storage.getProject(projectId);
      if (!existingProject || existingProject.userId !== userId) {
        return res.status(403).json({ message: "Access denied" });
      }
      
      await storage.deleteProject(projectId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // AI Assistant routes
  app.post('/api/ai/chat', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { message, projectId, language = "javascript" } = req.body;
      
      // Check user's token usage
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      if (user.tokensUsed >= user.tokensLimit) {
        return res.status(429).json({ 
          message: "Token limit exceeded. Please upgrade your plan.",
          tokensUsed: user.tokensUsed,
          tokensLimit: user.tokensLimit
        });
      }
      
      // Generate AI response
      const aiResponse = await aiAssistant.generateResponse({
        language,
        question: message,
        code: req.body.code || "",
        error: req.body.error || ""
      });
      
      // Update user's token usage
      const newTokensUsed = user.tokensUsed + aiResponse.tokensUsed;
      await storage.updateUserTokens(userId, newTokensUsed);
      
      // Create or update AI session
      let sessionData = {
        userId,
        projectId: projectId || null,
        messages: [
          { role: "user", content: message, timestamp: new Date() },
          { role: "assistant", content: aiResponse.response, timestamp: new Date() }
        ],
        tokensUsed: aiResponse.tokensUsed
      };
      
      const session = await storage.createAiSession(sessionData);
      
      res.json({
        ...aiResponse,
        sessionId: session.id,
        remainingTokens: user.tokensLimit - newTokensUsed
      });
    } catch (error) {
      console.error("Error in AI chat:", error);
      res.status(500).json({ message: "Failed to process AI request" });
    }
  });

  app.get('/api/ai/sessions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const sessions = await storage.getAiSessions(userId);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching AI sessions:", error);
      res.status(500).json({ message: "Failed to fetch AI sessions" });
    }
  });

  app.get('/api/ai/snippets/:language', isAuthenticated, async (req: any, res) => {
    try {
      const language = req.params.language;
      const snippets = aiAssistant.getAvailableSnippets(language);
      res.json(snippets);
    } catch (error) {
      console.error("Error fetching snippets:", error);
      res.status(500).json({ message: "Failed to fetch snippets" });
    }
  });

  app.get('/api/ai/snippets/:language/:name', isAuthenticated, async (req: any, res) => {
    try {
      const { language, name } = req.params;
      const snippet = aiAssistant.getCodeSnippet(language, name);
      res.json({ snippet });
    } catch (error) {
      console.error("Error fetching snippet:", error);
      res.status(500).json({ message: "Failed to fetch snippet" });
    }
  });

  // Pricing routes
  app.get('/api/pricing', async (req, res) => {
    try {
      const plans = await storage.getPricingPlans();
      res.json(plans);
    } catch (error) {
      console.error("Error fetching pricing plans:", error);
      res.status(500).json({ message: "Failed to fetch pricing plans" });
    }
  });

  app.post('/api/pricing', isAuthenticated, async (req: any, res) => {
    try {
      // This would typically be admin-only
      const planData = insertPricingPlanSchema.parse(req.body);
      const plan = await storage.createPricingPlan(planData);
      res.status(201).json(plan);
    } catch (error) {
      console.error("Error creating pricing plan:", error);
      res.status(500).json({ message: "Failed to create pricing plan" });
    }
  });

  // User subscription info
  app.get('/api/user/subscription', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const subscription = await storage.getUserSubscription(userId);
      res.json(subscription);
    } catch (error) {
      console.error("Error fetching subscription:", error);
      res.status(500).json({ message: "Failed to fetch subscription" });
    }
  });

  // User stats
  app.get('/api/user/stats', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      const projects = await storage.getProjects(userId);
      const sessions = await storage.getAiSessions(userId);
      
      res.json({
        tokensUsed: user?.tokensUsed || 0,
        tokensLimit: user?.tokensLimit || 1000,
        projectCount: projects.length,
        sessionCount: sessions.length,
        plan: user?.plan || 'free'
      });
    } catch (error) {
      console.error("Error fetching user stats:", error);
      res.status(500).json({ message: "Failed to fetch user stats" });
    }
  });

  // Initialize default pricing plans
  app.post('/api/admin/init-pricing', async (req, res) => {
    try {
      const defaultPlans = [
        {
          name: "Free",
          price: 0,
          tokensLimit: 1000,
          features: ["1,000 AI tokens/month", "Up to 5 projects", "Basic code assistance"]
        },
        {
          name: "Pro",
          price: 599, // $5.99
          tokensLimit: 10000,
          features: ["10,000 AI tokens/month", "Unlimited projects", "Advanced code assistance", "Priority support"]
        },
        {
          name: "Team",
          price: 1499, // $14.99
          tokensLimit: 50000,
          features: ["50,000 AI tokens/month", "Team collaboration", "Advanced features", "24/7 support"]
        }
      ];

      for (const plan of defaultPlans) {
        await storage.createPricingPlan(plan);
      }
      
      res.json({ message: "Default pricing plans created" });
    } catch (error) {
      console.error("Error initializing pricing:", error);
      res.status(500).json({ message: "Failed to initialize pricing" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}