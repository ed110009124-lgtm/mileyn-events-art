import { Instagram, Facebook } from "lucide-react";
import { GoldenThread } from "./GoldenThread";

export function Footer() {
  return (
    <footer className="bg-espresso text-cream px-6 py-20 md:px-10">
      <div className="mx-auto max-w-7xl flex flex-col items-center text-center">
        <div className="flex flex-col leading-none">
          <span className="logo-mileyn text-[28px]">Mileyn</span>
          <span className="logo-events text-[10px] mt-2">Events</span>
        </div>
        <div className="my-8">
          <GoldenThread width={60} />
        </div>
        <p className="font-display text-xl font-light italic text-cream/80 max-w-md">
          Curators of refined experiences.
        </p>

        <div className="mt-12 flex gap-4">
          {[
            { Icon: Instagram, href: "https://instagram.com" },
            { Icon: Facebook, href: "https://facebook.com" },
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-amber-gold/60 transition-colors hover:bg-amber-gold"
            >
              <Icon className="h-4 w-4 text-amber-gold transition-colors group-hover:text-espresso" strokeWidth={1.4} />
            </a>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.25em] text-cream/70">
          <a href="#" className="hover:text-amber-gold transition-colors">Privacy</a>
          <span className="h-1 w-1 rounded-full bg-amber-gold/60" />
          <a href="#" className="hover:text-amber-gold transition-colors">Terms</a>
        </div>
        <p className="mt-8 text-xs text-taupe">© 2025 Mileyn Events. All rights reserved.</p>
      </div>
    </footer>
  );
}
