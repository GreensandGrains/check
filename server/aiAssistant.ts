// Simple AI assistant that provides coding help without external APIs
// This is a rule-based system with common coding patterns and suggestions

interface CodeContext {
  language: string;
  code: string;
  error?: string;
  question?: string;
}

interface AIResponse {
  response: string;
  suggestions: string[];
  codeExample?: string;
  tokensUsed: number;
}

export class LocalAIAssistant {
  private patterns = {
    javascript: {
      common_errors: [
        { pattern: /Cannot read property.*of undefined/, solution: "Check if the object exists before accessing its properties. Use optional chaining (?.) or conditional checks." },
        { pattern: /ReferenceError.*is not defined/, solution: "Make sure the variable is declared and imported properly." },
        { pattern: /SyntaxError.*Unexpected token/, solution: "Check for missing brackets, semicolons, or incorrect syntax." },
        { pattern: /TypeError.*is not a function/, solution: "Verify that the variable is actually a function before calling it." },
      ],
      snippets: {
        "react component": `function Component() {
  const [state, setState] = useState(initialValue);
  
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
}`,
        "async function": `async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}`,
        "express route": `app.get('/api/endpoint', async (req, res) => {
  try {
    const data = await someAsyncOperation();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`,
      }
    },
    python: {
      common_errors: [
        { pattern: /NameError.*is not defined/, solution: "Check if the variable is defined and spelled correctly." },
        { pattern: /IndentationError/, solution: "Fix the indentation - Python uses consistent spaces or tabs." },
        { pattern: /TypeError.*takes.*positional argument/, solution: "Check the function signature and pass the correct number of arguments." },
        { pattern: /AttributeError.*has no attribute/, solution: "Verify the object has the attribute or method you're trying to access." },
      ],
      snippets: {
        "function": `def function_name(param1, param2):
    """
    Function description
    """
    result = param1 + param2
    return result`,
        "class": `class MyClass:
    def __init__(self, value):
        self.value = value
    
    def method(self):
        return self.value`,
        "flask route": `@app.route('/api/endpoint', methods=['GET', 'POST'])
def endpoint():
    if request.method == 'POST':
        data = request.get_json()
        return jsonify(data)
    return jsonify({'message': 'Hello World'})`,
      }
    },
    html: {
      snippets: {
        "basic structure": `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>`,
        "form": `<form action="/submit" method="POST">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required>
    
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    
    <button type="submit">Submit</button>
</form>`,
      }
    },
    css: {
      snippets: {
        "flexbox": `.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
}`,
        "grid": `.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
}`,
      }
    }
  };

  private keywordResponses = {
    "create function": "Here's how to create a function in different languages:",
    "fix error": "Let me help you debug this error:",
    "best practices": "Here are some best practices for clean code:",
    "optimize": "Here are some optimization techniques:",
    "deploy": "Here's how to deploy your application:",
    "database": "Here's how to work with databases:",
    "api": "Here's how to create API endpoints:",
    "authentication": "Here's how to implement authentication:",
    "responsive": "Here's how to make responsive designs:",
    "testing": "Here's how to write tests:",
  };

  async generateResponse(context: CodeContext): Promise<AIResponse> {
    const { language, code, error, question } = context;
    let response = "";
    let suggestions: string[] = [];
    let codeExample = "";
    let tokensUsed = 50; // Simulate token usage

    // Handle errors first
    if (error) {
      response = this.handleError(error, language);
      suggestions = this.getErrorSuggestions(error, language);
      tokensUsed += 30;
    }
    // Handle questions
    else if (question) {
      const questionResponse = this.handleQuestion(question, language);
      response = questionResponse.response;
      suggestions = questionResponse.suggestions;
      codeExample = questionResponse.codeExample;
      tokensUsed += 40;
    }
    // Code analysis
    else if (code) {
      const analysis = this.analyzeCode(code, language);
      response = analysis.response;
      suggestions = analysis.suggestions;
      tokensUsed += 35;
    }
    // Default response
    else {
      response = `I'm here to help with your ${language} code! You can ask me about:
- Debugging errors
- Code optimization
- Best practices
- Creating functions and components
- Database operations
- API development`;
      suggestions = ["Ask me about specific errors", "Show me code to review", "Ask for coding examples"];
      tokensUsed += 25;
    }

    return {
      response,
      suggestions,
      codeExample,
      tokensUsed
    };
  }

  private handleError(error: string, language: string): string {
    const langPatterns = this.patterns[language as keyof typeof this.patterns];
    
    if (langPatterns && langPatterns.common_errors) {
      for (const errorPattern of langPatterns.common_errors) {
        if (errorPattern.pattern.test(error)) {
          return `🔧 **Error Analysis:**\n\n${errorPattern.solution}\n\n**Common causes:**\n- Check your variable declarations\n- Verify imports and dependencies\n- Review the syntax around the error location`;
        }
      }
    }

    return `🔧 **Error Analysis:**\n\nI can help you debug this ${language} error. Here are some general debugging steps:\n\n1. Check the error location carefully\n2. Verify variable names and spelling\n3. Check for missing imports or dependencies\n4. Review the syntax around the error\n5. Look for missing brackets, semicolons, or quotes`;
  }

  private getErrorSuggestions(error: string, language: string): string[] {
    return [
      "Check variable declarations",
      "Verify imports and dependencies",
      "Review syntax around error location",
      "Add proper error handling",
      "Use debugging tools or console.log",
      "Check documentation for correct usage"
    ];
  }

  private handleQuestion(question: string, language: string): { response: string; suggestions: string[]; codeExample: string } {
    const lowerQuestion = question.toLowerCase();
    
    // Check for keyword matches
    for (const [keyword, baseResponse] of Object.entries(this.keywordResponses)) {
      if (lowerQuestion.includes(keyword)) {
        return this.getDetailedResponse(keyword, language);
      }
    }

    // Default question response
    return {
      response: `I'd be happy to help with your ${language} question! Could you be more specific about what you're trying to achieve?`,
      suggestions: [
        "Ask about specific functions or features",
        "Show me the code you're working with",
        "Describe the problem you're trying to solve"
      ],
      codeExample: ""
    };
  }

  private getDetailedResponse(keyword: string, language: string): { response: string; suggestions: string[]; codeExample: string } {
    const langPatterns = this.patterns[language as keyof typeof this.patterns];
    
    switch (keyword) {
      case "create function":
        return {
          response: `Here's how to create a function in ${language}:`,
          suggestions: ["Add parameters", "Include error handling", "Add documentation", "Consider async/await if needed"],
          codeExample: langPatterns?.snippets?.["function"] || langPatterns?.snippets?.["async function"] || "// Function example not available for this language"
        };
      
      case "fix error":
        return {
          response: "Let me help you debug this error. Please share the specific error message.",
          suggestions: ["Share the error message", "Show the problematic code", "Check console for more details"],
          codeExample: ""
        };
      
      case "best practices":
        return {
          response: `Here are some ${language} best practices:`,
          suggestions: [
            "Use meaningful variable names",
            "Keep functions small and focused",
            "Add proper error handling",
            "Write comments for complex logic",
            "Use consistent formatting",
            "Follow language-specific conventions"
          ],
          codeExample: ""
        };
      
      default:
        return {
          response: `I can help you with ${keyword} in ${language}. What specifically would you like to know?`,
          suggestions: ["Be more specific about your needs", "Show me your current code", "Ask about implementation details"],
          codeExample: ""
        };
    }
  }

  private analyzeCode(code: string, language: string): { response: string; suggestions: string[] } {
    const suggestions: string[] = [];
    let response = `📊 **Code Analysis for ${language}:**\n\n`;

    // Basic code quality checks
    if (code.length < 50) {
      response += "This is a short code snippet. ";
      suggestions.push("Consider adding more context or functionality");
    } else if (code.length > 1000) {
      response += "This is a substantial piece of code. ";
      suggestions.push("Consider breaking it into smaller functions");
    }

    // Language-specific analysis
    if (language === "javascript") {
      if (code.includes("var ")) {
        suggestions.push("Consider using 'let' or 'const' instead of 'var'");
      }
      if (code.includes("== ")) {
        suggestions.push("Consider using '===' for strict equality");
      }
      if (!code.includes("try") && code.includes("await")) {
        suggestions.push("Add try-catch blocks for async operations");
      }
    }

    if (language === "python") {
      if (code.includes("except:")) {
        suggestions.push("Use specific exception types instead of bare except");
      }
      if (code.split('\n').some(line => line.trim().length > 79)) {
        suggestions.push("Consider breaking long lines (PEP 8 recommends < 79 characters)");
      }
    }

    // General suggestions
    if (!code.includes("//") && !code.includes("#")) {
      suggestions.push("Add comments to explain complex logic");
    }

    response += suggestions.length > 0 ? "I found some areas for improvement." : "The code looks good overall!";

    return { response, suggestions };
  }

  // Get code snippet by name
  getCodeSnippet(language: string, snippetName: string): string {
    const langPatterns = this.patterns[language as keyof typeof this.patterns];
    return langPatterns?.snippets?.[snippetName] || "Snippet not found";
  }

  // Get available snippets for a language
  getAvailableSnippets(language: string): string[] {
    const langPatterns = this.patterns[language as keyof typeof this.patterns];
    return langPatterns?.snippets ? Object.keys(langPatterns.snippets) : [];
  }
}

export const aiAssistant = new LocalAIAssistant();