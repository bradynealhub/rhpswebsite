"use client";

import type { Editor } from "@tiptap/react";

const FONT_SIZES = [
  { label: "Small", value: "13px" },
  { label: "Normal", value: "16px" },
  { label: "Large", value: "20px" },
  { label: "Huge", value: "28px" },
];

function ToolbarButton({
  onClick,
  active,
  disabled,
  label,
  children,
}: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-pressed={active}
      title={label}
      className="btn btn-ghost"
      style={{
        padding: "4px 8px",
        fontSize: "13px",
        ...(active ? { background: "var(--color-accent-100)", color: "var(--color-accent-800)" } : {}),
      }}
    >
      {children}
    </button>
  );
}

export function EditorToolbar({ editor }: { editor: Editor }) {
  function setLink() {
    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL", previousUrl ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }

  return (
    <div
      className="flex flex-wrap items-center gap-1"
      style={{ border: "1px solid var(--color-divider)", borderBottom: 0, padding: "6px 8px", background: "var(--color-surface)" }}
    >
      <select
        aria-label="Text style"
        value={
          editor.isActive("heading", { level: 1 })
            ? "h1"
            : editor.isActive("heading", { level: 2 })
              ? "h2"
              : editor.isActive("heading", { level: 3 })
                ? "h3"
                : "p"
        }
        onChange={(event) => {
          const value = event.target.value;
          if (value === "p") editor.chain().focus().setParagraph().run();
          else editor.chain().focus().toggleHeading({ level: Number(value.slice(1)) as 1 | 2 | 3 }).run();
        }}
        className="input"
        style={{ width: "auto", minHeight: "auto", padding: "4px 6px", fontSize: "13px" }}
      >
        <option value="p">Normal text</option>
        <option value="h1">Heading 1</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
      </select>

      <select
        aria-label="Font size"
        value={(editor.getAttributes("textStyle").fontSize as string | undefined) ?? "16px"}
        onChange={(event) => {
          const value = event.target.value;
          if (value === "16px") editor.chain().focus().setMark("textStyle", { fontSize: null }).run();
          else editor.chain().focus().setMark("textStyle", { fontSize: value }).run();
        }}
        className="input"
        style={{ width: "auto", minHeight: "auto", padding: "4px 6px", fontSize: "13px" }}
      >
        {FONT_SIZES.map((size) => (
          <option key={size.value} value={size.value}>
            {size.label}
          </option>
        ))}
      </select>

      <div className="mx-1 h-5 w-px" style={{ background: "var(--color-divider)" }} />

      <ToolbarButton
        label="Bold"
        active={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <strong>B</strong>
      </ToolbarButton>
      <ToolbarButton
        label="Italic"
        active={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <em>I</em>
      </ToolbarButton>
      <ToolbarButton
        label="Underline"
        active={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <span className="underline">U</span>
      </ToolbarButton>
      <ToolbarButton
        label="Strikethrough"
        active={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <span className="line-through">S</span>
      </ToolbarButton>

      <div className="mx-1 h-5 w-px" style={{ background: "var(--color-divider)" }} />

      <ToolbarButton
        label="Bulleted list"
        active={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        &bull; List
      </ToolbarButton>
      <ToolbarButton
        label="Numbered list"
        active={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        1. List
      </ToolbarButton>
      <ToolbarButton
        label="Quote"
        active={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        &ldquo;
      </ToolbarButton>

      <div className="mx-1 h-5 w-px" style={{ background: "var(--color-divider)" }} />

      <ToolbarButton
        label="Text align left"
        active={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        &#8676;
      </ToolbarButton>
      <ToolbarButton
        label="Text align center"
        active={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        &#8596;
      </ToolbarButton>
      <ToolbarButton
        label="Text align right"
        active={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        &#8677;
      </ToolbarButton>

      <div className="mx-1 h-5 w-px" style={{ background: "var(--color-divider)" }} />

      <ToolbarButton label="Link" active={editor.isActive("link")} onClick={setLink}>
        &#128279;
      </ToolbarButton>

      <div className="mx-1 h-5 w-px" style={{ background: "var(--color-divider)" }} />

      <ToolbarButton label="Undo" onClick={() => editor.chain().focus().undo().run()}>
        &#8630;
      </ToolbarButton>
      <ToolbarButton label="Redo" onClick={() => editor.chain().focus().redo().run()}>
        &#8631;
      </ToolbarButton>
    </div>
  );
}
