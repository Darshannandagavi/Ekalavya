import { useEffect, useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import Youtube from "@tiptap/extension-youtube";
import { TextStyle } from "@tiptap/extension-text-style";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import CodeBlockLowlight from "@tiptap/extension-code-block";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import CharacterCount from "@tiptap/extension-character-count";
import API from "../../axiosConfig";
import { useImageUpload } from "../../hooks/useImageUpload";
import { useBase64ImageReplacer } from "../../hooks/useBase64ImageReplacer";

// ─── TOAST ─────────────────────────────────────────────────────────────────────
function Toast({ message, type, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, []);
  const bg = type === "error" ? "#fee2e2" : type === "warn" ? "#fef9c3" : "#dcfce7";
  const color = type === "error" ? "#b91c1c" : type === "warn" ? "#854d0e" : "#166534";
  return (
    <div style={{
      position: "fixed", bottom: "28px", right: "28px", zIndex: 9999,
      padding: "12px 20px", borderRadius: "10px", background: bg, color,
      fontWeight: "600", fontSize: "13px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      animation: "slideUp 0.2s ease",
    }}>
      {message}
    </div>
  );
}

// ─── CONFIRM DIALOG ────────────────────────────────────────────────────────────
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.45)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "16px", padding: "28px", maxWidth: "360px", width: "90vw",
        boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
      }}>
        <p style={{ margin: "0 0 20px", fontSize: "15px", color: "var(--text-main)", lineHeight: 1.5 }}>
          {message}
        </p>
        <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
          <button onClick={onCancel} style={{
            padding: "8px 18px", borderRadius: "8px", border: "1px solid var(--border)",
            background: "var(--bg-main)", color: "var(--text-muted)",
            fontWeight: "600", fontSize: "13px", cursor: "pointer",
          }}>Cancel</button>
          <button onClick={onConfirm} style={{
            padding: "8px 18px", borderRadius: "8px", border: "none",
            background: "#e05252", color: "#fff",
            fontWeight: "700", fontSize: "13px", cursor: "pointer",
          }}>Delete</button>
        </div>
      </div>
    </div>
  );
}

// ─── TOOLBAR PRIMITIVES ────────────────────────────────────────────────────────
function ToolBtn({ onClick, active, disabled, title, children }) {
  return (
    <button
      onMouseDown={(e) => { e.preventDefault(); onClick?.(); }}
      disabled={disabled}
      title={title}
      style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        width: "32px", height: "32px", borderRadius: "6px", border: "none",
        background: active ? "color-mix(in srgb, var(--primary) 15%, var(--bg-main))" : "transparent",
        color: active ? "var(--primary)" : "var(--text-main)",
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.35 : 1,
        fontSize: "13px", fontWeight: "600", flexShrink: 0,
        transition: "background 0.1s, color 0.1s",
      }}
    >
      {children}
    </button>
  );
}
function Sep() {
  return <div style={{ width: "1px", height: "20px", background: "var(--border)", flexShrink: 0, margin: "0 2px" }} />;
}

// ─── SHARED MODAL SHELL ────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.45)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "16px", padding: "28px",
        minWidth: "360px", maxWidth: "480px", width: "90vw",
        boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "var(--text-main)" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", fontSize: "18px" }}>✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

const fieldInput = {
  border: "1px solid var(--border)", borderRadius: "8px",
  padding: "9px 12px", backgroundColor: "var(--bg-main)",
  color: "var(--text-main)", fontSize: "14px",
  outline: "none", width: "100%", boxSizing: "border-box", fontFamily: "inherit",
};

// ─── IMAGE MODAL ──────────────────────────────────────────────────────────────
function ImageModal({ editor, onClose }) {
  const { uploadImage } = useImageUpload();
  const [tab, setTab] = useState("url");
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const insertUrl = () => {
    if (!url.trim()) return;
    editor.chain().focus().setImage({ src: url, alt }).run();
    onClose();
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true); setError("");
    try {
      const cloudinaryUrl = await uploadImage(file);
      editor.chain().focus().setImage({ src: cloudinaryUrl, alt: file.name }).run();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Modal title="Insert Image" onClose={onClose}>
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {["url", "upload"].map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "8px", borderRadius: "8px", border: "1px solid",
            borderColor: tab === t ? "var(--primary)" : "var(--border)",
            background: tab === t ? "color-mix(in srgb, var(--primary) 10%, var(--bg-main))" : "var(--bg-main)",
            color: tab === t ? "var(--primary)" : "var(--text-muted)",
            fontWeight: "600", fontSize: "13px", cursor: "pointer",
          }}>{t === "url" ? "From URL" : "Upload File"}</button>
        ))}
      </div>
      {tab === "url" ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input type="url" placeholder="https://example.com/image.png" value={url} onChange={(e) => setUrl(e.target.value)} style={fieldInput} />
          <input type="text" placeholder="Alt text (optional)" value={alt} onChange={(e) => setAlt(e.target.value)} style={fieldInput} />
          {url && <img src={url} alt={alt} style={{ maxWidth: "100%", maxHeight: "160px", objectFit: "contain", borderRadius: "8px" }} onError={(e) => (e.target.style.display = "none")} />}
          <button onClick={insertUrl} style={{ padding: "10px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>Insert Image</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {error && <div style={{ padding: "10px 14px", borderRadius: "8px", background: "#fee2e2", color: "#b91c1c", fontSize: "13px" }}>{error}</div>}
          <div onClick={() => !uploading && fileRef.current?.click()} style={{
            border: "2px dashed var(--border)", borderRadius: "10px", padding: "32px",
            textAlign: "center", cursor: uploading ? "default" : "pointer",
            color: "var(--text-muted)", fontSize: "13px", opacity: uploading ? 0.6 : 1,
          }}>
            {uploading ? "⏳ Uploading…" : "🖼 Click to choose an image file"}
          </div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
        </div>
      )}
    </Modal>
  );
}

// ─── VIDEO MODAL ──────────────────────────────────────────────────────────────
function VideoModal({ editor, onClose }) {
  const [url, setUrl] = useState("");
  return (
    <Modal title="Embed Video" onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="url" placeholder="https://youtube.com/watch?v=..." value={url} onChange={(e) => setUrl(e.target.value)} style={fieldInput} />
        <button onClick={() => { if (url.trim()) { editor.commands.setYoutubeVideo({ src: url }); onClose(); } }}
          style={{ padding: "10px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>
          Embed Video
        </button>
      </div>
    </Modal>
  );
}

// ─── LINK MODAL ───────────────────────────────────────────────────────────────
function LinkModal({ editor, onClose }) {
  const [href, setHref] = useState(editor.getAttributes("link").href || "");
  const [label, setLabel] = useState("");
  const insert = () => {
    if (!href.trim()) { editor.chain().focus().unsetLink().run(); onClose(); return; }
    if (label.trim()) editor.chain().focus().insertContent(`<a href="${href}" target="_blank">${label}</a>`).run();
    else editor.chain().focus().setLink({ href, target: "_blank" }).run();
    onClose();
  };
  return (
    <Modal title="Insert Link" onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="url" placeholder="https://..." value={href} onChange={(e) => setHref(e.target.value)} style={fieldInput} />
        <input type="text" placeholder="Link text (leave blank to use selection)" value={label} onChange={(e) => setLabel(e.target.value)} style={fieldInput} />
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={insert} style={{ flex: 1, padding: "10px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>Insert</button>
          {editor.isActive("link") && (
            <button onClick={() => { editor.chain().focus().unsetLink().run(); onClose(); }}
              style={{ padding: "10px 16px", background: "none", color: "#e05252", border: "1px solid #e05252", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
              Remove
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}

// ─── TABLE MODAL ──────────────────────────────────────────────────────────────
function TableModal({ editor, onClose }) {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  return (
    <Modal title="Insert Table" onClose={onClose}>
      <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: "12px", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>Rows</label>
          <input type="number" min="1" max="20" value={rows} onChange={(e) => setRows(+e.target.value)} style={fieldInput} />
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: "12px", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>Columns</label>
          <input type="number" min="1" max="10" value={cols} onChange={(e) => setCols(+e.target.value)} style={fieldInput} />
        </div>
      </div>
      <button onClick={() => { editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run(); onClose(); }}
        style={{ width: "100%", padding: "10px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "700", cursor: "pointer" }}>
        Insert Table
      </button>
    </Modal>
  );
}

// ─── TOOLBAR ──────────────────────────────────────────────────────────────────
function Toolbar({ editor }) {
  const [modal, setModal] = useState(null);
  const colorRef = useRef();
  if (!editor) return null;

  const cur = [1, 2, 3, 4].find((l) => editor.isActive("heading", { level: l }));

  return (
    <>
      {modal === "image" && <ImageModal editor={editor} onClose={() => setModal(null)} />}
      {modal === "video" && <VideoModal editor={editor} onClose={() => setModal(null)} />}
      {modal === "link"  && <LinkModal  editor={editor} onClose={() => setModal(null)} />}
      {modal === "table" && <TableModal editor={editor} onClose={() => setModal(null)} />}

      <div style={{
        display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2px",
        padding: "8px 12px", borderBottom: "1px solid var(--border)",
        background: "var(--bg-card)", position: "sticky", top: 0, zIndex: 10,
      }}>
        <select value={cur || "p"} onChange={(e) => {
          const v = e.target.value;
          if (v === "p") editor.chain().focus().setParagraph().run();
          else editor.chain().focus().toggleHeading({ level: parseInt(v) }).run();
        }} style={{
          border: "1px solid var(--border)", borderRadius: "6px", padding: "0 8px",
          height: "32px", fontSize: "13px", background: "var(--bg-main)",
          color: "var(--text-main)", outline: "none", cursor: "pointer", fontWeight: "600",
        }}>
          <option value="p">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
        </select>
        <Sep />
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold"><b>B</b></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic"><i>I</i></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline"><u>U</u></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")} title="Strikethrough"><s>S</s></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive("highlight")} title="Highlight">🖊</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")} title="Inline Code"><span style={{ fontFamily: "monospace" }}>`</span></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleSubscript().run()} active={editor.isActive("subscript")} title="Subscript"><span style={{ fontSize: "11px" }}>X₂</span></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleSuperscript().run()} active={editor.isActive("superscript")} title="Superscript"><span style={{ fontSize: "11px" }}>X²</span></ToolBtn>
        <div style={{ position: "relative" }} title="Text Color">
          <ToolBtn onClick={() => colorRef.current?.click()}><span style={{ fontSize: "14px", borderBottom: "3px solid var(--primary)" }}>A</span></ToolBtn>
          <input ref={colorRef} type="color" style={{ position: "absolute", opacity: 0, pointerEvents: "none", width: 0, height: 0 }}
            onChange={(e) => editor.chain().focus().setColor(e.target.value).run()} />
        </div>
        <Sep />
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("left").run()} active={editor.isActive({ textAlign: "left" })} title="Align Left">⬛︎</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("center").run()} active={editor.isActive({ textAlign: "center" })} title="Center">☰</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("right").run()} active={editor.isActive({ textAlign: "right" })} title="Align Right">⬛</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={editor.isActive({ textAlign: "justify" })} title="Justify">≡</ToolBtn>
        <Sep />
        <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bullet List">• —</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered List">1.</ToolBtn>
        <Sep />
        <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Callout">"</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive("codeBlock")} title="Code Block"><span style={{ fontFamily: "monospace", fontSize: "11px" }}>{"{}"}</span></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Divider">—</ToolBtn>
        <Sep />
        <ToolBtn onClick={() => setModal("image")} title="Insert Image">🖼</ToolBtn>
        <ToolBtn onClick={() => setModal("video")} title="Embed Video">▶</ToolBtn>
        <ToolBtn onClick={() => setModal("link")} active={editor.isActive("link")} title="Insert Link">🔗</ToolBtn>
        <ToolBtn onClick={() => setModal("table")} title="Insert Table">⊞</ToolBtn>
        <Sep />
        <ToolBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">↩</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">↪</ToolBtn>
        <div style={{ marginLeft: "auto", fontSize: "11px", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
          {editor.storage.characterCount?.words?.()} words
        </div>
      </div>
    </>
  );
}

// ─── BUBBLE MENU ──────────────────────────────────────────────────────────────
function InlineBubble({ editor }) {
  if (!editor) return null;
  return (
    <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
      <div style={{
        display: "flex", gap: "2px", padding: "6px 8px",
        background: "var(--bg-card)", border: "1px solid var(--border)",
        borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
      }}>
        <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}><b>B</b></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}><i>I</i></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")}><u>U</u></ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHighlight().run()} active={editor.isActive("highlight")}>🖊</ToolBtn>
        <Sep />
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })}>H1</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>H2</ToolBtn>
        <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}>H3</ToolBtn>
      </div>
    </BubbleMenu>
  );
}

// ─── NOTE CARD (in list view) ─────────────────────────────────────────────────
function NoteCard({ note, onEdit, onDelete }) {
  const wordCount = note.description
    ? note.description.replace(/<[^>]*>/g, " ").trim().split(/\s+/).filter(Boolean).length
    : 0;

  const subjectName  = note.subject?.name  || "—";
  const courseName   = note.course?.name   || "—";
  const uniName      = note.university?.name || "—";

  const date = new Date(note.createdAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <div style={{
      border: "1px solid var(--border)", borderRadius: "14px",
      background: "var(--bg-card)", padding: "20px 22px",
      display: "flex", flexDirection: "column", gap: "10px",
      transition: "box-shadow 0.15s",
    }}
      onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"}
      onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span style={{
              fontSize: "11px", fontWeight: "700", color: "var(--primary)",
              background: "color-mix(in srgb, var(--primary) 10%, var(--bg-main))",
              padding: "2px 8px", borderRadius: "20px",
            }}>
              #{note.order}
            </span>
            <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>{date}</span>
          </div>
          <h3 style={{
            margin: 0, fontSize: "15px", fontWeight: "700",
            color: "var(--text-main)", overflow: "hidden",
            textOverflow: "ellipsis", whiteSpace: "nowrap",
          }}>
            {note.title}
          </h3>
        </div>
        {/* Actions */}
        <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
          <button onClick={() => onEdit(note)} style={{
            padding: "6px 14px", borderRadius: "7px", border: "1px solid var(--border)",
            background: "var(--bg-main)", color: "var(--text-main)",
            fontSize: "12px", fontWeight: "600", cursor: "pointer",
          }}>Edit</button>
          <button onClick={() => onDelete(note)} style={{
            padding: "6px 14px", borderRadius: "7px", border: "1px solid #fca5a5",
            background: "#fee2e2", color: "#b91c1c",
            fontSize: "12px", fontWeight: "600", cursor: "pointer",
          }}>Delete</button>
        </div>
      </div>

      {/* Meta badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
        {[uniName, courseName, `Sem ${note.semester}`, subjectName].map((label) => (
          <span key={label} style={{
            fontSize: "11px", color: "var(--text-muted)",
            background: "var(--bg-main)", border: "1px solid var(--border)",
            padding: "2px 8px", borderRadius: "20px",
          }}>{label}</span>
        ))}
      </div>

      {/* Word count */}
      <p style={{ margin: 0, fontSize: "11px", color: "var(--text-muted)" }}>
        {wordCount} words
      </p>
    </div>
  );
}

// ─── EDITOR STYLES ────────────────────────────────────────────────────────────
const editorStyles = `
  @keyframes slideUp { from { transform: translateY(12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

  .tiptap-editor { outline: none; min-height: 480px; padding: 32px 40px 64px; color: var(--text-main); font-size: 15px; line-height: 1.75; font-family: inherit; }
  .tiptap-editor h1 { font-size: 2rem; font-weight: 900; margin: 0 0 24px; letter-spacing: -0.5px; line-height: 1.2; }
  .tiptap-editor h2 { font-size: 1.4rem; font-weight: 700; margin: 36px 0 14px; padding-bottom: 8px; border-bottom: 2px solid var(--border); }
  .tiptap-editor h3 { font-size: 1.15rem; font-weight: 600; margin: 28px 0 10px; }
  .tiptap-editor h4 { font-size: 1rem; font-weight: 600; margin: 20px 0 8px; color: var(--text-muted); }
  .tiptap-editor p { margin: 0 0 14px; }
  .tiptap-editor p:last-child { margin-bottom: 0; }
  .tiptap-editor ul, .tiptap-editor ol { margin: 0 0 16px; padding-left: 24px; }
  .tiptap-editor li { margin-bottom: 6px; line-height: 1.65; }
  .tiptap-editor pre { background: #0d1117; color: #c9d1d9; border-radius: 10px; padding: 20px 24px; overflow-x: auto; font-family: monospace; font-size: 13px; line-height: 1.6; margin: 0 0 20px; border: 1px solid #30363d; }
  .tiptap-editor pre code { background: none; padding: 0; color: inherit; }
  .tiptap-editor code { font-family: monospace; background: color-mix(in srgb, var(--primary) 10%, var(--bg-main)); padding: 2px 6px; border-radius: 4px; font-size: 13px; }
  .tiptap-editor blockquote { border-left: 4px solid var(--primary); background: color-mix(in srgb, var(--primary) 8%, var(--bg-main)); padding: 14px 20px; border-radius: 4px; margin: 0 0 20px; }
  .tiptap-editor blockquote p { margin: 0; }
  .tiptap-editor hr { border: none; border-top: 2px solid var(--border); margin: 28px 0; }
  .tiptap-editor img { max-width: 100%; border-radius: 10px; box-shadow: 0 4px 16px rgba(0,0,0,0.12); margin: 8px 0; }
  .tiptap-editor img.ProseMirror-selectednode { outline: 3px solid var(--primary); }
  .tiptap-editor .youtube-video, .tiptap-editor iframe { width: 100%; aspect-ratio: 16/9; border: none; border-radius: 10px; margin: 8px 0; display: block; }
  .tiptap-editor a { color: var(--primary); text-decoration: underline; text-underline-offset: 3px; font-weight: 500; }
  .tiptap-editor mark { background: #fef08a; border-radius: 3px; padding: 1px 3px; }
  .tiptap-editor table { border-collapse: collapse; width: 100%; margin: 0 0 20px; }
  .tiptap-editor th { background: color-mix(in srgb, var(--primary) 12%, var(--bg-main)); font-weight: 700; font-size: 13px; padding: 10px 14px; border: 1px solid var(--border); }
  .tiptap-editor td { padding: 10px 14px; border: 1px solid var(--border); font-size: 14px; }
  .tiptap-editor .selectedCell:after { background: color-mix(in srgb, var(--primary) 15%, transparent); content: ''; left: 0; right: 0; top: 0; bottom: 0; pointer-events: none; position: absolute; z-index: 2; }
  .tiptap-editor .is-editor-empty:first-child::before { content: attr(data-placeholder); float: left; color: var(--text-muted); pointer-events: none; height: 0; }
`;

// ─── EMPTY STATE ──────────────────────────────────────────────────────────────
function EmptyState({ onNew }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "80px 24px", textAlign: "center",
    }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>📝</div>
      <h3 style={{ margin: "0 0 8px", fontSize: "18px", fontWeight: "700", color: "var(--text-main)" }}>
        No notes yet
      </h3>
      <p style={{ margin: "0 0 24px", color: "var(--text-muted)", fontSize: "14px" }}>
        Create your first note to get started
      </p>
      <button onClick={onNew} style={{
        padding: "10px 24px", borderRadius: "8px", border: "none",
        background: "var(--primary)", color: "#fff",
        fontWeight: "700", fontSize: "14px", cursor: "pointer",
      }}>
        + New Note
      </button>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function FacultyNotes() {
  // ── view state: "list" | "editor" ──
  const [view, setView]           = useState("list");
  const [editingNote, setEditing] = useState(null); // null = create mode, object = edit mode

  // ── list state ──
  const [notes, setNotes]         = useState([]);
  const [loading, setLoading]     = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // ── filter state (list view) ──
  const [universities, setUniversities] = useState([]);
  const [courses, setCourses]           = useState([]);
  const [subjects, setSubjects]         = useState([]);
  const [filter, setFilter]             = useState({ universityId: "", courseId: "", semester: "", subjectId: "" });

  // ── editor state ──
  const [formData, setFormData]   = useState({ universityId: "", courseId: "", semester: "", subjectId: "", title: "", order: 1 });
  const [eCourses, setECourses]   = useState([]);
  const [eSubjects, setESubjects] = useState([]);
  const [saving, setSaving]       = useState(false);
  const [preview, setPreview]     = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // ── toast ──
  const [toast, setToast] = useState(null);
  const showToast = (message, type = "success") => setToast({ message, type });

  const { uploadImage } = useImageUpload();

  // ─── EDITOR INSTANCE ──────────────────────────────────────────────────────
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Highlight, TextStyle, Color, Subscript, Superscript,
      Image.configure({ inline: false, allowBase64: false }),
      Link.configure({ autolink: true }),
      Youtube.configure({ width: "100%", height: "auto" }),
      TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
      CodeBlockLowlight,
      Table.configure({ resizable: true }),
      TableRow, TableHeader, TableCell,
      CharacterCount,
      Placeholder.configure({ placeholder: "Start typing your note here…" }),
    ],
    editorProps: {
      handleDrop(view, event, _slice, moved) {
        if (!moved && event.dataTransfer?.files?.length) {
          const file = event.dataTransfer.files[0];
          if (!file.type.startsWith("image/")) return false;
          event.preventDefault();
          const coords = view.posAtCoords({ left: event.clientX, top: event.clientY });
          uploadImage(file).then((url) => {
            const node = view.state.schema.nodes.image.create({ src: url });
            view.dispatch(view.state.tr.insert(coords.pos, node));
          }).catch(() => showToast("Image upload failed", "error"));
          return true;
        }
        return false;
      },
      handlePaste(view, event) {
        const items = Array.from(event.clipboardData?.items || []);
        const img   = items.find((i) => i.type.startsWith("image/"));
        if (!img) return false;
        event.preventDefault();
        const file = img.getAsFile();
        uploadImage(file).then((url) => {
          const node = view.state.schema.nodes.image.create({ src: url });
          view.dispatch(view.state.tr.replaceSelectionWith(node));
        }).catch(() => showToast("Image upload failed", "error"));
        return true;
      },
    },
    onUpdate: ({ editor }) => setWordCount(editor.storage.characterCount?.words?.() || 0),
  });

  useBase64ImageReplacer(editor);

  // ─── BOOTSTRAP ────────────────────────────────────────────────────────────
  useEffect(() => {
    API.get("/academic/universities").then((r) => setUniversities(r.data)).catch(console.error);
    loadNotes();
  }, []);

  const loadNotes = async (params = {}) => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      if (params.universityId) q.set("universityId", params.universityId);
      if (params.courseId)     q.set("courseId",     params.courseId);
      if (params.semester)     q.set("semester",     params.semester);
      if (params.subjectId)    q.set("subjectId",    params.subjectId);
      const r = await API.get(`/notes/faculty?${q.toString()}`);
      setNotes(r.data);
    } catch(err) {
      console.log(err)
      showToast("Failed to load notes", "error");
    } finally {
      setLoading(false);
    }
  };

  // ─── FILTER HELPERS ───────────────────────────────────────────────────────
  const filterCourseList  = courses;
  const filterSubjectList = subjects;
  const selectedFilterCourse = filterCourseList.find((c) => c._id === filter.courseId);

  const handleFilterUni = async (id) => {
    const next = { universityId: id, courseId: "", semester: "", subjectId: "" };
    setFilter(next); setCourses([]); setSubjects([]);
    if (id) {
      const r = await API.get(`/academic/courses/${id}`);
      setCourses(r.data);
    }
    loadNotes({ universityId: id });
  };
  const handleFilterCourse = (id) => {
    const next = { ...filter, courseId: id, semester: "", subjectId: "" };
    setFilter(next); setSubjects([]);
    loadNotes({ ...next });
  };
  const handleFilterSem = async (sem) => {
    const next = { ...filter, semester: sem, subjectId: "" };
    setFilter(next); setSubjects([]);
    if (filter.courseId && sem) {
      const r = await API.get(`/academic/subjects/${filter.courseId}/${sem}`);
      setSubjects(r.data);
    }
    loadNotes({ ...next });
  };
  const handleFilterSubject = (id) => {
    const next = { ...filter, subjectId: id };
    setFilter(next);
    loadNotes({ ...next });
  };

  // ─── EDITOR HELPERS ───────────────────────────────────────────────────────
  const openCreate = () => {
    setEditing(null);
    setFormData({ universityId: "", courseId: "", semester: "", subjectId: "", title: "", order: 1 });
    setECourses([]); setESubjects([]);
    editor?.commands.clearContent();
    setPreview(false);
    setView("editor");
  };

  const openEdit = async (note) => {
    setEditing(note);
    // Pre-fill form
    const fd = {
      universityId: note.university?._id || note.university,
      courseId:     note.course?._id     || note.course,
      semester:     String(note.semester),
      subjectId:    note.subject?._id    || note.subject,
      title:        note.title,
      order:        note.order,
    };
    setFormData(fd);

    // Pre-load dropdowns for this note's university/course/semester
    try {
      const [cRes, sRes] = await Promise.all([
        API.get(`/academic/courses/${fd.universityId}`),
        API.get(`/academic/subjects/${fd.courseId}/${fd.semester}`),
      ]);
      setECourses(cRes.data);
      setESubjects(sRes.data);
    } catch { /* non-fatal */ }

    editor?.commands.setContent(note.description || "");
    setPreview(false);
    setView("editor");
  };

  // Editor form dropdown helpers
  const handleEditorUni = async (id) => {
    setFormData((p) => ({ ...p, universityId: id, courseId: "", semester: "", subjectId: "" }));
    setECourses([]); setESubjects([]);
    if (id) { const r = await API.get(`/academic/courses/${id}`); setECourses(r.data); }
  };
  const handleEditorSem = async (sem) => {
    setFormData((p) => ({ ...p, semester: sem, subjectId: "" }));
    setESubjects([]);
    if (formData.courseId && sem) {
      const r = await API.get(`/academic/subjects/${formData.courseId}/${sem}`);
      setESubjects(r.data);
    }
  };
  const selectedEditorCourse = eCourses.find((c) => c._id === formData.courseId);

  // ─── SAVE (create or update) ──────────────────────────────────────────────
  const handleSave = async () => {
    if (!editor) return;
    if (!formData.title.trim()) { showToast("Please enter a title", "warn"); return; }
    if (!formData.subjectId)    { showToast("Please select a subject", "warn"); return; }

    setSaving(true);
    try {
      const payload = {
        title:       formData.title,
        description: editor.getHTML(),
        university:  formData.universityId,
        course:      formData.courseId,
        semester:    Number(formData.semester),
        subject:     formData.subjectId,
        order:       Number(formData.order),
      };

      if (editingNote) {
        await API.put(`/notes/${editingNote._id}`, payload);
        showToast("Note updated ✓");
      } else {
        await API.post("/notes", payload);
        showToast("Note saved ✓");
      }

      await loadNotes(filter);
      setView("list");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to save note", "error");
    } finally {
      setSaving(false);
    }
  };

  // ─── DELETE ───────────────────────────────────────────────────────────────
  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    try {
      await API.delete(`/notes/${deleteTarget._id}`);
      showToast("Note deleted");
      setNotes((prev) => prev.filter((n) => n._id !== deleteTarget._id));
    } catch {
      showToast("Failed to delete note", "error");
    } finally {
      setDeleteTarget(null);
    }
  };

  // ─── SHARED STYLES ────────────────────────────────────────────────────────
  const selectStyle = {
    border: "1px solid var(--border)", borderRadius: "8px",
    padding: "10px 12px", backgroundColor: "var(--bg-card)",
    color: "var(--text-main)", fontSize: "14px",
    outline: "none", width: "100%", boxSizing: "border-box",
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // RENDER
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <>
      <style>{editorStyles}</style>
      {toast && <Toast message={toast.message} type={toast.type} onDone={() => setToast(null)} />}
      {deleteTarget && (
        <ConfirmDialog
          message={`Delete "${deleteTarget.title}"? This cannot be undone.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 24px 96px", color: "var(--text-main)", }}>

        {/* ══ LIST VIEW ═══════════════════════════════════════════════════════ */}
        {view === "list" && (
          <>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "6px" }}>
                  Faculty Portal
                </p>
                <h1 style={{ fontSize: "2rem", fontWeight: "900", color: "var(--text-main)", margin: 0 }}>
                  My Notes
                </h1>
              </div>
              <button onClick={openCreate} style={{
                padding: "10px 22px", borderRadius: "8px", border: "none",
                background: "var(--primary)", color: "#fff",
                fontWeight: "700", fontSize: "14px", cursor: "pointer",
              }}>
                + New Note
              </button>
            </div>

            {/* Filters */}
            <div style={{
              border: "1px solid var(--border)", borderRadius: "14px",
              padding: "18px 20px", background: "var(--bg-card)", marginBottom: "20px",
            }}>
              <p style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "12px" }}>
                Filter Notes
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "10px" }}>
                <select style={selectStyle} value={filter.universityId} onChange={(e) => handleFilterUni(e.target.value)}>
                  <option value="">All Universities</option>
                  {universities.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
                </select>
                <select style={selectStyle} value={filter.courseId} onChange={(e) => handleFilterCourse(e.target.value)} disabled={!filterCourseList.length}>
                  <option value="">All Courses</option>
                  {filterCourseList.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <select style={selectStyle} value={filter.semester} onChange={(e) => handleFilterSem(e.target.value)} disabled={!filter.courseId}>
                  <option value="">All Semesters</option>
                  {selectedFilterCourse && [...Array(selectedFilterCourse.totalSemesters)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                  ))}
                </select>
                <select style={selectStyle} value={filter.subjectId} onChange={(e) => handleFilterSubject(e.target.value)} disabled={!filterSubjectList.length}>
                  <option value="">All Subjects</option>
                  {filterSubjectList.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
              </div>
            </div>

            {/* Notes grid */}
            {loading ? (
              <div style={{ padding: "60px", textAlign: "center", color: "var(--text-muted)" }}>Loading notes…</div>
            ) : notes.length === 0 ? (
              <EmptyState onNew={openCreate} />
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: "0 0 4px" }}>
                  {notes.length} note{notes.length !== 1 ? "s" : ""}
                </p>
                {notes.map((note) => (
                  <NoteCard
                    key={note._id}
                    note={note}
                    onEdit={openEdit}
                    onDelete={setDeleteTarget}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* ══ EDITOR VIEW ═════════════════════════════════════════════════════ */}
        {view === "editor" && (
          <>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <button onClick={() => setView("list")} style={{
                  padding: "8px 14px", borderRadius: "8px", border: "1px solid var(--border)",
                  background: "var(--bg-card)", color: "var(--text-muted)",
                  fontWeight: "600", fontSize: "13px", cursor: "pointer",
                }}>
                  ← Back
                </button>
                <div>
                  <p style={{ fontSize: "12px", fontWeight: "600", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "2px" }}>
                    Faculty Portal
                  </p>
                  <h1 style={{ fontSize: "1.6rem", fontWeight: "900", color: "var(--text-main)", margin: 0 }}>
                    {editingNote ? "Edit Note" : "New Note"}
                  </h1>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button onClick={() => setPreview((p) => !p)} style={{
                  padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: "600",
                  border: "1px solid var(--border)",
                  background: preview ? "var(--primary)" : "var(--bg-card)",
                  color: preview ? "#fff" : "var(--text-main)", cursor: "pointer",
                }}>
                  {preview ? "← Edit" : "Preview ▶"}
                </button>
                <button onClick={handleSave} disabled={saving} style={{
                  padding: "10px 24px", borderRadius: "8px", fontSize: "13px", fontWeight: "700",
                  border: "none",
                  background: saving ? "var(--border)" : "var(--primary)",
                  color: "#fff", cursor: saving ? "default" : "pointer",
                }}>
                  {saving ? "Saving…" : editingNote ? "Update Note" : "Save Note"}
                </button>
              </div>
            </div>

            {/* Meta fields */}
            <div style={{
              border: "1px solid var(--border)", borderRadius: "16px",
              padding: "24px 28px", background: "var(--bg-card)", marginBottom: "20px",
            }}>
              <p style={{ fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)", marginBottom: "14px" }}>
                Note Details
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "10px" }}>
                <select style={selectStyle} value={formData.universityId || ""} onChange={(e) => handleEditorUni(e.target.value)}>
                  <option value="">University</option>
                  {universities.map((u) => <option key={u._id} value={u._id}>{u.name}</option>)}
                </select>
                <select style={selectStyle} value={formData.courseId || ""} onChange={(e) => setFormData((p) => ({ ...p, courseId: e.target.value, semester: "", subjectId: "" }))} disabled={!eCourses.length}>
                  <option value="">Course</option>
                  {eCourses.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                </select>
                <select style={selectStyle} value={formData.semester || ""} onChange={(e) => handleEditorSem(e.target.value)} disabled={!formData.courseId}>
                  <option value="">Semester</option>
                  {selectedEditorCourse && [...Array(selectedEditorCourse.totalSemesters)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>Semester {i + 1}</option>
                  ))}
                </select>
                <select style={selectStyle} value={formData.subjectId || ""} onChange={(e) => setFormData((p) => ({ ...p, subjectId: e.target.value }))} disabled={!eSubjects.length}>
                  <option value="">Subject</option>
                  {eSubjects.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
                </select>
                <input type="text" placeholder="Chapter Title" value={formData.title || ""} onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))} style={selectStyle} />
                <input type="number" placeholder="Order" value={formData.order || ""} min="1" onChange={(e) => setFormData((p) => ({ ...p, order: e.target.value }))} style={selectStyle} />
              </div>
            </div>

            {/* Editor / Preview */}
            {preview ? (
              <div style={{ border: "1px solid var(--border)", borderRadius: "16px", padding: "40px", background: "var(--bg-card)" }}>
                <p style={{ fontSize: "11px", fontWeight: "700", color: "var(--primary)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "24px" }}>Preview</p>
                <div className="tiptap-editor" style={{ padding: 0 }} dangerouslySetInnerHTML={{ __html: editor?.getHTML() || "" }} />
              </div>
            ) : (
              <div style={{ border: "1px solid var(--border)", borderRadius: "16px", background: "var(--bg-card)", overflow: "hidden" }}>
                <Toolbar editor={editor} />
                <InlineBubble editor={editor} />
                <EditorContent editor={editor} className="tiptap-editor" />
                <div style={{ padding: "8px 40px", borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end" }}>
                  <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>
                    {wordCount} words · {editor?.storage.characterCount?.characters()} characters
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}