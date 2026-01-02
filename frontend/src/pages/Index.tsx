import { Navigate } from "react-router-dom";

// This page redirects based on auth state
// Actual logic is handled in App.tsx
const Index = () => {
  return <Navigate to="/auth" replace />;
};

export default Index;
