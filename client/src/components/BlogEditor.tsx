import React, { useContext, useState } from "react"
import { BlogFullType, Category } from "../definitions"
import AssetsFolder from "./AssetsFolder"
import EditorPage from "./Editor"
import { EditorContext } from "../context/EditorContext"
import edjsHTML from "editorjs-html"

type BlogEditorProps = {
  blogContent: BlogFullType
}

function BlogEditor({ blogContent }: BlogEditorProps) {
  const [isAssetsOpen, setIsAssetsOpen] = useState(false)
  const { editorInstanceRef } = useContext(EditorContext)
  const [blog, setBlog] = useState(blogContent)

  const handleClick = async () => {
    const output = await editorInstanceRef.current.save()
    const edjsParser = edjsHTML()
    let html = edjsParser.parse(output)
    console.log(output)
    //setBlog({ ...blog, content: html })
  }
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    handleClick()
  }

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

        <div className="flex gap-2  mt-4  pr-2 flex-col">
          <button
            type="submit"
            onClick={handleSubmit}
            className="border-2 text-dark border-dark font-medium px-4 py-2 rounded-full hover:bg-dark hover:text-white flex items-center justify-center"
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
            Publish
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="border-2 text-highlight border-highlight font-medium px-4 py-2 rounded-full hover:bg-highlight hover:text-white flex items-center justify-center flex-nowrap"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 mr-1 inline"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
              />
            </svg>
            <span>Save Draft</span>
          </button>
        </div>
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
  const [isOpen, setIsOpen] = useState(false)

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
  const [imageUrl, setImageUrl] = useState(value)

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
      <style>
        {`
					.jodit-status-bar{
						display:none;
					}
					`}
      </style>
    </div>
  )
}

export default BlogEditor
