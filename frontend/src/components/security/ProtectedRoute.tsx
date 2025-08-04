import { useEffect, useState, type ReactNode } from "react"
import axiosClient from "../../services/apiClient";
import { Navigate } from "react-router-dom";
import LoaderBar from "../loaders/LoaderBar";

interface PropsProtectedRouteProps  {
    children: ReactNode;
    role: string[];
}

export default function ProtectedRoute({ children, role }: PropsProtectedRouteProps) {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    axiosClient.get("/user")
      .then(({ data }) => {
        if (isMounted) {
          const userRole = data?.data?.role;
          setAuthorized(role.includes(userRole));
        }
      })
      .catch(() => {
        setAuthorized(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (authorized === null) {
    return <LoaderBar />
  }

  if (!authorized) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}



