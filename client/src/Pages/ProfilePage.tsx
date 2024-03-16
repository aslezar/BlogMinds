import { useState } from "react"
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import BookIcon from '@mui/icons-material/Book';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AccessibleIcon from '@mui/icons-material/Accessible';
const ProfilePage = () => {
  const [open,setOpen] = useState(true)
  const data = [
    {title:"Profile",icon:<AccountCircleIcon/>},
    {title:"dashboard",icon:<DashboardIcon/>},
    {title:"My Blogs",icon:<StickyNote2Icon/>},
    {title:"Contact Us",icon:<ContactPageIcon/>},
    {title:"Shivam Bhai",icon:<AccessibleIcon/>}
  ]
  return (
    <div className="flex">
      <div className={` ${
          open ? "w-72" : "w-20 "
        } bg-slate-100 h-screen p-5  pt-8 relative duration-300`}>
          <ArrowCircleLeftIcon
            className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${!open && "rotate-180"}`}
            onClick = {() => setOpen(!open)}
          />
          <div className="inline-flex">
            <BookIcon className={`text-4xl rounded cursor-pointer block float-left mr-2 ${open && "rotate"}`}/>
            <h1 className={` origin-left font-medium text-2xl duration-300 ${
              !open && "scale-0"
            }`}>
              BlogMind
            </h1>
          </div>
          <ul className="pt-2">
            {data.map((item,index) => {
              return(
              <>
                <li key={index} className={`gap-y-4 my-4 flex text-sm items-center gap-x-4 cursor-pointer p-2 hover:bg-slate-50 rounded-xl active:bg-slate-50`}>
                  <span>{item.icon}</span><span className={`text-base font-medium duration-300 ${!open && " scale-0"} `}>{item.title}</span>
                </li>
              </>
            )})}
          </ul>
        </div>
    </div>
  )
}

export default ProfilePage
