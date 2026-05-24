import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export function AdminToggle() {
  const navigate = useNavigate();
  const [clicks, setClicks] = useState<number[]>([]);

  useEffect(() => {
    if (clicks.length === 0) return;
    const recent = clicks.filter((t) => Date.now() - t < 3000);
    if (recent.length >= 3) {
      setClicks([]);
      navigate({ to: "/admin/login" });
    }
  }, [clicks, navigate]);

  return (
    <button
      aria-hidden
      tabIndex={-1}
      onClick={() => setClicks((c) => [...c, Date.now()].filter((t) => Date.now() - t < 3000))}
      className="fixed bottom-3 left-3 z-30 h-2 w-2 bg-espresso/40 hover:bg-espresso/60 transition-opacity"
      style={{ outline: "none", border: "none" }}
    />
  );
}
