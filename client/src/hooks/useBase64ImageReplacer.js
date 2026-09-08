import { useEffect } from "react";

export function useBase64ImageReplacer(editor) {
  useEffect(() => {
    if (!editor) return;

    const handleUpdate = () => {
      // Future logic for replacing pasted base64 images.
      // Currently does nothing.
    };

    editor.on("update", handleUpdate);

    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor]);
}