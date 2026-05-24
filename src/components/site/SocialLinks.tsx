import { MessageCircle, Mail, Instagram } from "lucide-react";
import { SOCIAL } from "@/data/site";

export function SocialLinks({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const wa = `https://wa.me/${SOCIAL.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hello Mileyn Events — I'd like to discuss an event."
  )}`;
  const ig = `https://instagram.com/${SOCIAL.instagram}`;
  const mail = `mailto:${SOCIAL.email}?subject=${encodeURIComponent("Event Inquiry — Mileyn Events")}`;

  const items = [
    { Icon: MessageCircle, href: wa, label: "WhatsApp" },
    { Icon: Mail, href: mail, label: "Email" },
    { Icon: Instagram, href: ig, label: "Instagram" },
  ];

  const ring = tone === "dark" ? "border-amber-gold/60 hover:bg-amber-gold" : "border-amber-gold hover:bg-amber-gold";
  const icon = tone === "dark" ? "text-amber-gold group-hover:text-espresso" : "text-amber-gold group-hover:text-cream";

  return (
    <div className="flex gap-3">
      {items.map(({ Icon, href, label }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel="noreferrer"
          aria-label={label}
          className={`group flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${ring}`}
        >
          <Icon className={`h-4 w-4 transition-colors ${icon}`} strokeWidth={1.4} />
        </a>
      ))}
    </div>
  );
}
