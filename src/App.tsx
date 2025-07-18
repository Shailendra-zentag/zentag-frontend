import React, { Suspense, lazy } from "react";
import { Toaster } from "sonner";
// import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import LoadingScreen from "./layouts/LoadingScreen.tsx";
// import "./App.css";

const queryClient = new QueryClient();

// const Index = lazy(() => import("./pages/Index"));
const Login = lazy(() => import("./pages/LoginPage"));
const Signup = lazy(() => import("./pages/SignupPage"));
const LoginSSO = lazy(() => import("./pages/SSOPage"));
const Dashboard = lazy(() => import("./pages/DashboardPage"));
const Clips = lazy(() => import("./pages/ClipsPage"));

type ErrorBoundaryProps = { children: React.ReactNode };
type ErrorBoundaryState = { hasError: boolean; error: Error | null };

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: "red", padding: 24, textAlign: "center" }}>
          <h2>Something went wrong.</h2>
          <pre>{this.state.error && this.state.error.message}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const isLoggedIn = localStorage.getItem("userId");

return (
  <QueryClientProvider client={queryClient}>
    {/* <TooltipProvider> */}
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <LoadingScreen />
            </div>
          }
        >
          <>
            <Routes>
              {/* <Route path="/" element={<Index />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login-sso" element={<LoginSSO />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clips" element={<Clips />} />
              </Route>

              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/dashboard" replace />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
            </Routes>

            <Toaster
              position="top-right"
              toastOptions={{
                style: {
                  background: "#1B1B1B",
                  color: "#fff",
                  border: "1px solid #373737",
                },
              }}
            />
          </>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
    {/* </TooltipProvider> */}
  </QueryClientProvider>
);

}

export default App;
