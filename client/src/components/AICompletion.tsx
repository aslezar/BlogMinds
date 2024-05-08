import React from "react"
import { getAICompletion, getAImage, uploadAssets } from "../api"
import { toast } from "react-hot-toast"
import DeleteIcon from "@mui/icons-material/Delete"
import { IoClose } from "react-icons/io5"
import Tooltip from "@mui/material/Tooltip"
import { IconButton } from "@mui/material"
import { TbFileTextAi } from "react-icons/tb"
import { LuImagePlus } from "react-icons/lu"
import { FaPlay } from "react-icons/fa"
import { MdContentCopy } from "react-icons/md"
import { BsFillEraserFill } from "react-icons/bs"
interface AICompletionProps {
  setIsAICompletionOpen?: React.Dispatch<React.SetStateAction<boolean>>
  handleImageUpload: (imageUrl: string, prompt: string) => void
  handleTextUploadToEditor: (text: string) => void
}
type ImageDataType = {
  id: string
  prompt: string
  imageBlob: Blob | null
  imageUrl: string
  isSaved: boolean
}

const AICompletion: React.FC<AICompletionProps> = ({
  setIsAICompletionOpen,
  handleImageUpload,
  handleTextUploadToEditor,
}) => {
  const [prompt, setPrompt] = React.useState<string>("")
  const [loading, setLoading] = React.useState(false)
  const [page, setPage] = React.useState(0)

  const [textSuggestions, setTextSuggestions] = React.useState<string[]>([])
  const [imageSuggestions, setImageSuggestions] = React.useState<
    ImageDataType[]
  >([])

  React.useEffect(() => {
    return () => {
      imageSuggestions.forEach((image) => URL.revokeObjectURL(image.imageUrl))
    }
  }, [])
  const handleTextSuggestion = async (textPrompt?: string) => {
    setLoading(true)
    setPage(0)
    toast.loading("Generating Suggestion", {
      id: "loading",
    })

    getAICompletion(textPrompt || prompt)
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
        const imageBlob = response.data
        const imageUrl = URL.createObjectURL(imageBlob)
        setImageSuggestions((prev) => [
          {
            id: Date.now().toString(),
            prompt,
            imageBlob,
            imageUrl,
            isSaved: false,
          },
          ...prev,
        ])
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
  const saveToAssets = (image: ImageDataType): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!image.imageBlob || image.isSaved) {
        toast.success("Saved")
        return reject(new Error("Image already saved"))
      }

      const file = new File([image.imageBlob], image.prompt.slice(0, 20), {
        type: "image/jpeg",
      })

      toast.loading("Saving to Assets Folder ...", { id: "uploading" })
      uploadAssets([file])
        .then((res) => {
          //update image in state
          const imageUrl = res.data[0]
          console.log(imageUrl)

          setImageSuggestions((prev) =>
            prev.map((img) => {
              if (img.id === image.id) {
                URL.revokeObjectURL(img.imageUrl)
                img.imageUrl = imageUrl
                img.imageBlob = null
                img.isSaved = true
              }
              return img
            }),
          )
          resolve()
        })
        .catch((err) => {
          console.log(err)
          reject(err)
        })
        .finally(() =>
          toast.success("Saved", {
            id: "uploading",
          }),
        )
    })
  }
  const handleImageDiscard = (index: number) => {
    const newImageSuggestions = imageSuggestions.filter((_, i) => {
      if (i === index) URL.revokeObjectURL(imageSuggestions[i].imageUrl)
      return i !== index
    })
    setImageSuggestions(newImageSuggestions)
  }

  const handleAddToBlog = async (image: ImageDataType) => {
    try {
      // If the image is not saved, save it first
      if (!image.isSaved) {
        await saveToAssets(image)
      }

      // Upload the image to the blog post
      handleImageUpload(image.imageUrl, image.prompt)
    } catch (error) {
      console.log(error)
      // Handle error if saving to assets or uploading to the blog post fails
    }
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
            className="bg-red-500 z-50 text-white p-0.5 text-lg hover:bg-red-700 fit rounded-full flex justify-center text-center"
          >
            <IoClose />
          </button>
        )}
      </div>
      <div className="flex flex-col gap-4 items-center relative">
        <textarea
          value={prompt}
          rows={5}
          placeholder="Enter prompt here"
          onChange={(e) => setPrompt(e.target.value)}
          className="p-3 border rounded-lg focus:outline-none ring-highlight focus:ring-2 w-full  resize-none text-sm"
        />
        <Tooltip title="Clear Prompt" className="absolute top-1 right-1">
          <span>
            <button
              onClick={() => {
                setPrompt("")
              }}
              disabled={prompt === ""}
            >
              <BsFillEraserFill
                className={prompt === "" ? "text-gray-300" : "text-gray-600"}
              />
            </button>
          </span>
        </Tooltip>
        <div className="grid grid-cols-2 gap-3">
          <Button
            text="Autocomplete"
            disable={loading || prompt === ""}
            onClick={() => handleTextSuggestion(prompt)}
            icon={<TbFileTextAi className="text-lg" />}
          />
          <Button
            text="Generate"
            disable={loading || prompt === ""}
            onClick={handleImageSuggestion}
            icon={<LuImagePlus className="text-lg" />}
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
          <div className="flex flex-col gap-2">
            {page === 0 ? (
              <>
                {textSuggestions.map((textSuggestion, index) => (
                  <div
                    key={index}
                    className="border p-2 rounded-lg text-sm relative hover:bg-gray-100 cursor-pointer"
                  >
                    <div
                      className="p-1 text-gray-800"
                      onClick={() => handleTextUploadToEditor(textSuggestion)}
                    >
                      {textSuggestion}
                    </div>
                    <div className="flex justify-around absolute bottom-3 right-1 gap-1 items-center">
                      <Tooltip title="Continue Text">
                        <button
                          onClick={() => {
                            setPrompt(textSuggestion)
                            handleTextSuggestion(textSuggestion)
                          }}
                        >
                          <FaPlay
                            fontSize="small"
                            className="text-gray-600 hover:text-gray-800"
                          />
                        </button>
                      </Tooltip>
                      <Tooltip title="Copy Text">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(textSuggestion)
                            toast.success("Text copied to clipboard")
                          }}
                        >
                          <MdContentCopy
                            fontSize="medium"
                            className="text-gray-600 hover:text-gray-800"
                          />
                        </button>
                      </Tooltip>
                      <Tooltip title="Discard">
                        <button
                          onClick={() =>
                            setTextSuggestions((prev) =>
                              prev.filter((_, i) => i !== index),
                            )
                          }
                        >
                          <DeleteIcon
                            fontSize="small"
                            className="hover:text-red-600 text-red-500"
                          />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {imageSuggestions.map((image, index) => (
                  <div key={image.id} className="border p-2 rounded-md">
                    <div className="text-gray-700 italic p-1">
                      {index + 1}. {image.prompt}
                    </div>
                    <img
                      src={image.imageUrl}
                      alt={image.prompt}
                      className="hover:ring rounded-lg ring-dark"
                      onClick={() => handleAddToBlog(image)}
                    />
                    <div className="flex justify-center items-center gap-2">
                      <Tooltip title="Save to Assets">
                        <IconButton onClick={() => saveToAssets(image)}>
                          <LuImagePlus className="text-dark" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Copy URL">
                        <IconButton
                          onClick={async () => {
                            if (!image.isSaved) {
                              try {
                                await saveToAssets(image)
                              } catch (error) {
                                console.log(error)
                              }
                            }
                            navigator.clipboard.writeText(image.imageUrl)
                            toast.success("URL copied to clipboard")
                          }}
                        >
                          <MdContentCopy className="text-dark" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Discard">
                        <IconButton
                          onClick={() => {
                            handleImageDiscard(index)
                          }}
                        >
                          <DeleteIcon className="text-red-500" />
                        </IconButton>
                      </Tooltip>
                    </div>
                    {/* <Button
                    onClick={() => handleAddToBlog(image)}
                    text="Use in Blog ->"
                  /> */}
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
interface ButtonProps {
  text: string
  onClick: () => any
  disable?: boolean
  icon: React.ReactNode
}
const Button: React.FC<ButtonProps> = ({ text, onClick, disable, icon }) => {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={`border-2 border-dark font-medium px-3 py-2 flex items-center rounded-lg justify-center text-dark gap-1 
        ${disable ? "opacity-50 cursor-not-allowed" : "hover:bg-dark hover:text-white"}`}
    >
      <span className="text-sm mb-0.5">{text}</span>
      <span>{icon}</span>
    </button>
  )
}

export default AICompletion
