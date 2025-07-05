import { Switch, Route } from 'wouter';
import { useAuth } from './hooks/useAuth';
import { Toaster } from './components/ui/toaster';
import { ThemeProvider } from './components/ThemeProvider';

// Pages
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Editor from './pages/Editor';
import Pricing from './pages/Pricing';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

// Loading component
import LoadingSpinner from './components/LoadingSpinner';

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Switch>
      {!isAuthenticated ? (
        <>
          <Route path="/" component={Landing} />
          <Route path="/pricing" component={Pricing} />
          <Route component={NotFound} />
        </>
      ) : (
        <>
          <Route path="/" component={Dashboard} />
          <Route path="/projects" component={Projects} />
          <Route path="/editor/:id" component={Editor} />
          <Route path="/pricing" component={Pricing} />
          <Route path="/profile" component={Profile} />
          <Route component={NotFound} />
        </>
      )}
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground">
        <Router />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;