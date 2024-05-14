import { useEffect, useRef } from "react"
import { useEditorContext } from "../context/EditorContext"

const EditorPage = () => {
  const { initializeEditor } = useEditorContext()
  const editorRef = useRef<any>(null)

  useEffect(() => {
    if (editorRef.current === null) {
      initializeEditor()
      editorRef.current = true
    }
  }, [])

  return <div id="editorjs" className="hidden lg:block mx-auto w-full"></div>
}

export default EditorPage
