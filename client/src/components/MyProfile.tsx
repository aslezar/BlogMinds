import { useEffect, useState } from "react"
import { getMyProfile } from "../api"
import ClearIcon from "@mui/icons-material/Clear"
import AddIcon from "@mui/icons-material/Add"
import { UserType } from "../definitions"
import Loader from "./Loader"
import { updateProfile } from "../api"
import toast from "react-hot-toast"
import { CiEdit } from "react-icons/ci"
import { IoIosAddCircleOutline } from "react-icons/io"

const defUser: UserType = {
  userId: "",
  createdAt: "",
  updatedAt: "",
  blogs: [],
  followingCount: 0,
  followersCount: 0,
  myInterests: [],
  name: "",
  email: "",
  bio: "",
  profileImage: "",
}

const MyProfile = () => {
  const [user, setUser] = useState<UserType>(defUser)
  const [edit, setEdit] = useState(false)
  const [loading, setLoading] = useState(true)
  const [addInterest, setAddInterest] = useState(false)
  const [newInterest, setNewInterest] = useState("")
  const [originalUser, setOriginalUser] = useState<UserType>(defUser)

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true)
      getMyProfile()
        .then((data) => {
          const user = data.data
          setUser(user)
          setOriginalUser(user)
        })
        .catch((error) => {
          console.log(error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
    getProfile()
  }, [])
  const handleEdit = () => {
    setUser(originalUser)
    setEdit(true)
  }
  const handleUpdate = async () => {
    toast.loading("Updating your profile")
    updateProfile(user)
      .then((response) => {
        const updatedUser = response.data
        setUser(updatedUser)
        setOriginalUser(updatedUser)
        setEdit(false)
        setAddInterest(false)
        toast.dismiss()
      })
      .catch((error) => {
        console.log(error)
      })
      .finally(() => toast.success("Profile updated successfully"))
  }
  const handleCancel = () => {
    // If new interest was being added but not confirmed, discard it
    setAddInterest(false)
    // Reset the user's data to the original state
    setUser(originalUser)
    setEdit(false)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  const handleRemoveInterest = (indexToRemove: number) => {
    setUser((prevUser) => ({
      ...prevUser,
      myInterests: prevUser.myInterests.filter(
        (_, index) => index !== indexToRemove,
      ),
    }))
  }

  const handleAddInterest = () => {
    if (newInterest.trim() !== "") {
      setUser((prevUser) => ({
        ...prevUser,
        myInterests: [...prevUser.myInterests, newInterest],
      }))
      setNewInterest("") // Clear the input field after adding the interest
      setAddInterest(false) // Hide the input field after adding the interest
    }
  }

  if (loading) return <Loader />

  if (user === null)
    return (
      <div className="text-red-500 font-bold text-center">
        You are not authorized to view this page.
      </div>
    )

  return (
    <div className="flex flex-col font-inter mx-6 w-full">
      <nav className="pb-5 px-5 rounded-xl flex justify-between ">
        <div>
          <h1 className="text-2xl font-medium">My Profile</h1>
          <span className="text-sm text-slate-500 ">
            Manage your profile settings
          </span>
        </div>

        {!edit ? (
          <button
            onClick={handleEdit}
            type="button"
            className="text-dark hover:text-white border border-dark hover:bg-highlight hover:border-highlight font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-purple-900 duration-150 flex items-center justify-center gap-1"
          >
            <CiEdit className="text-base" />
            Edit profile
          </button>
        ) : (
          <div className="flex">
            <button
              onClick={handleUpdate}
              type="button"
              className="text-dark hover:text-white border border-dark hover:bg-highlight hover:border-highlight font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-purple-900 duration-150 flex items-center justify-center gap-1"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              type="button"
              className="text-dark hover:text-white border border-dark hover:bg-highlight hover:border-highlight font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:focus:ring-purple-900 duration-150 flex items-center justify-center gap-1"
            >
              Cancel
            </button>
          </div>
        )}
      </nav>
      <hr />
      <main className="flex xs:flex-wrap">
        <section className="sm:w-100 xs:w-3/4 lg:w-1/2 p-5">
          <form action="" className="flex flex-col">
            <label className="text-lg my-2 font-medium">
              Your profile photo
            </label>
            <img
              className="h-40 w-40 rounded-full border"
              src={user?.profileImage}
              alt={user?.name}
            />
            <div className="flex gap-5 my-4 text-sm">
              <p>
                <span className="rounded-xl p-1 text-slate-700 px-1 font-bold">
                  {user?.followersCount}
                </span>
                <span className="text-slate-500 ">Followers</span>
              </p>

              <p>
                <span className="rounded-xl p-1 text-slate-700 px-1 font-bold">
                  {user?.followingCount}
                </span>
                <span className="text-slate-500">Following</span>
              </p>
            </div>

            <label className="mt-2 text-slate-600 font-light">Full name</label>
            <input
              type="text"
              placeholder="Vedant Nagar"
              disabled={!edit}
              name="name"
              value={user.name}
              minLength={3}
              maxLength={50}
              onChange={handleChange}
              className={`rounded-lg p-2 border ${edit ? "text-black" : ""}`}
            />

            <label className="mt-2 text-slate-600 font-light">
              Email Address
            </label>
            <input
              type="text"
              placeholder="pathaa@gmail.com"
              disabled={true}
              value={user.email}
              className="rounded-lg p-2 border"
            />
            <label className="mt-6 text-slate-600">Profile bio</label>
            <textarea
              rows={4}
              cols={50}
              maxLength={150}
              disabled={!edit}
              name="bio"
              value={user.bio}
              onChange={handleChange}
              className={`rounded-lg p-2 border ${edit ? "text-black" : ""}`}
            ></textarea>
          </form>
        </section>
        <section className="w-3/6  p-5 ml-0">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
            <h3 className="text-lg font-medium mb-3">My Interests</h3>

            <div className="flex flex-col flex-wrap gap-3">
              <div className="flex flex-wrap gap-2">
                {user.myInterests.map((item, index) => {
                  return (
                    <span
                      className="flex rounded-xl border w-fit p-2 hover:border-highlight duration-200"
                      key={index}
                    >
                      <span>{item}</span>
                      <button
                        className={`${!edit && "hidden"} `}
                        onClick={() => handleRemoveInterest(index)}
                      >
                        <ClearIcon fontSize="small" />
                      </button>
                    </span>
                  )
                })}
                <button
                  className={`${!edit && "hidden"} border p-2 rounded-xl text-gray-700 hover:bg-gray-100  duration-150`}
                  onClick={() => setAddInterest(true)}
                >
                  <AddIcon />{" "}
                </button>
              </div>
              {addInterest && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type to add interest"
                    disabled={!edit}
                    value={newInterest}
                    onChange={(e) => setNewInterest(e.target.value)}
                    className="rounded-lg p-2 border"
                  />
                  <button
                    className="flex gap-0.5 border hover:border-highlight p-2 rounded-xl px-5 text-gray-700 hover:bg-gray-50  duration-150 hover:scale-105"
                    onClick={handleAddInterest}
                  >
                    <IoIosAddCircleOutline className="my-auto" />
                    Add
                  </button>
                </div>
              )}
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}

export default MyProfile
