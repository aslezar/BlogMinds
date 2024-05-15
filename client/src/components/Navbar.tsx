import { NavLink } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../hooks"
import SearchBar from "./SearchBar"
import { useEffect, useRef, useState } from "react"
import { logout } from "../features/userSlice"
import confirm from "./ConfirmationComponent"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { loading, isAuthenticated } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()
  const dropdownRef = useRef<any>(null)
  const iconRef = useRef<any>(null)

  const handleClickOutside = (event: any) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !iconRef.current?.contains(event.target)
    ) {
      setIsOpen(false)
    }
  }
  const handleLogout = async () => {
    const confirmLogout = await confirm(
      "Are you sure you want to logout? This will clear all saved blog data.",
      {
        title: "Logout",
        deleteButton: "Logout",
        cancelButton: "Cancel",
      },
    )
    if (confirmLogout === false) return
    dispatch(logout())
    setIsOpen(false)
  }
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  return (
    <div>
      <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-3 py-4">
          <NavLink
            to={`${!loading && isAuthenticated ? "/feed" : "/"}`}
            className="flex items-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="h-6 md:h-8 "
            >
              <g data-name="75-Write">
                <path d="M30 7v18a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h9V0H7a7 7 0 0 0-7 7v18a7 7 0 0 0 7 7h18a7 7 0 0 0 7-7V7z" />
                <path d="M22.38 24H11a3 3 0 0 1 0-6h4v-2h-4a5 5 0 0 0 0 10h13a1 1 0 0 0 .89-.55l2-4A1 1 0 0 0 27 21V1a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v20a1 1 0 0 0 .11.45zM23 2h2v1h-2zm0 3h2v15h-2z" />
              </g>
            </svg>
            <span className="self-center text-lg md:text-2xl font-semibold whitespace-nowrap uppercase tracking-wide">
              Creativerse
            </span>
          </NavLink>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto  mr-10"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
              <li>
                <NavLink
                  to="/feed"
                  className="block py-2 px-3 text-dark rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-highlight md:p-0"
                >
                  Blogs
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/#features"
                  className="block py-2 px-3 text-dark rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-highlight md:p-0"
                >
                  Features
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/#pricing"
                  className="block py-2 px-3 text-dark rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-highlight md:p-0"
                >
                  Pricing
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/#contact"
                  className="block py-2 px-3 text-dark rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-highlight md:p-0"
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {!loading && !isAuthenticated ? (
            <div className="flex md:order-2 space-x-3 md:space-x-0">
              <NavLink
                to="/sign-in"
                className="text-white bg-dark  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full  px-5 py-2.5 text-center "
              >
                <span>Sign In</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 ml-1 inline"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </NavLink>
            </div>
          ) : (
            <div className="flex items-center gap-2 md:gap-4">
              <SearchBar />
              <NavLink
                to={"/write/new_blog"}
                className="bg-dark px-2 md:px-6 hover:bg-highlight transition-all py-2  md:py-3 flex items-end justify-center gap-1 rounded-full md:text-sm duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-4 md:w-5 aspect-square inline"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                </svg>
                <span className="hidden md:inline text-white font-medium">
                  Write
                </span>
              </NavLink>
              <button
                ref={iconRef}
                onClick={() => {
                  setIsOpen(!isOpen)
                }}
                className={`${isOpen ? "bg-highlight" : "bg-dark"} p-2 md:p-3 rounded-full bg-dark relative hover:bg-highlight duration-200`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-4 aspect-square"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute z-10 top-20 right-[5%] mt-0.5 w-40 text-gray-600 flex flex-col bg-white rounded-xl overflow-auto border border-gray-300 shadow-lg text-xs md:text-base md:w-52 "
                >
                  <NavLink
                    to={"/profile"}
                    onClick={() => {
                      setIsOpen(false)
                    }}
                    className={`cursor-pointer flex items-center gap-1 text-left hover:bg-highlight hover:text-white px-4 py-3 md:px-6 md:py-4 duration-150`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5 inline "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    Profile
                  </NavLink>
                  <NavLink
                    onClick={() => {
                      setIsOpen(false)
                    }}
                    to={"/settings"}
                    className={`flex items-center gap-1 cursor-pointer text-left hover:bg-highlight hover:text-white px-4 py-3 md:px-6 md:py-4 duration-150`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    Settings
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className={`cursor-pointer text-left hover:bg-highlight hover:text-white flex items-center gap-1 px-4 py-3 md:px-6 md:py-4 duration-150`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                      />
                    </svg>
                    Log Out
                  </button>
                  {/* other options like logout, settings and my blogs page should also exist */}
                </div>
              )}
              {/* dropdown with navigate to profile option and should display only when isOpen true */}
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}
export default Navbar
