// Small inline SVG icon set for the Documents browser -- no icon library
// dependency, colored via the site's existing Tailwind palette
// (tailwind.config.ts) rather than introducing new colors.

export function FolderIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`text-slateBlue ${className}`} aria-hidden="true">
      <path
        d="M3 6.5A1.5 1.5 0 0 1 4.5 5h4.379a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 12.12 7H19.5A1.5 1.5 0 0 1 21 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5v-11Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function RichTextDocIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`text-evergreen ${className}`} aria-hidden="true">
      <path
        d="M6 3.5h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14 3.5v3a1 1 0 0 0 1 1h3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8 12.5h8M8 15.5h8M8 9.5h3" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

// PDF/image/spreadsheet get a distinct accent color, same page-with-folded-
// corner silhouette as RichTextDocIcon so the type reads at a glance without
// needing a legend.
function fileAccentColor(mimeType: string | null): string {
  if (!mimeType) return "text-charcoal/40";
  if (mimeType === "application/pdf") return "text-copperAccent";
  if (mimeType.startsWith("image/")) return "text-slateBlue";
  if (mimeType.includes("spreadsheet") || mimeType.includes("csv") || mimeType.includes("excel")) {
    return "text-evergreen";
  }
  return "text-charcoal/40";
}

export function FileTypeIcon({
  mimeType,
  className = "h-10 w-10",
}: {
  mimeType: string | null;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`${fileAccentColor(mimeType)} ${className}`} aria-hidden="true">
      <path
        d="M6 3.5h8l4 4v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M14 3.5v3a1 1 0 0 0 1 1h3" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function PrivateLockBadge() {
  return (
    <span
      title="Private"
      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-charcoal text-[10px] text-white"
    >
      🔒
    </span>
  );
}
