import { Outlet } from "react-router-dom";
import Header from "./components/Header";

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-6xl p-6">
        <Outlet />
      </main>
    </div>
  );
}