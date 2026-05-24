// Brand-accurate inline SVG icons for WhatsApp, Instagram, Email envelope.
// All accept className for sizing/color via currentColor.

export function WhatsAppIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden>
      <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39-.158 0-.385-.092-.787-.291-1.518-.744-2.534-1.626-3.469-3.044-.157-.24-.337-.6-.337-.879 0-.633 1.022-.838 1.022-1.397 0-.077-.027-.155-.057-.231l-1.012-2.36c-.124-.305-.143-.474-.42-.474-.143 0-.286-.029-.43-.029-.276 0-.572.058-.766.241-.628.59-.939 1.27-.939 2.16 0 .926.286 1.825.797 2.583 1.474 2.196 3.293 4.221 5.755 5.293.49.213 1.024.395 1.55.526.546.137 1.026.193 1.5.193.769 0 1.683-.226 2.252-.747.343-.318.519-.749.519-1.196 0-.085-.013-.171-.028-.255-.05-.272-.413-.347-.629-.452-.479-.231-.989-.422-1.467-.66-.225-.115-.464-.158-.71-.158zM16.005 2.667C8.638 2.667 2.667 8.638 2.667 16c0 2.355.625 4.659 1.808 6.685L2.667 29.333l6.81-1.787a13.265 13.265 0 0 0 6.527 1.72h.006c7.36 0 13.323-5.97 13.323-13.333S23.36 2.667 16.005 2.667zm0 24.387h-.005a11.05 11.05 0 0 1-5.633-1.543l-.404-.24-4.188 1.099 1.117-4.083-.262-.418A11.038 11.038 0 0 1 4.94 16c0-6.099 4.965-11.06 11.066-11.06 2.955 0 5.731 1.151 7.819 3.241a10.984 10.984 0 0 1 3.243 7.825c-.003 6.099-4.968 11.048-11.063 11.048z" />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function EmailIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="M3 6.5l9 7 9-7" />
    </svg>
  );
}
