import React from "react"
import { getAICompletion, getAImage } from "../api"
import { toast } from "react-hot-toast"

interface AICompletionProps {
  setIsAICompletionOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const AICompletion: React.FC<AICompletionProps> = ({
  setIsAICompletionOpen,
}) => {
  const [prompt, setPrompt] = React.useState<string>("")
  const [loading, setLoading] = React.useState(false)
  const [page, setPage] = React.useState(0)
  const handleTextSuggestion = async () => {
    setLoading(true)
    toast.loading("Generating Suggestion", {
      id: "loading",
    })
    getAICompletion(prompt)
      .then((response) => {
        const text = response.data
        console.log(text)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss("loading")
      })
  }
  const handleImageSuggestion = async () => {
    setLoading(true)
    toast.loading("Generatingi Image", {
      id: "loading",
    })
    getAImage(prompt)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss("loading")
      })
  }
  return (
    <div className="bg-white p-4 h-5/6 w-[24%] space-y-4 rounded-lg border overflow-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Your AI Assistant</h1>
        {setIsAICompletionOpen && (
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsAICompletionOpen(false)
              console.log("clicked")
            }}
            className="bg-red-500 z-50 text-white py-1 px-2 h-fit rounded-lg flex  justify-center text-center"
          >
            Close
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-4 items-center ">
        <textarea
          value={prompt}
          rows={4}
          placeholder="Enter prompt here"
          onChange={(e) => setPrompt(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none focus:ring w-full text-lg resize-none"
        />
        <div className="flex gap-4">
          <Button
            text="Get Suggestion"
            disable={loading || prompt === ""}
            onClick={handleTextSuggestion}
          />
          <Button
            text="Get Image"
            disable={loading || prompt === ""}
            onClick={handleImageSuggestion}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-4">
            <button onClick={() => setPage(0)}>Text</button>
            <button onClick={() => setPage(1)}>Image</button>
          </div>
          {page === 0 ? (
            <div>
              <h1>Text Suggestions</h1>
            </div>
          ) : (
            <div>
              <h1>Image Suggestions</h1>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
interface ButtonProps {
  text: string
  onClick: () => void
  disable: boolean
}
const Button: React.FC<ButtonProps> = ({ text, onClick, disable }) => {
  return (
    <button
      onClick={onClick}
      className={`border-2 border-dark font-medium px-4 py-2 flex items-center justify-center text-dark
        ${disable ? "opacity-50 cursor-not-allowed" : "hover:bg-dark hover:text-white"}`}
    >
      {text}
    </button>
  )
}

export default AICompletion
