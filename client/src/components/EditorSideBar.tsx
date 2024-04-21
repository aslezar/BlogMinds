import React from "react"
import { BlogCreateType, Category } from "../definitions"
import AssetsFolder from "./AssetsFolder"
import ImageInput from "./ImageInput"
import MultiSelect from "./MultiSelect"
import AICompletion from "./AICompletion"
import Loader from "./Loader"

interface BlogEditorProps {
  blogId: BlogCreateType["_id"] | undefined
  blog: BlogCreateType | null
  setBlog: React.Dispatch<React.SetStateAction<BlogCreateType | null>>
  disabledPublish: boolean
  handlePublish: (event: React.SyntheticEvent) => void
}

const BlogEditor: React.FC<BlogEditorProps> = ({
  blogId,
  blog,
  setBlog,
  disabledPublish,
  handlePublish,
}) => {
  const [isAssetsOpen, setIsAssetsOpen] = React.useState(false)
  const [isAICompletionOpen, setIsAICompletionOpen] = React.useState(false)

  if (blog === null) return <Loader />
  return (
    <div className="flex flex-col px-3 pt-4 md:w-1/5 bg-white mx-auto gap-3 h-full fixed left-0">
      <ImageInput
        value={blog.img}
        onChange={(img: string) => setBlog({ ...blog, img })}
      />
      <input
        type="text"
        placeholder="Article Title"
        value={blog.title}
        onChange={(e) => setBlog({ ...blog, title: e.target.value })}
        className="p-3 border rounded-lg focus:outline-none focus:ring w-full text-base"
      />
      <textarea
        value={blog.description}
        onChange={(e) => setBlog({ ...blog, description: e.target.value })}
        placeholder="Short Description of the Article ...."
        rows={4}
        className="px-3 py-2 border rounded-md focus:outline-none focus:ring resize-none text-sm"
      />
      <MultiSelect
        value={blog.tags}
        onChange={(selectedOptions: Category[]) =>
          setBlog({ ...blog, tags: selectedOptions })
        }
        placeholder="Select categories"
      />
      <div className=" border border-highlight flex items-center justify-center  font-medium rounded-md focus:outline-none focus:ring resize-none cursor-pointer
      `">
        <span
          className="text-sm  text-highlight w-full h-full px-3 py-2 flex items-center justify-center"
          onClick={() => setIsAssetsOpen(true)}
        >
          Assets and Images
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5  ml-2 inline"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </span>
        {isAssetsOpen && (
          <>
            <div className="fixed inset-0 z-40 top-5  p-5 backdrop-blur-sm h-full w-[24%] flex pt-20 start">
              <AssetsFolder setIsAssetsOpen={setIsAssetsOpen} />
            </div>
          </>
        )}
      </div>

      <div className=" bg-gradient-to-tl from-dark  to-highlight py-2 rounded-lg font-medium flex items-center cursor-pointer">
        <span
          className="text-sm text-white h-full px-3 w-full text-center "
          onClick={() => setIsAICompletionOpen(true)}
        >
          Generate with AI
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5 inline ml-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
            />
          </svg>
        </span>
        <div
          className={`fixed inset-0 z-40 top-5 mx-auto p-5 backdrop-blur-sm h-full w-screen flex pt-20 start ${isAICompletionOpen ? "block" : "hidden"}`}
        >
          <AICompletion setIsAICompletionOpen={setIsAICompletionOpen} />
        </div>
      </div>
      <button
        type="submit"
        onClick={handlePublish}
        disabled={disabledPublish}
        className={`border-2 border-dark font-medium px-4 py-2 rounded-full flex items-center justify-center text-dark
              ${disabledPublish ? "opacity-50 cursor-progress" : "hover:bg-dark hover:text-white"}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 inline mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        {blogId === "new_blog" ? "Publish" : "Update"}
      </button>
    </div>
  )
}

export default BlogEditor
