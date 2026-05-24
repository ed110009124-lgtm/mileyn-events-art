import { SOCIAL } from "@/data/site";
import { WhatsAppIcon, InstagramIcon, EmailIcon } from "./BrandIcons";

export function SocialLinks({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const wa = `https://wa.me/${SOCIAL.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
    "Hello Mileyn Events — I'd like to discuss an event."
  )}`;
  const ig = `https://instagram.com/${SOCIAL.instagram}`;
  const mail = `mailto:${SOCIAL.email}?subject=${encodeURIComponent("Event Inquiry — Mileyn Events")}`;

  const items = [
    { Icon: WhatsAppIcon, href: wa, label: "WhatsApp", brand: "bg-[#25D366] text-white" },
    {
      Icon: InstagramIcon,
      href: ig,
      label: "Instagram",
      brand: "bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white",
    },
    { Icon: EmailIcon, href: mail, label: "Email", brand: "bg-amber-gold text-espresso" },
  ];

  return (
    <div className="flex gap-3">
      {items.map(({ Icon, href, label, brand }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel="noreferrer"
          aria-label={label}
          className={`group flex h-11 w-11 items-center justify-center rounded-full transition-transform hover:scale-110 ${brand} shadow-[0_6px_18px_-6px_rgba(0,0,0,0.35)]`}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
