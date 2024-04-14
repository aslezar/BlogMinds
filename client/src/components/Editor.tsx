import { useContext, useEffect, useRef, useState } from "react"
import { EditorContext } from "../context/EditorContext"
// Import the package
import edjsHTML from "editorjs-html"

const EditorPage = () => {
  const { initializeEditor, editorInstanceRef } = useContext(EditorContext)
  const [data, setData] = useState<any>(null)
  const editorRef = useRef<any>(null)
  const handleClick = async () => {
    const output = await editorInstanceRef.current.save()
    const edjsParser = edjsHTML();
    let html = edjsParser.parse(output);
    console.log(html);
    setData(html)
  }
  console.log(data)
  useEffect(() => {
    if (editorRef.current == null) {
      initializeEditor()
      editorRef.current = true
    }
  }, [])
  // Match the id with holder value in EditorContext.tsx

  return (
    <div>
      <button onClick={handleClick}>Save</button>
      <div id="editorjs"></div>
    </div>
  )
}

export default EditorPage
