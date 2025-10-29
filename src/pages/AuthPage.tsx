import { useMemo, useState } from "react";
import { useAuth } from "@/features/auth/useAuth";
import { useNavigate, useSearchParams, Link } from "react-router-dom";

type Mode = "login" | "register";

export default function AuthPage() {
  const [params, setParams] = useSearchParams();
  const mode = (params.get("mode") as Mode) || "login";

  return (
    <section className="p-8 max-w-md mx-auto space-y-6">
      <h2 className="text-center tracking-[0.3em] font-semibold">
        {mode === "login" ? "SIGN IN" : "SIGN UP"}
      </h2>

      <AuthModeSwitcher mode={mode} setMode={(m) => setParams({ mode: m })} />

      {mode === "login" ? <SignInForm /> : <SignUpForm />}
    </section>
  );
}

function AuthModeSwitcher({ mode, setMode }: { mode: Mode; setMode: (m: Mode) => void }) {
  const btn =
    "w-full px-4 py-2 border text-sm transition-colors cursor-pointer font-medium";
  const active = "bg-slate-900 text-white border-slate-900";
  const ghost = "bg-white hover:bg-gray-50";

  return (
    <div className="grid grid-cols-2 gap-2">
      <button
        className={`${btn} ${mode === "login" ? active : ghost}`}
        onClick={() => setMode("login")}
      >
        Login
      </button>
      <button
        className={`${btn} ${mode === "register" ? active : ghost}`}
        onClick={() => setMode("register")}
      >
        Register
      </button>
    </div>
  );
}

function SignInForm() {
  const { signIn } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const disabled = useMemo(() => !email || !pass || loading, [email, pass, loading]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await signIn(email.trim(), pass);
      nav("/todos");
    } catch (e: any) {
      setErr(e?.message ?? "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        className="border px-3 py-2 w-full"
        placeholder="Email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border px-3 py-2 w-full"
        type="password"
        placeholder="Password"
        autoComplete="current-password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <button
        type="submit"
        disabled={disabled}
        className="w-full px-4 py-2 bg-slate-900 text-white disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>

      <p className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link className="underline" to="/auth?mode=register">
          Sign up
        </Link>
      </p>
    </form>
  );
}

function SignUpForm() {
  const { signUp } = useAuth();
  const nav = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const disabled = useMemo(
    () => !name.trim() || !email || pass.length < 6 || loading,
    [name, email, pass, loading]
  );

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await signUp(email.trim(), pass, name.trim());
      nav("/todos");
    } catch (e: any) {
      setErr(e?.message ?? "Failed to sign up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input
        className="border px-3 py-2 w-full"
        placeholder="Name"
        autoComplete="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="border px-3 py-2 w-full"
        placeholder="Email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border px-3 py-2 w-full"
        type="password"
        placeholder="Password (min 6)"
        autoComplete="new-password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      {err && <p className="text-red-600 text-sm">{err}</p>}
      <button
        type="submit"
        disabled={disabled}
        className="w-full px-4 py-2 bg-slate-900 text-white disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Creating..." : "Create Account"}
      </button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <Link className="underline" to="/auth?mode=login">
          Sign in
        </Link>
      </p>
    </form>
  );
}
