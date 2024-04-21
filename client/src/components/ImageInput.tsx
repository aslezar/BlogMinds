import React from "react"

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
    <>
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
    </>
  )
}

export default ImageInput
