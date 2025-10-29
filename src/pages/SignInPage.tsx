import { useState } from "react";
import { useAuth } from "@/features/auth/useAuth";
import { useNavigate, Link } from "react-router-dom";

export default function SignInPage() {
  const { signIn } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signIn(email, pass);
    nav("/todos");
  };

  return (
    <section className="p-8 max-w-md mx-auto space-y-4">
      <h2 className="text-center tracking-[0.3em] font-semibold">SIGN IN</h2>

      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="border px-3 py-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border px-3 py-2 w-full"
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <button type="submit" className="w-full px-4 py-2 bg-slate-900 text-white">
          Sign In
        </button>
      </form>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link className="underline" to="/signup">
          Sign up
        </Link>
      </p>
    </section>
  );
}
