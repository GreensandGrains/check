import { useQuery } from '@tanstack/react-query';
import { Link } from 'wouter';
import { Plus, Code, Folder, Bot, User, LogOut, BarChart3 } from 'lucide-react';

export default function Dashboard() {
  const { data: user } = useQuery({
    queryKey: ['/api/auth/user'],
    retry: false,
  });

  const { data: projects = [] } = useQuery({
    queryKey: ['/api/projects'],
  });

  const { data: stats } = useQuery({
    queryKey: ['/api/user/stats'],
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <Code className="h-8 w-8 text-white" />
                <span className="text-xl font-bold">CodeForge</span>
              </div>
              
              <nav className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-white font-medium">
                  Dashboard
                </Link>
                <Link href="/projects" className="text-gray-400 hover:text-white transition-colors">
                  Projects
                </Link>
                <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link href="/profile" className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
                <User className="w-5 h-5" />
              </Link>
              <a href="/api/logout" className="p-2 rounded-lg hover:bg-gray-800 transition-colors">
                <LogOut className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}!
          </h1>
          <p className="text-gray-400">
            Ready to build something amazing today?
          </p>
        </div>

        {/* Quick Stats */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Projects</p>
                  <p className="text-2xl font-bold">{stats.projectCount}</p>
                </div>
                <Folder className="w-8 h-8 text-blue-400" />
              </div>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">AI Sessions</p>
                  <p className="text-2xl font-bold">{stats.sessionCount}</p>
                </div>
                <Bot className="w-8 h-8 text-green-400" />
              </div>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Tokens Used</p>
                  <p className="text-2xl font-bold">{stats.tokensUsed}</p>
                  <p className="text-xs text-gray-500">of {stats.tokensLimit}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-400" />
              </div>
            </div>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Plan</p>
                  <p className="text-2xl font-bold capitalize">{stats.plan}</p>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"></div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Projects */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Projects</h2>
            <Link href="/projects" className="text-blue-400 hover:text-blue-300 transition-colors">
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* New Project Card */}
            <Link href="/projects">
              <div className="bg-gray-800/30 border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-gray-500 transition-colors cursor-pointer">
                <Plus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Create New Project</h3>
                <p className="text-gray-400 text-sm">Start building something awesome</p>
              </div>
            </Link>

            {/* Project Cards */}
            {projects.slice(0, 5).map((project: any) => (
              <Link key={project.id} href={`/editor/${project.id}`}>
                <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-gray-600 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Code className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                      {project.language}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-2">{project.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description || 'No description'}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>
                      {project.isPublic ? 'Public' : 'Private'}
                    </span>
                    <span>
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {projects.length === 0 && (
            <div className="text-center py-12">
              <Folder className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No projects yet</h3>
              <p className="text-gray-400 mb-6">Create your first project to get started</p>
              <Link href="/projects">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Create Project
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* AI Assistant Quick Access */}
        <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">AI Coding Assistant</h3>
              <p className="text-gray-300">Get help with your code, fix bugs, and learn new techniques</p>
            </div>
            <Link href="/projects">
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Start Coding
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}