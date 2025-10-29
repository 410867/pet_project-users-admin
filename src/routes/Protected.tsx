import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth/useAuth";

export default function Protected({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="p-8">Loading…</div>;
  if (!user) return <Navigate to="/auth" replace />;
  
  return <>{children}</>;
}
