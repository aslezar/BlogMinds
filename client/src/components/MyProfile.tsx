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
    <div className="flex flex-col">
      <nav
        className="w-100 border-2 p-5 rounded-xl mx-5 my-5` 
    flex justify-between"
      >
        <h1 className="text-2xl font-medium">Profile Page</h1>
        <button
          className="bg-slate-500 p-2 rounded-3xl px-5 text-white hover:bg-slate-700"
          onClick={handleEdit}
        >
          Edit
        </button>
      </nav>
      <main className="flex ">
        <section className="h-screen w-3/6  p-5">
          <form action="" className="flex flex-col">
            <h3 className="text-xl mb-3">Basic Info</h3>

            <label className="mt-2">Full Name</label>
            <input
              type="text"
              placeholder="vedant Nagar"
              disabled={!edit}
              value={user.name}
              className={`${!edit && "rounded-xl p-2 bg-gray-100"}  ${edit && "rounded-xl p-2 border text-black"}`}
            />

            {/* <label className="mt-2">Profline Tagline</label>
              <input
                type="text"
                placeholder="Software Developer @"
                disabled={!edit}
                className={`${!edit && "rounded-xl p-2 bg-gray-100"}  ${edit && "rounded-xl p-2 border text-black"}`}
              /> */}

            <label className="mt-2">Profile Photo</label>
            <img
              className="h-40 w-40"
              src={user?.profileImage}
              alt={user?.name}
            />

            <h3 className="text-xl my-3 mt-6">About You</h3>

            <label>Profile Bio(About you)</label>
            <textarea
              rows="4"
              cols="50"
              maxLength={50}
              disabled={!edit}
              defaultValue={user.bio}
              className={`${!edit && "rounded-xl p-2 bg-gray-100"}   ${edit && "rounded-xl p-2 border text-black"}`}
            ></textarea>
            <div className="flex gap-5 my-4">
              <p>
                <span className="rounded-xl p-1 text-slate-700 px-1 font-bold">
                  {user?.followersCount}
                </span>
                Followers{" "}
              </p>

              <p>
                <span className="rounded-xl p-1 text-slate-700 px-1 font-bold">
                  {user?.followingCount}
                </span>
                Following{" "}
              </p>
            </div>

            {edit && (
              <div className="my-8 flex gap-10">
                <button
                  className="bg-slate-500 p-2 rounded-3xl px-5 text-white hover:bg-slate-700"
                  onClick={handleUpdate}
                >
                  Update
                </button>
                <button
                  className="bg-slate-500 p-2 rounded-3xl px-5 text-white hover:bg-slate-700"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            )}
          </form>
        </section>
        <section className="h-screen w-3/6  p-5 ml-0">
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
            <h3 className="text-xl mb-3">My Interests</h3>

            <div className="flex  flex-wrap gap-3">
              {user.myInterests.map((item, index) => {
                return (
                  <span
                    className="m-1 rounded-xl  bg-gray-100  w-fit p-2"
                    key={index}
                  >
                    <span className="">{item}</span>
                    <button className={`${!edit && "hidden"} `}>
                      <ClearIcon fontSize="small" />
                    </button>
                  </span>
                )
              })}
              <button
                className={`${!edit && "hidden"} p-2 bg-slate-500 rounded-xl`}
              >
                <AddIcon />{" "}
              </button>
            </div>

            <h3 className="text-xl my-3 mt-6">Profile Identity</h3>

            <p className="mt-2">{user.name}</p>
            <p className="text-base font-light text-gray-400 leading-4 mb-1 italic">
              You have the option to change your username once. Please choose
              carefully as it cannot be changed again.
            </p>
            <input
              type="text"
              placeholder={user.name}
              disabled={true}
              className={"rounded-xl p-2 bg-gray-100 mb-4"}
            />

            <p className="mt-2">Email Address</p>
            <p className="text-base font-light text-gray-400 leading-4 mb-1 italic">
              Changing your email address might break your OAuth sign-in if your
              social media accounts do not use the same email address. Please
              use magic link sign-in if you encounter such an issue..
            </p>
            <input
              type="text"
              placeholder="pathaa@gmail.com"
              disabled={true}
              value={user.email}
              className={"rounded-xl p-2 bg-gray-100 mb-4"}
            />
          </form>
        </section>
      </main>
    </div>
  )
}

export default MyProfile
