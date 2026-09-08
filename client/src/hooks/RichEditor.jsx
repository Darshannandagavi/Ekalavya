import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichEditor({
  value,
  onChange,
}) {
  const editor = useEditor({
    extensions: [StarterKit],

    content: value,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded-lg p-3 min-h-[300px]">
      <EditorContent editor={editor} />
    </div>
  );
}