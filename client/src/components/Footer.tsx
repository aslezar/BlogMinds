import { NavLink } from "react-router-dom"

const Footer = () => {
  const date = new Date()
  const presentYear = date.getFullYear()
  return (
    <footer className="shadow bg-gray-900">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="h-8"
              fill="white"
            >
              <g data-name="75-Write">
                <path d="M30 7v18a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h9V0H7a7 7 0 0 0-7 7v18a7 7 0 0 0 7 7h18a7 7 0 0 0 7-7V7z" />
                <path d="M22.38 24H11a3 3 0 0 1 0-6h4v-2h-4a5 5 0 0 0 0 10h13a1 1 0 0 0 .89-.55l2-4A1 1 0 0 0 27 21V1a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v20a1 1 0 0 0 .11.45zM23 2h2v1h-2zm0 3h2v15h-2z" />
              </g>
            </svg>
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-white tracking-wide uppercase">
              Creativerse
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0 text-gray-400">
            <li>
              <NavLink to="/about" className="hover:underline me-4 md:me-6">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </NavLink>
            </li>
            <li>
              <NavLink to="#" className="hover:underline me-4 md:me-6">
                Licensing
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact-us" className="hover:underline">
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
        <hr className="my-6 sm:mx-auto border-gray-700 lg:my-8" />
        <span className="block text-sm sm:text-center text-gray-400">
          © {presentYear}{" "}
          <NavLink
            to="https://blogminds.onrender.com/"
            className="hover:underline"
          >
            Creativerse™
          </NavLink>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer
