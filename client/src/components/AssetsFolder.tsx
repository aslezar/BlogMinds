import React from "react"
import { useDropzone } from "react-dropzone"
import { getAssests, uploadAssests, deleteAssest } from "../api"
import Loader from "./Loader"
import { toast } from "react-hot-toast"
const AssetsFolder = () => {
  const [loading, setLoading] = React.useState(true)
  const [assets, setAssets] = React.useState<string[]>([])

  React.useEffect(() => {
    getAssests()
      .then((res) => setAssets(res.data.assets))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <Loader />

  return (
    <div>
      <h1 className="text-2xl font-semibold">Assets Folder</h1>
      <Dropzone setAssets={setAssets} />
      <div className="flex flex-col gap-4 items-center overflow-y-auto">
        {assets.map((asset) => (
          <Assets asset={asset} setAssets={setAssets} key={asset} />
        ))}
      </div>
    </div>
  )
}

const Dropzone = ({
  setAssets,
}: {
  setAssets: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  const [uploading, setUploading] = React.useState(false)
  const onDropAccepted = React.useCallback(
    async (acceptedFiles: File[]) => {
      const formData = new FormData()
      acceptedFiles.forEach((file) => {
        formData.append("assetFiles", file)
      })
      toast.loading("Uploading...", { id: "uploading" })
      setUploading(true)
      uploadAssests(formData)
        .then((res) => setAssets((prev) => [...prev, ...res.data]))
        .catch((err) => console.log(err))
        .finally(() => {
          toast.dismiss("uploading")
          setUploading(false)
        })
    },
    [setAssets],
  )

  const { getRootProps, getInputProps } = useDropzone({
    multiple: true,
    disabled: uploading,
    maxFiles: 5,
    maxSize: 4 * 1024 * 1024, // 4MB
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".webp"],
    },
    onDropRejected: (files) => {
      console.log(files)
      files.forEach((file) => {
        toast.error(
          `${file.file.name}: ${file.errors.map((err) => (err.code === "file-too-large" ? "File is larger than 4MB" : err.message)).join(", ")}`,
        )
      })
    },
    onDropAccepted: onDropAccepted,
  })

  return (
    <div
      {...getRootProps()}
      className={`p-4 border-dashed border-2 border-gray-200 rounded-lg cursor-pointer ${uploading && "opacity-50"}`}
    >
      <input {...getInputProps()} />
      <p>Drag 'n' drop some files here, or click to select files</p>
      <em>(Only *.jpeg, *.jpg, *.png, *.webp images upto 4MB)</em>
      <em>(max 5 files)</em>
    </div>
  )
}

const Assets = ({
  asset,
  setAssets,
}: {
  asset: string
  setAssets: React.Dispatch<React.SetStateAction<string[]>>
}) => {
  const [loading, setLoading] = React.useState(false)
  const handleDeleteButton = async (assestUrl: string) => {
    setLoading(true)
    deleteAssest(assestUrl)
      .then(() => {
        setAssets((prev) => prev.filter((item) => item !== assestUrl))
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }
  const name = asset
    .split("/")
    .slice(-1)
    .join("/")
    .split("_")
    .slice(0, -1)
    .join("_")
    .replace("%20", " ")
  return (
    <div className="flex items-center gap-4">
      <img
        src={asset}
        alt={name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      {name}
      <button
        className="px-3 py-1 bg-red-500 text-white rounded-md"
        onClick={() => handleDeleteButton(asset)}
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete"}
      </button>
    </div>
  )
}

export default AssetsFolder
