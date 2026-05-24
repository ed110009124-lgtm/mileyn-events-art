interface GoldenThreadProps {
  width?: number | string;
  height?: number | string;
  vertical?: boolean;
  className?: string;
}

export function GoldenThread({
  width = 60,
  height,
  vertical = false,
  className = "",
}: GoldenThreadProps) {
  if (vertical) {
    return (
      <span
        aria-hidden
        className={`inline-block bg-amber-gold ${className}`}
        style={{ width: 1, height: height ?? 40 }}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={`inline-block bg-amber-gold ${className}`}
      style={{ height: 1, width }}
    />
  );
}
