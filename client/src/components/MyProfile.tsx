import { useEffect, useState } from "react"
import { useAppSelector } from "../hooks"
import { updateName, updateBio } from "../api"
import { getMyProfile } from "../api"
import ClearIcon from "@mui/icons-material/Clear"
import AddIcon from "@mui/icons-material/Add"
import { UserType } from "../definitions"

const MyProfile = () => {
  useEffect(() => {
    const getProfile = async () => {
      const data = await getMyProfile()
      console.log(data)
      setUser(data.data)
    }
    getProfile()
  }, [])
  const [user, setUser] = useState<UserType | null>(null)
  const [edit, setEdit] = useState(false)
  const handleEdit = () => {
    setEdit(true)
  }
  const handleUpdate = () => {
    setEdit(false)
  }
  const handleCancel = () => {
    setEdit(false)
  }

  const data = [
    "vedantPathaa",
    "vedantPathaa",
    "vedantPathaa",
    "vedantPathaa",
    "vedantPathaa",
    "vedantPathaa",
    "vedantPathaa",
    "vedantPathaa",
  ]

  //name , email(cannot edit),bio,profile image,myintrests-(),following,followers,
  if (user === null) {
    return ""
  }
  return (
    <div className="flex flex-col font-inter mx-6 w-screen">
      <nav className="p-5 rounded-xl flex justify-between ">
        <div>
          <h1 className="text-2xl font-medium">My Profile</h1>
          <span className="text-sm text-slate-500 ">
            Manage your profile settings
          </span>
        </div>

        <button
          className="bg-secondary rounded-3xl px-3 text-dark hover:bg-highlight hover:text-primary duration-100"
          onClick={handleEdit}
        >
          Edit
        </button>
      </nav>
      <hr className="mx-8" />
      <main>
        <section className="sm:w-3/4 xs:w-3/4 lg:w-1/2 p-5">
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
              value={user.name}
              className={`${!edit && "rounded-lg p-2 border"}  ${edit && "rounded-lg p-2 border text-black"}`}
            />

            <label className="mt-2 text-slate-600 font-light">
              Email Address
            </label>
            {/* <p className="text-base font-light text-gray-400 leading-4 mb-1 italic">
              Changing your email address might break your OAuth sign-in if your
              social media accounts do not use the same email address. Please
              use magic link sign-in if you encounter such an issue..
            </p> */}
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
              maxLength={50}
              disabled={!edit}
              defaultValue={user.bio}
              className={`${!edit && "rounded-lg p-2 border"}   ${edit && "rounded-lg p-2 border text-black"}`}
            ></textarea>
          </form>
        </section>
        <section className="w-3/6  p-5 ml-0">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
            <h3 className="text-lg font-medium mb-3">My Interests</h3>

            <div className="flex flex-wrap gap-3">
              {user.myInterests.map((item, index) => {
                return (
                  <span
                    className="rounded-xl border w-fit p-2 hover:border-highlight duration-200"
                    key={index}
                  >
                    <span>{item}</span>
                    <button className={`${!edit && "hidden"} `}>
                      <ClearIcon fontSize="small" />
                    </button>
                  </span>
                )
              })}
              <button
                className={`${!edit && "hidden"} p-2 bg-dark rounded-xl text-white hover:bg-highlight duration-200`}
              >
                <AddIcon />{" "}
              </button>
            </div>

            <h3 className="text-lg font-medium mt-6">Profile Identity</h3>

            <p className="mt-2  font-light">Change your name</p>
            <p className="text-sm font-light text-slate-500 leading-4 mb-1 italic">
              You have the option to change your username once. Please choose
              carefully as it cannot be changed again.
            </p>
            <input
              type="text"
              placeholder={user.name}
              disabled={true}
              className="rounded-lg p-2 border mb-4"
            />
          </form>

          {edit && (
            <div className="my-8 flex gap-10">
              <button
                className="bg-dark p-2 rounded-3xl px-5 text-white hover:bg-highlight duration-200"
                onClick={handleUpdate}
              >
                Update
              </button>
              <button
                className="bg-dark p-2 rounded-3xl px-5 text-white hover:bg-highlight duration-200"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default MyProfile
