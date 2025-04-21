import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <div className="text-center space-y-6">
        <AlertTriangle className="h-16 w-16 text-destructive mx-auto" />
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          The page you're looking for doesn't exist.
        </p>
        <Link to="/">
          <Button>
            <Home className="mr-2 h-4 w-4" />
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
