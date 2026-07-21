"use client";

import { useEffect, useRef, useState } from "react";
import { DocumentUploadForm } from "@/components/portal/DocumentUploadForm";
import { NewFolderForm } from "@/components/portal/NewFolderForm";
import { NewRichTextDocumentForm } from "@/components/portal/NewRichTextDocumentForm";

type ActiveForm = "folder" | "document" | "upload" | null;

// Drive-style single "+ New" trigger replacing three separate buttons --
// the dropdown just picks which of the three existing (now controllable)
// forms to show in a panel underneath.
export function NewItemMenu({ folderId }: { folderId: string | null }) {
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
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        className="flex items-center gap-2 rounded-md bg-evergreen px-4 py-2 font-body text-sm font-semibold text-warmStone shadow-sm hover:opacity-90"
      >
        <span className="text-base leading-none">+</span> New
      </button>

      {menuOpen ? (
        <div className="absolute left-0 top-full z-20 mt-1 w-48 rounded-md border border-charcoal/10 bg-white py-1 shadow-lg">
          <button
            type="button"
            onClick={() => {
              setActiveForm("folder");
              setMenuOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left font-body text-sm text-charcoal hover:bg-warmStone"
          >
            📁 Folder
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveForm("document");
              setMenuOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left font-body text-sm text-charcoal hover:bg-warmStone"
          >
            📝 Document
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveForm("upload");
              setMenuOpen(false);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left font-body text-sm text-charcoal hover:bg-warmStone"
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
