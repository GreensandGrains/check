import { Link } from 'wouter';
import { Code2, Zap, Globe, ArrowRight, Play, Star, Users } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 backdrop-blur-sm bg-black/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-white" />
              <span className="text-xl font-bold">CodeForge</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">
                About
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <a
                href="/api/login"
                className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Sign In
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Code. Build. Deploy.
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The fastest way to build and deploy your projects with AI-powered coding assistance. 
              Start coding in seconds, no setup required.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a
                href="/api/login"
                className="bg-white text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center space-x-2"
              >
                <span>Start Coding Free</span>
                <ArrowRight className="w-5 h-5" />
              </a>
              <button className="border border-gray-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:border-gray-400 transition-colors flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50K+</div>
                <div className="text-gray-400">Developers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">1M+</div>
                <div className="text-gray-400">Projects Built</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">99.9%</div>
                <div className="text-gray-400">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need to code
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              From idea to deployment, our platform provides all the tools you need to build amazing projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">AI-Powered Coding</h3>
              <p className="text-gray-400 mb-6">
                Get intelligent code suggestions, error fixes, and optimizations powered by our own AI assistant.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Smart code completion</li>
                <li>• Error detection & fixes</li>
                <li>• Code optimization tips</li>
                <li>• Multiple language support</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-6">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Instant Deployment</h3>
              <p className="text-gray-400 mb-6">
                Deploy your applications with a single click. No complex configuration or setup required.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• One-click deployment</li>
                <li>• Global CDN</li>
                <li>• Auto-scaling</li>
                <li>• Custom domains</li>
              </ul>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8 hover:border-gray-600 transition-colors">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Real-time Collaboration</h3>
              <p className="text-gray-400 mb-6">
                Work together with your team in real-time. Share projects and collaborate seamlessly.
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Live collaboration</li>
                <li>• Version control</li>
                <li>• Team management</li>
                <li>• Comment system</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Affordable pricing for everyone
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Start free and scale with our budget-friendly plans. No hidden fees.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Free Plan */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Free</h3>
              <div className="text-4xl font-bold mb-6">$0<span className="text-lg text-gray-400">/month</span></div>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li>1,000 AI tokens/month</li>
                <li>Up to 5 projects</li>
                <li>Basic code assistance</li>
                <li>Community support</li>
              </ul>
              <a
                href="/api/login"
                className="block w-full bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Start Free
              </a>
            </div>

            {/* Pro Plan */}
            <div className="bg-gradient-to-b from-blue-600 to-blue-700 border border-blue-500 rounded-xl p-8 text-center relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Pro</h3>
              <div className="text-4xl font-bold mb-6">$5.99<span className="text-lg text-blue-200">/month</span></div>
              <ul className="space-y-3 text-blue-100 mb-8">
                <li>10,000 AI tokens/month</li>
                <li>Unlimited projects</li>
                <li>Advanced code assistance</li>
                <li>Priority support</li>
              </ul>
              <a
                href="/api/login"
                className="block w-full bg-white text-blue-600 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Get Pro
              </a>
            </div>

            {/* Team Plan */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Team</h3>
              <div className="text-4xl font-bold mb-6">$14.99<span className="text-lg text-gray-400">/month</span></div>
              <ul className="space-y-3 text-gray-300 mb-8">
                <li>50,000 AI tokens/month</li>
                <li>Team collaboration</li>
                <li>Advanced features</li>
                <li>24/7 support</li>
              </ul>
              <a
                href="/api/login"
                className="block w-full bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                Get Team
              </a>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/pricing" className="text-blue-400 hover:text-blue-300 transition-colors">
              View detailed pricing →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to start building?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of developers who are already building amazing projects with our platform.
          </p>
          <a
            href="/api/login"
            className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Code2 className="h-6 w-6 text-white" />
              <span className="font-bold">CodeForge</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 CodeForge. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}