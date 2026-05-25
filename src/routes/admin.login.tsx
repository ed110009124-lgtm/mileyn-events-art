import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErr("");
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) {
      setErr("Invalid credentials.");
      return;
    }
    navigate({ to: "/admin" });
  };

  return (
    <main className="min-h-screen bg-espresso text-cream flex items-center justify-center px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-charcoal/60 border border-amber-gold/30 p-10 backdrop-blur"
      >
        <h1 className="font-display text-3xl text-amber-gold">Mileyn Admin</h1>
        <p className="text-cream/70 text-xs uppercase tracking-[0.3em] mt-1">Restricted Access</p>

        <label className="block mt-8 text-[10px] uppercase tracking-[0.3em] text-cream/70">Email</label>
        <input
          autoFocus
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full bg-transparent border-b border-cream/30 py-2 text-cream focus:outline-none focus:border-amber-gold"
        />

        <label className="block mt-6 text-[10px] uppercase tracking-[0.3em] text-cream/70">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full bg-transparent border-b border-cream/30 py-2 text-cream focus:outline-none focus:border-amber-gold"
        />

        {err && <p className="mt-4 text-xs text-red-300">{err}</p>}

        <button
          type="submit"
          disabled={busy}
          className="mt-8 w-full bg-amber-gold text-espresso font-medium px-6 py-3 text-xs tracking-[0.3em] uppercase hover:bg-amber-gold/90 transition-colors disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign In"}
        </button>

        <p className="mt-6 text-[10px] text-cream/50 leading-relaxed">
          Admin accounts are created in your Lovable Cloud users panel. Use the email and password set there.
        </p>
      </form>
    </main>
  );
}
