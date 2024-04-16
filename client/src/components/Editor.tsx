import { useEffect, useRef } from "react"
import { useEditorContext } from "../context/EditorContext"
// Import the package

const EditorPage = () => {
  const { initializeEditor } = useEditorContext()
  const editorRef = useRef<any>(null)

  useEffect(() => {
    if (editorRef.current == null) {
      initializeEditor()
      editorRef.current = true
    }
  }, [])
  // Match the id with holder value in EditorContext.tsx

  return (
    // <button onClick={handleClick}>Save</button>
    <div id="editorjs"></div>
  )
}

export default EditorPage
