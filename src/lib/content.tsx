import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  SERVICES as DEFAULT_SERVICES,
  PROJECTS as DEFAULT_PROJECTS,
  TEAM_FULL as DEFAULT_TEAM,
  SOCIAL as DEFAULT_SOCIAL,
  type Service,
  type Project,
  type TeamMember,
} from "@/data/site";

import heroImage from "@/assets/hero-event.jpg";
import aboutImg from "@/assets/about-editorial.jpg";
import bts1 from "@/assets/team-bts-1.jpg";
import bts2 from "@/assets/team-bts-2.jpg";
import bts3 from "@/assets/team-bts-3.jpg";
import bts4 from "@/assets/team-bts-4.jpg";

export type HeroStat = { v: string; l: string };
export type TeamFrame = { src: string; caption: string };
export type Testimonial = { quote: string; name: string; role: string };

export type SiteContent = {
  hero: {
    image: string;
    headline: string;
    headlineEm: string;
    headlineTail: string;
    subhead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: HeroStat[];
    trust: string[];
  };
  about: {
    image: string;
    headingTop: string;
    headingEm: string;
    p1: string;
    p2: string;
    bullets: string[];
  };
  services: Service[];
  projects: Project[];
  team: {
    eyebrow: string;
    headingTop: string;
    headingEm: string;
    intro: string;
    quote: string;
    frames: TeamFrame[];
  };
  teamFull: TeamMember[];
  testimonials: Testimonial[];
  social: typeof DEFAULT_SOCIAL;
  footer: { tagline: string; copyright: string };
};

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    image: heroImage,
    headline: "Where Vision Meets",
    headlineEm: "Exquisite",
    headlineTail: "Execution",
    subhead:
      "From intimate celebrations to grand galas, we craft moments that linger long after the last guest departs.",
    ctaPrimary: "Explore Our Work",
    ctaSecondary: "Begin Your Vision",
    stats: [
      { v: "150+", l: "Events Curated" },
      { v: "50+", l: "Luxury Celebrations" },
      { v: "98%", l: "Client Satisfaction" },
      { v: "8+", l: "Years Mastery" },
    ],
    trust: [
      "Featured in Luxury Events Magazine",
      "Member, Intl. Event Society",
      "Fully Insured & Licensed",
      "Available Worldwide",
    ],
  },
  about: {
    image: aboutImg,
    headingTop: "Exquisite Is Not A Word.",
    headingEm: "It's Our Standard.",
    p1: "At Mileyn Events, we don't plan parties. We compose experiences. Every detail — from the weight of the cutlery to the angle of the lighting — is considered, refined, and executed with quiet precision.",
    p2: "We've learned that true luxury isn't loud. It's the pause between moments. The breath a guest takes when they first enter a room. The silence before applause. We design for that silence.",
    bullets: ["Curated Design", "Precision Planning", "Seamless Execution", "Lasting Impressions"],
  },
  services: DEFAULT_SERVICES,
  projects: DEFAULT_PROJECTS,
  team: {
    eyebrow: "Behind The Curtain",
    headingTop: "The hands that",
    headingEm: "make it look easy",
    intro:
      "We don't pose for portraits. We're usually in the back of the room — pinning a stem, relighting a wick, fixing what only we noticed. Here are a few stolen moments from real events.",
    quote: "We measure success by what the guests don't see.",
    frames: [
      { src: bts1, caption: "Golden hour, final stems" },
      { src: bts2, caption: "The last knife laid" },
      { src: bts4, caption: "Two hundred candles before doors" },
      { src: bts3, caption: "A mood board, found" },
    ],
  },
  teamFull: DEFAULT_TEAM,
  testimonials: [
    { quote: "They didn't plan our wedding. They composed it.", name: "Adaeze & Tomiwa", role: "The Pearl Wedding" },
    { quote: "Every detail considered. Nothing felt accidental.", name: "L. Achieng", role: "Executive Gala Host" },
    { quote: "We exhaled the moment they took over. Truly rare.", name: "The Otieno Family", role: "Garden Soirée" },
  ],
  social: DEFAULT_SOCIAL,
  footer: {
    tagline: "Curators of refined experiences.",
    copyright: "© 2025 Mileyn Events. All rights reserved.",
  },
};

// Deep-merge override into defaults (arrays are replaced wholesale when provided).
function mergeContent(base: SiteContent, over: Partial<SiteContent> | null): SiteContent {
  if (!over) return base;
  const out: any = { ...base };
  for (const k of Object.keys(over) as (keyof SiteContent)[]) {
    const v = (over as any)[k];
    if (v == null) continue;
    if (Array.isArray(v)) {
      out[k] = v;
    } else if (typeof v === "object") {
      out[k] = { ...(base as any)[k], ...v };
    } else {
      out[k] = v;
    }
  }
  return out as SiteContent;
}

const Ctx = createContext<{
  content: SiteContent;
  loaded: boolean;
  reload: () => Promise<void>;
}>({ content: DEFAULT_CONTENT, loaded: false, reload: async () => {} });

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(DEFAULT_CONTENT);
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    try {
      const { data } = await supabase.from("site_content").select("data").eq("id", "singleton").maybeSingle();
      const over = (data?.data as Partial<SiteContent>) || null;
      setContent(mergeContent(DEFAULT_CONTENT, over));
    } catch (e) {
      console.error("content load failed", e);
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
    const onSaved = () => load();
    window.addEventListener("mileyn:content-saved", onSaved);
    return () => window.removeEventListener("mileyn:content-saved", onSaved);
  }, []);

  return <Ctx.Provider value={{ content, loaded, reload: load }}>{children}</Ctx.Provider>;
}

export function useContent() {
  return useContext(Ctx).content;
}

export async function saveContent(next: SiteContent) {
  const { error } = await supabase
    .from("site_content")
    .upsert({ id: "singleton", data: next as any, updated_at: new Date().toISOString() });
  if (error) throw error;
  window.dispatchEvent(new CustomEvent("mileyn:content-saved"));
}

export async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop() || "jpg";
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const { error } = await supabase.storage.from("site-images").upload(path, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw error;
  const { data } = supabase.storage.from("site-images").getPublicUrl(path);
  return data.publicUrl;
}
