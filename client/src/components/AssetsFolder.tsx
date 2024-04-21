import React from "react"
import { useDropzone } from "react-dropzone"
import { getAssests, uploadAssests, deleteAssest } from "../api"
import { toast } from "react-hot-toast"
import DeleteIcon from "@mui/icons-material/Delete"
import Loader from "./Loader"
import { LuImagePlus } from "react-icons/lu"

interface AssetsFolderProps {
  setIsAssetsOpen?: React.Dispatch<React.SetStateAction<boolean>>
}

const AssetsFolder: React.FC<AssetsFolderProps> = ({ setIsAssetsOpen }) => {
  const [assets, setAssets] = React.useState<string[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    setLoading(true)
    getAssests()
      .then((res) => setAssets(res.data.assets))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="bg-white p-4 h-5/6 w-full space-y-4 rounded-lg border overflow-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold">Your Saved Assets</h1>
        {setIsAssetsOpen && (
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
        )}
      </div>
      <Dropzone setAssets={setAssets} />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap gap-4 items-center ">
          {assets.map((asset) => (
            <Assets asset={asset} setAssets={setAssets} key={asset} />
          ))}
        </div>
      )}
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
      <div className="flex items-center w-full justify-center gap-5">
        <LuImagePlus className="text-5xl text-gray-500"/>
        <div>
          <p>Drag 'n' drop some files here, or click to select files</p>
          <em>(Only *.jpeg, *.jpg, *.png, *.webp images upto 4MB)</em>
        </div>
      </div>
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
      <img src={asset} alt={name} className="h-24 object-cover rounded-lg " />
      <span className="w-full overflow-hidden text-center">
        {name.slice(0, 15)}
      </span>
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
