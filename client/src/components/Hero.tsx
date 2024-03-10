import React from "react"
import { Link } from "react-router-dom"
import { useAppSelector } from "../hooks"

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
        <p className="mb-4 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48">
          Explore a world where AI enhances your creativity! Creativerse AI
          empowers you to write blogs effortlessly by providing AI-driven text
          suggestions and images.
        </p>
        <div className="flex flex-col mb-4 lg:mb-7 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
          {!isAuthenticated && (
            <Link
              to={`${isAuthenticated ? "/feed" : "/signup"}`}
              className="inline-flex justify-center items-center py-3.5 px-7 text-lg font-medium text-center bg-dark text-white rounded-full bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="h-5 mr-3 text-white "
              >
                <g data-name="75-Write">
                  <path
                    fill="white"
                    d="M30 7v18a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h9V0H7a7 7 0 0 0-7 7v18a7 7 0 0 0 7 7h18a7 7 0 0 0 7-7V7z"
                  />
                  <path
                    fill="white"
                    d="M22.38 24H11a3 3 0 0 1 0-6h4v-2h-4a5 5 0 0 0 0 10h13a1 1 0 0 0 .89-.55l2-4A1 1 0 0 0 27 21V1a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v20a1 1 0 0 0 .11.45zM23 2h2v1h-2zm0 3h2v15h-2z"
                  />
                </g>
              </svg>
              Join the Community
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}

export default Hero
