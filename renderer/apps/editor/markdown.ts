import MarkdownIt from "markdown-it";

// html: false turns any raw HTML in the document into plain text, so the output is safe to inject.
const md = new MarkdownIt({ html: false, linkify: true });

// Images would make the preview fetch from the network as you type: show their description instead.
md.renderer.rules.image = (tokens, i) => md.utils.escapeHtml(tokens[i].content);

/** Markdown source to an HTML string. Links are rendered but the preview never follows them (see EditorApp). */
export function renderMarkdown(text: string): string {
  return md.render(text);
}
