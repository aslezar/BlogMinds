import React from "react"
import { getAICompletion, getAImage } from "../api"
import { toast } from "react-hot-toast"

interface AICompletionProps {
  setIsAICompletionOpen?: React.Dispatch<React.SetStateAction<boolean>>
}
type StringPair = {
  prompt: string
  imageUrl: string
}

const AICompletion: React.FC<AICompletionProps> = ({
  setIsAICompletionOpen,
}) => {
  const [prompt, setPrompt] = React.useState<string>("")
  const [loading, setLoading] = React.useState(false)
  const [page, setPage] = React.useState(0)

  const [textSuggestions, setTextSuggestions] = React.useState<string[]>([])
  const [imageSuggestions, setImageSuggestions] = React.useState<StringPair[]>(
    [],
  )

  React.useEffect(() => {
    return () => {
      imageSuggestions.forEach((image) => URL.revokeObjectURL(image.imageUrl))
    }
  }, [])

  const handleTextSuggestion = async () => {
    setLoading(true)
    toast.loading("Generating Suggestion", {
      id: "loading",
    })
    getAICompletion(prompt)
      .then((response) => {
        const text = response.data
        setTextSuggestions((prev) => [...prev, text])
        setPage(0)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss("loading")
      })
  }

  const isPromptAlreadySuggested = (prompt: string) => {
    return imageSuggestions.some((pair) => pair.prompt === prompt)
  }
  const handleImageSuggestion = async () => {
    if (isPromptAlreadySuggested(prompt))
      return toast.success("Prompt already suggested, please try another one.")

    setLoading(true)
    toast.loading("Generating Image", {
      id: "loading",
    })
    getAImage(prompt)
      .then((response) => {
        const image = response.data
        const imageUrl = URL.createObjectURL(image)
        setImageSuggestions((prev) => [{ prompt, imageUrl }, ...prev])
        setPage(1)
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => {
        setLoading(false)
        toast.dismiss("loading")
      })
  }
  const handleButtonClick = () => {
    toast.error("This feature is not implemented yet.Reminder!!!")
  }
  const handleImageDiscard = (index: number) => {
    const newImageSuggestions = imageSuggestions.filter((_, i) => {
      if (i === index) URL.revokeObjectURL(imageSuggestions[i].imageUrl)
      return i !== index
    })
    setImageSuggestions(newImageSuggestions)
  }
  const handleAddtoBlog = (image: StringPair) => {
    console.log(image)
    toast.error("this feature is not implemented yet.Reminder!!!")
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
            <button
              onClick={() => setPage(0)}
              className={`${
                page === 0 ? "text-blue-500" : "text-gray-500"
              } hover:text-blue-500`}
            >
              Text
            </button>
            <button
              onClick={() => setPage(1)}
              className={`${
                page === 1 ? "text-blue-500" : "text-gray-500"
              } hover:text-blue-500`}
            >
              Image
            </button>
          </div>
          {page === 0 ? (
            <div>
              <h1>Text Suggestions</h1>
              {textSuggestions.map((textSuggestion, index) => (
                <div key={index} className="border p-2">
                  <div>{textSuggestion}</div>
                  <Button text="Use in Blog" onClick={handleButtonClick} />
                  <Button
                    text="Discard"
                    onClick={() =>
                      setTextSuggestions((prev) =>
                        prev.filter((_, i) => i !== index),
                      )
                    }
                  />
                  <Button
                    text="Copy Text"
                    onClick={() => {
                      navigator.clipboard.writeText(textSuggestion)
                      toast.success("Text copied to clipboard")
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div>
              <h1>Image Suggestions</h1>
              {imageSuggestions.map((image, index) => (
                <div key={image.imageUrl} className="border p-2">
                  <div>
                    {index + 1}. {image.prompt}
                  </div>
                  <img
                    src={image.imageUrl}
                    alt={image.prompt}
                    onClick={() => handleAddtoBlog(image)}
                  />
                  <Button
                    onClick={handleButtonClick}
                    text="Save to Assest Folder"
                  />
                  <Button
                    onClick={() => handleAddtoBlog(image)}
                    text="Use in Blog ->"
                  />
                  <Button
                    onClick={() => {
                      handleImageDiscard(index)
                    }}
                    text="Discard"
                  />
                  <Button
                    text="Copy URL"
                    onClick={() => {
                      navigator.clipboard.writeText(image.imageUrl)
                      toast.success("URL copied to clipboard")
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
interface ButtonProps {
  text: string
  onClick: () => any
  disable?: boolean
}
const Button: React.FC<ButtonProps> = ({ text, onClick, disable }) => {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={`border-2 border-dark font-medium px-4 py-2 flex items-center justify-center text-dark
        ${disable ? "opacity-50 cursor-not-allowed" : "hover:bg-dark hover:text-white"}`}
    >
      {text}
    </button>
  )
}

export default AICompletion
