import React from "react"
import { useDropzone } from "react-dropzone"
import { getAssests, uploadAssests, deleteAssest } from "../api"
import { toast } from "react-hot-toast"
import DeleteIcon from "@mui/icons-material/Delete"

const AssetsFolder = ({ setIsAssetsOpen }: any) => {
  const [assets, setAssets] = React.useState<string[]>([])

  React.useEffect(() => {
    getAssests()
      .then((res) => setAssets(res.data.assets))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className="fixed inset-0 z-40  top-5 mx-auto  p-5 backdrop-blur-sm h-full w-screen flex pt-20 start">
      <div className="bg-white p-4 h-5/6 w-[24%] space-y-4 rounded-lg border overflow-auto">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Your Saved Assets</h1>
          <button
            onClick={(e) => {
              e.preventDefault()
              setIsAssetsOpen(false)
              console.log("clicked")
            }}
            className="bg-red-500 z-50 text-white py-1 px-2 h-fit rounded-lg flex  justify-center text-center"
          >
            Close
          </button>
        </div>
        <Dropzone setAssets={setAssets} />
        <div className="flex flex-wrap gap-4 items-center ">
          {assets.map((asset) => (
            <Assets asset={asset} setAssets={setAssets} key={asset} />
          ))}
        </div>
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
      className={`p-4 border-dashed border-2 flex relative flex-col text-center text-gray-600 border-gray-200 rounded-lg cursor-pointer ${uploading && "opacity-50"}`}
    >
      <input {...getInputProps()} className="absolute left-0" />
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
    <div className="flex items-center flex-col relative font-light  ">
      <img
        src={asset}
        alt={name}
        className="h-24 object-cover rounded-lg "
      />
      <span className="w-full overflow-hidden text-center">{name.slice(0,15)}</span>
      <button
        className=" p-0.5 aspect-square flex right-1 top-1 bg-white text-dark rounded-full absolute "
        onClick={() => handleDeleteButton(asset)}
        disabled={loading}
      >
        <DeleteIcon className="!text-sm" />
      </button>
    </div>
  )
}

export default AssetsFolder
