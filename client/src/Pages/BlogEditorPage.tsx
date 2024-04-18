import React from "react"
import { BlogCreateType, Category } from "../definitions"
import AssetsFolder from "../components/AssetsFolder"
import EditorPage from "../components/Editor"
import toast from "react-hot-toast"
import { getUserBlogById, createBlog, updateBlog } from "../api"
import { useNavigate, useParams } from "react-router-dom"
import { useEditorContext } from "../context/EditorContext"

const initalBlog =
  '{"_id":"new_blog","title":"","description":"","img":"https://source.unsplash.com/random","content":{"time":1550476186479,"blocks":[{"type":"title","data":{"text":"Editor.js","level":2}},{"type":"paragraph","data":{"text":"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."}},{"type":"title","data":{"text":"Key features","level":3}}],"version":"2.8.1"},"tags":[]}'

function BlogEditor() {
  const [isAssetsOpen, setIsAssetsOpen] = React.useState(false)
  const [loadingPublish, setLoadingPublish] = React.useState(false)
  const [blog, setBlog] = React.useState<BlogCreateType | null>(null)
  const navigate = useNavigate()
  //if `blogId === new_blog` then it is a new blog
  const { id: blogId } = useParams<{ id: string }>()
  console.log(blog)
  const { editor } = useEditorContext()

  React.useEffect(() => {
    if (!blogId) return

    if (blogId === "new_blog") {
      const blogFromStorageString =
        localStorage.getItem("new_blog") || initalBlog

      const blogFromStorage = JSON.parse(blogFromStorageString)
      setBlog((_prevBlog) => blogFromStorage)

      // set interval
    } else {
      getUserBlogById(blogId)
        .then((response) => {
          let resBlog = response.data.blog

          resBlog.content = JSON.parse(resBlog.content)

          setBlog(resBlog)
        })
        .catch((err) => {
          console.error(err)
        })
    }
  }, [blogId])

  React.useEffect(() => {
    if (!editor) return
    if (blog) {
      editor.render(blog.content)
    }
    if (blogId == "new_blog") {
      const id = setInterval(async () => {
        if (!editor) return
        const output = await editor.save()

        localStorage.setItem(
          "new_blog",
          JSON.stringify({ ...blog, content: output }),
        )
      }, 1000)
      return () => {
        clearInterval(id)
      }
    }
  }, [editor, blog?.content])

  const createOrUpdateBlog = async (
    blog: BlogCreateType,
    latestContent: BlogCreateType["content"],
  ) => {
    if (blogId) localStorage.setItem("new_blog", JSON.stringify(blog))
    await (blog._id === "new_blog"
      ? createBlog({ ...blog, content: latestContent })
      : updateBlog({ ...blog, content: latestContent }))
  }

  const handlePublish = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (blog === null) return
    setLoadingPublish(true)
    try {
      const latestContent = await editor.save()
      console.log(latestContent)
      await createOrUpdateBlog(blog, latestContent)
      toast.success(
        blog._id === "new_blog" ? "Blog Published" : "Blog updated",
        {
          id: "publish",
        },
      )
      navigate(`/feed`)
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingPublish(false)
    }
  }
  if (blog === null) return <div>Loading...</div>
  return (
    <div className="flex  z-40 mx-auto w-screen  top-0 bg-white pl-[25%]">
      <div className="flex flex-col px-3 pt-4 md:w-1/5 bg-white mx-auto gap-3 h-full fixed left-0">
        <figure className="aspect-video overflow-hidden rounded-md relative">
          <button className="top-1 left-1 absolute bg-white rounded-full px-2 p-1 text-sm font-medium text-gray-600">
            Generate with AI
          </button>

          <img
            src="https://source.unsplash.com/random"
            className="w-full aspect-video object-cover"
            alt="Generate with AI"
          />
          <figcaption className="absolute bg-white text-dark py-1 px-2 text-xs font-medium rounded-full bottom-1 right-1">
            Cover
          </figcaption>
        </figure>
        <ImageInput
          value={blog.img}
          onChange={(img: string) => setBlog({ ...blog, img })}
        />
        <input
          type="text"
          placeholder="Article Title"
          value={blog.title}
          onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          className="p-3 border rounded-lg focus:outline-none focus:ring w-full text-lg"
        />
        <textarea
          value={blog.description}
          onChange={(e) => setBlog({ ...blog, description: e.target.value })}
          placeholder="Short Description of the Article ...."
          rows={4}
          className="px-3 py-2 border rounded-md focus:outline-none focus:ring resize-none"
        />
        <div>
          <MultiSelect
            value={blog.tags}
            onChange={(selectedOptions: Category[]) =>
              setBlog({ ...blog, tags: selectedOptions })
            }
            placeholder="Select categories"
          />
        </div>
        <div className=" border border-highlight flex items-center justify-center  font-medium rounded-md focus:outline-none focus:ring resize-none cursor-pointer">
          <span
            className="text-sm  text-highlight w-full h-full px-3 py-2"
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
          {isAssetsOpen && <AssetsFolder setIsAssetsOpen={setIsAssetsOpen} />}
        </div>

        <button
          type="submit"
          onClick={handlePublish}
          disabled={loadingPublish || !editor}
          className={`border-2 border-dark font-medium px-4 py-2 rounded-full flex items-center justify-center text-dark
              ${loadingPublish ? "opacity-50 cursor-progress" : "hover:bg-dark hover:text-white"}`}
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
      <div className="mx-auto w-full ">
        <EditorPage />
      </div>
    </div>
  )
}

type MultiSelectProps = {
  value: Category[]
  onChange: (selectedOptions: Category[]) => void
  placeholder: string
}
function MultiSelect({ value, onChange, placeholder }: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleOption = (option: Category) => {
    const isSelected = value.includes(option)
    if (isSelected) onChange(value.filter((item) => item !== option))
    else onChange([...value, option])
  }

  return (
    <div className="relative my-1 text-gray-700 text-[15px]">
      <button
        type="button"
        className="border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between w-full capitalize"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value.length === 0 ? placeholder : value.join(", ")}
        <svg
          className="h-5 w-5 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path
            fillRule="evenodd"
            d="M10 12a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
          <path
            fillRule="evenodd"
            d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm14 0a6 6 0 11-12 0 6 6 0 0112 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-10 top-full left-0 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-lg overflow-y-scroll">
          {Object.values(Category).map(
            (option) =>
              option !== Category.All && (
                <div
                  key={option}
                  className={`px-4 py-2 cursor-pointer capitalize hover:bg-highlight hover:text-white  ${
                    value.includes(option) ? "bg-gray-100" : ""
                  }`}
                  onClick={() => toggleOption(option)}
                >
                  {option}
                </div>
              ),
          )}
        </div>
      )}
    </div>
  )
}

type ImageInputProps = {
  value: string
  onChange: (img: string) => void
}
function ImageInput({ value, onChange }: ImageInputProps) {
  const [imageUrl, setImageUrl] = React.useState(value)

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setImageUrl(url)
    onChange(url)
  }

  return (
    <div className=" flex items-center">
      <input
        type="text"
        id="image-url"
        placeholder="Paste Image Url here ..."
        value={imageUrl}
        onChange={handleImageUrlChange}
        className="border px-3 py-2 rounded-lg focus:outline-none focus:ring  flex-grow"
      />
    </div>
  )
}

export default BlogEditor
