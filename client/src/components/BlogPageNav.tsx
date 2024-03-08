import React from "react"
import { NavLink } from "react-router-dom"
import SearchBar from "./SearchBar"

type Props = {}

const BlogPageNav = (props: Props) => {
    return (
        <div className="border fixed top-0 bg-white z-20 w-full px-36 left-1/2 -translate-x-1/2 py-4 flex items-center justify-between">
            <NavLink to="/" className="flex items-center space-x-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="h-8 "
                >
                    <g data-name="75-Write">
                        <path d="M30 7v18a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h9V0H7a7 7 0 0 0-7 7v18a7 7 0 0 0 7 7h18a7 7 0 0 0 7-7V7z" />
                        <path d="M22.38 24H11a3 3 0 0 1 0-6h4v-2h-4a5 5 0 0 0 0 10h13a1 1 0 0 0 .89-.55l2-4A1 1 0 0 0 27 21V1a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v20a1 1 0 0 0 .11.45zM23 2h2v1h-2zm0 3h2v15h-2z" />
                    </g>
                </svg>
                <span className="self-center text-2xl font-semibold whitespace-nowrap uppercase tracking-wide">
                    Creativerse
                </span>
            </NavLink>
            <div
                className="items-center justify-between hidden w-full md:flex md:w-auto "
                id="navbar-sticky"
            >
                <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white">
                    <li>
                        <NavLink
                            to="/blogs/all"
                            className="block py-2 px-3 text-dark rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-highlight md:p-0"
                        >
                            Feed
                        </NavLink>
                    </li>
                    <li>
                        <a
                            href="#features"
                            className="block py-2 px-3 text-dark rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-highlight md:p-0"
                        >
                            My Blogs
                        </a>
                    </li>
                    <li>
                        <a
                            href="#pricing"
                            className="block py-2 px-3 text-dark rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-highlight md:p-0"
                        >
                            Contact
                        </a>
                    </li>
                </ul>
            </div>
            <div className="flex items-center gap-4">
                <SearchBar />
                <NavLink
                    to={"/write"}
                    className="bg-dark px-6 hover:bg-highlight transition-all duration-75 py-3 flex items-end justify-center gap-1 rounded-full text-sm"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-5 h-5 inline"
                    >
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                        <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                    <span className=" text-white font-medium">Write</span>
                </NavLink>
                <NavLink to="../profile" className="p-3 rounded-full bg-dark">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-5 h-5 "
                    >
                        <path
                            fillRule="evenodd"
                            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                            clipRule="evenodd"
                        />
                    </svg>
                </NavLink>
            </div>
        </div>
    )
}

export default BlogPageNav
