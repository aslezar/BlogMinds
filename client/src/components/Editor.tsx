import { useContext, useEffect } from "react"
import { EditorContext } from "../context/EditorContext"

const EditorPage = () => {
  const { initializeEditor, editorInstanceRef } = useContext(EditorContext)
  useEffect(() => {
    if (editorInstanceRef.current == null) {
      initializeEditor()
    }
  }, [])
  // Match the id with holder value in EditorContext.tsx
  return <div id="editorjs"></div>
}

export default EditorPage
