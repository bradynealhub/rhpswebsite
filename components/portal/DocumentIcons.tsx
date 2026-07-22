// Small inline SVG icon set for the Documents browser -- no icon library
// dependency, colored via the portal design system's CSS custom properties
// (app/portal/portal-design-system.css) so they follow the same palette as
// the rest of the portal.

export function FolderIcon({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: "var(--color-accent-2-700)" }} aria-hidden="true">
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
    <svg viewBox="0 0 24 24" fill="none" className={className} style={{ color: "var(--color-accent)" }} aria-hidden="true">
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
  if (!mimeType) return "var(--color-neutral-500)";
  if (mimeType === "application/pdf") return "var(--color-accent-2-700)";
  if (mimeType.startsWith("image/")) return "var(--color-accent-500)";
  if (mimeType.includes("spreadsheet") || mimeType.includes("csv") || mimeType.includes("excel")) {
    return "var(--color-neutral-800)";
  }
  return "var(--color-neutral-500)";
}

export function FileTypeIcon({
  mimeType,
  className = "h-10 w-10",
}: {
  mimeType: string | null;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ color: fileAccentColor(mimeType) }}
      aria-hidden="true"
    >
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
      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center text-[10px] text-white"
      style={{ borderRadius: "50%", border: "1px solid var(--color-bg)", background: "var(--color-neutral-900)" }}
    >
      🔒
    </span>
  );
}
