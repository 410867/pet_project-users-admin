import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import UsersPage from "./pages/UsersPage";
import EditUserPage from "./pages/EditUserPage";

import Protected from "./routes/Protected";
import TodosPage from "./pages/TodosPage";
import ProfilePage from "./pages/ProfilePage";
import AuthPage from "./pages/AuthPage";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />

        <Route path="/users" element={<UsersPage />} />
        <Route path="/edit-users" element={<EditUserPage />} />

        <Route path="/auth" element={<AuthPage />} />
        <Route path="/todos" element={<Protected><TodosPage /></Protected>} />
        <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />

        <Route path="*" element={<div className="p-8">Not found</div>} />
      </Routes>
    </div>
  );
}
