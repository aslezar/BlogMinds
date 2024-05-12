import React, { ChangeEvent, useEffect, useState } from "react"
import Modal from "@mui/material/Modal"
import Tab from "@mui/material/Tab"
import Tabs from "@mui/material/Tabs"
import SearchSvg from "./SearchSvg"
import { Link, useNavigate } from "react-router-dom"
import { search } from "../api/index"

const categories: string[] = ["blog", "user"]

const SearchButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalOpen = () => setIsModalOpen(true)
  const handleModalClose = () => setIsModalOpen(false)

  return (
    <div className="">
      <button
        className="outline-2 outline outline-dark hover:outline-[3px] p-2 rounded-full"
        onClick={handleModalOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#101356"
          className="w-4 md:w-6 aspect-square "
        >
          <path
            fillRule="evenodd"
            d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        aria-labelledby="search-modal"
        aria-describedby="search-modal"
        className="flex justify-center items-start w-full h-5/6 my-auto bg-white bg-opacity-20"
      >
        <SearchBarWithRef handleModalClose={handleModalClose} />
      </Modal>
    </div>
  )
}

type SearchBarProps = {
  handleModalClose: () => void
  ref: React.ForwardedRef<HTMLDivElement>
}

const SearchBar: React.FC<SearchBarProps> = ({ handleModalClose, ref }) => {
  const [category, setCategory] = useState<string>("blog")
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<{}[]>([])
  const [inputValue, setInputValue] = useState<string>("")
  const [timeoutId, setTimeoutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      search(inputValue, category, 1, 3)
        .then((response) => {
          response.data.blogs
            ? setData(response.data.blogs)
            : setData(response.data.users)
        })
        .catch((error) => console.error(error.response))
        .finally(() => setIsLoading(false))
    }

    if (inputValue.length >= 3) {
      if (timeoutId) clearTimeout(timeoutId)
      const id = setTimeout(fetchData, 500)
      setTimeoutId(id)
    }
  }, [inputValue, category])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.toLowerCase())
  }

  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setCategory(categories[newValue])
  }

  return (
    <div
      className="bg-white w-11/12 md:w-[55%]  rounded-2xl p-5 md:p-8 relative"
      ref={ref}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (inputValue.length < 3) return
          navigate(
            `/search?type=${category}&query=${encodeURIComponent(inputValue)}`,
          )
          handleModalClose()
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="w-full p-3 px-4 md:px-6 md:text-lg outline-none text-dark border border-dark rounded-full"
          placeholder="Start typing to search"
          autoFocus
        />
      </form>

      <div className="md:px-5 overflow-y-scroll h-[90%]">
        {inputValue.length >= 1 && (
          <p className="absolute top-12 right-12 text-gray-600 text-sm md:flex items-center gap-2 italic hidden ">
            <span>Press</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              id="enter"
              fill="rgb(75 85 99)"
              className="inline h-5  aspect-square border"
            >
              <path d="M19,6a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H7.41l1.3-1.29A1,1,0,0,0,7.29,9.29l-3,3a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l3,3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L7.41,14H17a3,3,0,0,0,3-3V7A1,1,0,0,0,19,6Z"></path>
            </svg>
            <span>to see all results</span>
          </p>
        )}
        {inputValue.length === 0 && (
          <p className="flex items-center gap-1 justify-center py-2 text-gray-600 text-sm">
            <SearchSvg />
            Search for topics, articles, peoples and more
          </p>
        )}
        {inputValue.length >= 3 && (
          <Tabs
            value={categories.indexOf(category)}
            onChange={handleTabChange}
            indicatorColor="secondary"
            TabIndicatorProps={{
              style: { transition: "none" },
            }}
            textColor="secondary"
            className="w-[90%] md:mt-4 mb-6"
          >
            {categories.map((category, index) => (
              <Tab
                label={category + "s"}
                key={index}
                disableRipple
                className="!text-xs md:!text-[0.9rem] !capitalize"
              />
            ))}
          </Tabs>
        )}
        {!isLoading && !!data && inputValue.length >= 3 && (
          <div>
            {category === "blog" && (
              <div>
                {data?.map((item: any, index: number) => (
                  <Link
                    to={`/blog/${item._id}`}
                    onClick={handleModalClose}
                    key={index}
                    className="flex gap-4 items-center border-b border-gray-200 py-4 group"
                  >
                    <img
                      src={item?.img}
                      className="aspect-video object-cover h-20 bg-gray-300 rounded-md"
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="md:text-lg font-semibold text-dark  group-hover:underline">
                        {item?.title}
                      </h3>
                      <p className="hidden md:block text-gray-600 text-sm">
                        {item.description}
                      </p>
                      <p className="hidden md:block text-gray-600 text-xs">
                        {new Date(item.createdAt).toDateString().slice(3)}
                      </p>
                      <div className="flex items-center gap-2">
                        <img
                          src={item.author?.profileImage}
                          className="w-6 h-6 rounded-full"
                        />
                        <p className="text-gray-600 text-sm">
                          {item.author?.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {category === "user" && (
              <div>
                {data?.map((item: any, index: number) => (
                  <Link
                    to={`/user/${item._id}`}
                    onClick={handleModalClose}
                    key={index}
                    className="flex gap-4 items-center border-b border-gray-200 pb-2 md:py-4 group"
                  >
                    <img
                      src={item.profileImage}
                      className="w-10 md:w-20 aspect-square bg-gray-300 rounded-full"
                    />
                    <div className="flex flex-col gap-1">
                      <h3 className="md:text-lg font-semibold text-dark  group-hover:underline">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm">
                        {item.email}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
        {isLoading && (
          <div className="flex flex-col gap-7 ">
            <div role="status" className="max-w-sm animate-pulse ">
              <div className="h-3 bg-gray-300 rounded-full  w-48 mb-4"></div>
              <div className="h-2 bg-gray-300 rounded-full  max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-gray-300 rounded-full  mb-2.5"></div>
              <div className="h-2 bg-gray-300 rounded-full  max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-300 rounded-full  max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-300 rounded-full  max-w-[100px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
            <div role="status" className="max-w-sm animate-pulse">
              <div className="h-3 bg-gray-300 rounded-full  w-48 mb-4"></div>
              <div className="h-2 bg-gray-300 rounded-full  max-w-[360px] mb-2.5"></div>
              <div className="h-2 bg-gray-300 rounded-full  mb-2.5"></div>
              <div className="h-2 bg-gray-300 rounded-full  max-w-[330px] mb-2.5"></div>
              <div className="h-2 bg-gray-300 rounded-full  max-w-[300px] mb-2.5"></div>
              <div className="h-2 bg-gray-300 rounded-full  max-w-[100px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {inputValue.length >= 3 && !isLoading && data.length == 0 && (
          <p className="text-sm text-gray-500 md:text-base mt-4">
            No {category}s found for "{inputValue}"
          </p>
        )}
      </div>
    </div>
  )
}

const SearchBarWithRef = React.forwardRef<HTMLDivElement, SearchBarProps>(
  (props, _ref) => <SearchBar {...props} />,
)

export default SearchButton
