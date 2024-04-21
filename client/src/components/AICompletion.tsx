import React from "react"
import { getAICompletion, getAImage } from "../api"
import { toast } from "react-hot-toast"
import DeleteIcon from "@mui/icons-material/Delete"
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { IoClose } from "react-icons/io5";
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
    setPage(0)
    toast.loading("Generating Suggestion", {
      id: "loading",
    })
    getAICompletion(prompt)
      .then((response) => {
        const text = response.data
        setTextSuggestions((prev) => [text, ...prev])
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
    setPage(1)
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
    <div className="bg-white p-4 h-[90%] w-[24%] space-y-4 rounded-lg border overflow-auto font-normal">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Generate with AI</h1>
        {setIsAICompletionOpen && (
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsAICompletionOpen(false)
              console.log("clicked")
            }}
            className="bg-red-500 z-50 text-white p-0.5 text-lg hover:bg-red-700 fit rounded-full flex  justify-center text-center"
          >
           <IoClose/>
          </button>
        )}
      </div>
      <div className="flex flex-col gap-4 items-center ">
        <textarea
          value={prompt}
          rows={4}
          placeholder="Enter prompt here"
          onChange={(e) => setPrompt(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none ring-highlight focus:ring-2 w-full  resize-none text-sm"
        />
        <div className="grid grid-cols-2 gap-3">
          <Button
            text="Autocomplete Text"
            disable={loading || prompt === ""}
            onClick={handleTextSuggestion}
          />
          <Button
            text="Generate Img"
            disable={loading || prompt === ""}
            onClick={handleImageSuggestion}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <div className="flex mx-auto text-base bg-dark w-full rounded-md overflow-hidden ">
            <button
              onClick={() => setPage(0)}
              className={`${
                page === 0 ? "text-white bg-highlight " : "text-gray-200"
              } hover:bg-highlight text-center w-1/2`}
            >
              Text
            </button>
            <button
              onClick={() => setPage(1)}
              className={`${
                page === 1 ? "text-white  bg-highlight" : "text-gray-200"
              } hover:bg-highlight text-center w-1/2`}
            >
              Image
            </button>
          </div>
          {page === 0 ? (
            <div>
              {textSuggestions.map((textSuggestion, index) => (
                <div
                  key={index}
                  className="border p-2 rounded-lg text-sm relative"
                >
                  <div className="p-1 pt-3 text-gray-800">{textSuggestion}</div>
                  <div className="flex justify-around absolute top-3 right-1 gap-0.5">
                    <button
                    onClick={
                      () => {
                        navigator.clipboard.writeText(textSuggestion)
                        toast.success("Text copied to clipboard")
                      }
                    }
                    >
                      <ContentCopyRoundedIcon fontSize="small" className="text-gray-600 hover:text-gray-800"/>
                    </button>
                    <button
                      onClick={() =>
                        setTextSuggestions((prev) =>
                          prev.filter((_, i) => i !== index),
                        )
                      }
                    >
                      <DeleteIcon fontSize="small" className="hover:text-red-600 text-red-500"/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
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
      className={`border-2 border-dark font-medium px-4 py-2 flex items-center text-sm rounded-lg justify-center text-dark
        ${disable ? "opacity-50 cursor-not-allowed" : "hover:bg-dark hover:text-white"}`}
    >
      {text}
    </button>
  )
}

export default AICompletion
