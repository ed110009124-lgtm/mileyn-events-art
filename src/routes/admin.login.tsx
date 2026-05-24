import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (u.trim() === "mileyn" && p === "12345") {
      sessionStorage.setItem("mileyn-admin", "1");
      navigate({ to: "/admin" });
    } else {
      setErr("Invalid credentials.");
    }
  };

  return (
    <main className="min-h-screen bg-espresso text-cream flex items-center justify-center px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm bg-charcoal/60 border border-amber-gold/30 p-10 backdrop-blur"
      >
        <h1 className="font-display text-3xl text-amber-gold">Mileyn Admin</h1>
        <p className="text-cream/70 text-xs uppercase tracking-[0.3em] mt-1">Restricted Access</p>

        <label className="block mt-8 text-[10px] uppercase tracking-[0.3em] text-cream/70">Username</label>
        <input
          autoFocus
          value={u}
          onChange={(e) => setU(e.target.value)}
          className="mt-2 w-full bg-transparent border-b border-cream/30 py-2 text-cream focus:outline-none focus:border-amber-gold"
        />

        <label className="block mt-6 text-[10px] uppercase tracking-[0.3em] text-cream/70">Password</label>
        <input
          type="password"
          value={p}
          onChange={(e) => setP(e.target.value)}
          className="mt-2 w-full bg-transparent border-b border-cream/30 py-2 text-cream focus:outline-none focus:border-amber-gold"
        />

        {err && <p className="mt-4 text-xs text-red-300">{err}</p>}

        <button
          type="submit"
          className="mt-8 w-full bg-amber-gold text-espresso font-medium px-6 py-3 text-xs tracking-[0.3em] uppercase hover:bg-amber-gold/90 transition-colors"
        >
          Sign In
        </button>
      </form>
    </main>
  );
}
