"use client";

import { useEffect, useRef, useState } from "react";
import { DocumentUploadForm } from "@/components/portal/DocumentUploadForm";
import { NewFolderForm } from "@/components/portal/NewFolderForm";
import { NewRichTextDocumentForm } from "@/components/portal/NewRichTextDocumentForm";

type ActiveForm = "folder" | "document" | "upload" | null;

// Drive-style single "+ New" trigger replacing three separate buttons --
// the dropdown just picks which of the three existing (now controllable)
// forms to show in a panel underneath.
export function NewItemMenu({ folderId, block = false }: { folderId: string | null; block?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeForm, setActiveForm] = useState<ActiveForm>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative" style={block ? { width: "100%" } : undefined}>
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        className={`btn btn-primary elev-sm ${block ? "btn-block" : ""}`}
        style={block ? { justifyContent: "center" } : undefined}
      >
        <span className="text-base leading-none">+</span> New
      </button>

      {menuOpen ? (
        <div className="blueprint elev-md" style={{ position: "absolute", left: 0, right: block ? 0 : undefined, top: "calc(100% + 4px)", zIndex: 20, width: block ? undefined : "192px", background: "var(--color-bg)" }}>
          <i className="corner tl" /><i className="corner tr" /><i className="corner bl" /><i className="corner br" />
          <button
            type="button"
            onClick={() => {
              setActiveForm("folder");
              setMenuOpen(false);
            }}
            className="side-link"
          >
            📁 Folder
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveForm("document");
              setMenuOpen(false);
            }}
            className="side-link"
            style={{ borderTop: "1px solid var(--color-divider)" }}
          >
            📝 Document
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveForm("upload");
              setMenuOpen(false);
            }}
            className="side-link"
            style={{ borderTop: "1px solid var(--color-divider)" }}
          >
            ⬆️ Upload
          </button>
        </div>
      ) : null}

      {activeForm ? (
        <div className="absolute left-0 top-full z-20 mt-1">
          {activeForm === "folder" ? (
            <NewFolderForm parentFolderId={folderId} open onClose={() => setActiveForm(null)} />
          ) : null}
          {activeForm === "document" ? (
            <NewRichTextDocumentForm folderId={folderId} open onClose={() => setActiveForm(null)} />
          ) : null}
          {activeForm === "upload" ? (
            <DocumentUploadForm folderId={folderId} open onClose={() => setActiveForm(null)} />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
