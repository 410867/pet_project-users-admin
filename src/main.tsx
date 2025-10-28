import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import AppLayout from "./App";
import "./index.css";
import EditUserPage from "./pages/EditUserPage";
import UsersPage from "./pages/UsersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <Navigate to="/edit-users" replace /> },
      { path: "edit-users", element: <EditUserPage /> },
      { path: "users", element: <UsersPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
