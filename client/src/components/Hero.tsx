import React from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../hooks"
import { IoPeople } from "react-icons/io5"
import { CiEdit } from "react-icons/ci"

type Props = {}

const Hero: React.FC<Props> = () => {
  const { isAuthenticated } = useAppSelector((state) => state.user)
  return (
    <section className="bg-white">
      <div className="pt-6 px-4 mx-auto max-w-screen-xl text-center pb-3 lg:pb-7  lg:px-12">
        <a
          href="#"
          className="inline-flex justify-between items-center py-1.5 px-4  mb-6 text-sm text-white bg-highlight rounded-full"
        >
          <span className="text-sm font-medium">Unleash Your Imagination!</span>
          <svg
            className="ml-2 w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </a>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl">
          Unlock Your Creativity with Creativerse Blogs
        </h1>
        <p className="mb-4 text-lg font-normal text-gray-500 lg:text-xl md:px-16 xl:px-48">
          Explore a world where AI enhances your creativity! Creativerse AI
          empowers you to write blogs effortlessly by providing AI-driven text
          suggestions and images.
        </p>
        <div className="flex mb-4 lg:mb-7 flex-row justify-center space-y-0 space-x-2">
          {/* try our editor button */}
          <Link
            to="/editor"
            className="inline-flex justify-center items-center py-3.5 px-4  font-medium text-center bg-white text-dark border border-dark rounded-full hover:bg-dark focus:ring-4 focus:ring-blue-300 transition-all duration-200 hover:text-white"
          >
            <CiEdit className="inline mr-2 text-xl" />
            Try Our Editor
          </Link>

          {!isAuthenticated && (
            <Link
              to={`${isAuthenticated ? "/feed" : "/sign-up"}`}
              className="inline-flex justify-center items-center py-3.5 px-7  font-medium text-center bg-dark text-white rounded-full  hover:bg-highlight focus:ring-4 focus:ring-blue-300 transition-all duration-200"
            >
              <IoPeople className="inline mr-2 text-xl"/>
              Join the Community
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
