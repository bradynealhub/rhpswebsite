import { TextStyle } from "@tiptap/extension-text-style";

// @tiptap/extension-font-size is still pre-release (3.0.0-next.x) as of
// this writing -- not something to depend on in production. Font size is
// just an inline style on the standard TextStyle mark, so this extends it
// directly rather than pulling in an unstable package. No custom commands
// needed -- callers use TipTap's built-in setMark/unsetMark directly:
//   editor.chain().focus().setMark("textStyle", { fontSize: "18px" }).run()
// Re-check whether the official extension has stabilized before reaching
// for this pattern again.
export const FontSize = TextStyle.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      fontSize: {
        default: null,
        parseHTML: (element: HTMLElement) => element.style.fontSize || null,
        renderHTML: (attributes: Record<string, unknown>) => {
          if (!attributes.fontSize) return {};
          return { style: `font-size: ${attributes.fontSize}` };
        },
      },
    };
  },
});
