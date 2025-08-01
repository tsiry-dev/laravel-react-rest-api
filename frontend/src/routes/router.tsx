import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../views/Login";
import Signup from "../views/Signup";
import Users from "../views/Users";
import NotFound from "../views/NotFound";
import GuestLayouts from "../components/GuestLayouts";
import AppLayout from "../components/AppLayout";
import Dashboard from "../views/Dashboard";

const router = createBrowserRouter([
  {
     path: "/",
     element: <AppLayout />,
     children: [
         {
            path: "/",
            element: <Navigate to="/users"/>
         },
         {
            path: "/users",
            element: <Users />
         },
         {
            path: "/dashboard",
            element: <Dashboard />
         },
     ]
  },
  {
     path: "/",
     element: <GuestLayouts />,
     children: [
         {
            path: "/login",
            element: <Login />
         },
         {
            path: "/signup",
            element: <Signup />
         }
     ]
  },
  {
     path: "*",
     element: <NotFound />
  }
]);

export default router;
