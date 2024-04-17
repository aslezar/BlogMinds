import { useState } from "react"
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import StickyNote2Icon from "@mui/icons-material/StickyNote2"
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder"
import MyBlogs from "../components/MyBlogs"
import MyAssets from "../components/MyAssets"
import MyProfile from "../components/MyProfile"
const ProfilePage = () => {
  const [open, setOpen] = useState(true)
  const [tabSelected, setTabSelected] = useState<number>(0)
  const data = [
    { title: "Profile", icon: <AccountCircleIcon />, page: MyProfile },
    { title: "My Assets", icon: <CreateNewFolderIcon />, page: MyAssets },
    { title: "My Blogs", icon: <StickyNote2Icon />, page: MyBlogs },
  ]
  const PageComponent = data[tabSelected].page
  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-dark min-h-screen p-5  pt-8 relative duration-300`}
      >
        <ArrowCircleLeftIcon
          className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />

        <ul className="pt-2">
          {data.map((item, index) => {
            return (
              <li
                onClick={() => setTabSelected(index)}
                key={index}
                className={`gap-y-4 my-4 flex text-sm items-center gap-x-4 cursor-pointer p-2 hover:bg-highlight rounded-xl active:bg-slate-50 text-primary duration-150`}
              >
                <span>{item.icon}</span>
                <span
                  className={`text-base font-medium duration-300 ${!open && " scale-0"} `}
                >
                  {item.title}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
      <PageComponent />
    </div>
  )
}

export default ProfilePage
