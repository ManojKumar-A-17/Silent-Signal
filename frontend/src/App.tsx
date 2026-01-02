import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import DropSignal from "./pages/DropSignal";
import Analysis from "./pages/Analysis";
import Feed from "./pages/Feed";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuth = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" />
        <BrowserRouter>
          <div className="min-h-screen">
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
            <Routes>
              {/* Auth Route */}
              <Route
                path="/auth"
                element={
                  isAuthenticated ? (
                    <Navigate to="/" replace />
                  ) : (
                    <Auth onAuth={handleAuth} />
                  )
                }
              />

              {/* Protected Routes */}
              <Route
                path="/"
                element={
                  isAuthenticated ? (
                    <Home />
                  ) : (
                    <Navigate to="/auth" replace />
                  )
                }
              />
              <Route
                path="/drop-signal"
                element={
                  isAuthenticated ? (
                    <DropSignal />
                  ) : (
                    <Navigate to="/auth" replace />
                  )
                }
              />
              <Route
                path="/analysis"
                element={
                  isAuthenticated ? (
                    <Analysis />
                  ) : (
                    <Navigate to="/auth" replace />
                  )
                }
              />
              <Route
                path="/feed"
                element={
                  isAuthenticated ? (
                    <Feed />
                  ) : (
                    <Navigate to="/auth" replace />
                  )
                }
              />
              <Route
                path="/about"
                element={
                  isAuthenticated ? (
                    <About />
                  ) : (
                    <Navigate to="/auth" replace />
                  )
                }
              />

              {/* Catch-all */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
