import { ChangeEvent, useEffect, useState } from "react"
import { Modal, Tab, Tabs } from "@mui/material"
import SearchSvg from "./SearchSvg"
import axios from "axios"
import { Link } from "react-router-dom"

const categories: string[] = ["blog", "user"]

const SearchBar = () => {
  const [category, setCategory] = useState<string>("blog")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<{}[]>([])
  const [inputValue, setInputValue] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/search",
          {
            params: {
              query: inputValue,
              type: category,
              page: 1,
              limit: 3,
            },
          },
        )
        console.log(response.data.data)
        setData(response.data.data)
      } catch (error: any) {
        console.error(error.response)
        // Handle error
      } finally {
        setIsLoading(false)
      }
    }
    if (inputValue.length >= 3) fetchData()
  }, [inputValue, category])

  const handleButtonClick = () => {
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value.toLowerCase())
  }

  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setCategory(categories[newValue])
  }

  return (
    <div className="">
      <button
        className="outline-2 outline outline-dark hover:outline-[3px] p-2 rounded-full"
        onClick={handleButtonClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="#101356"
          className="w-6 h-6 "
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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-start w-full h-5/6 my-auto bg-white bg-opacity-20"
      >
        <div className="bg-white w-[55%] py-8 rounded-2xl px-8 relative">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full p-3 px-6 text-lg outline-none text-dark border border-dark rounded-full"
            placeholder="Start typing to search"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (category === "blog") {
                  window.location.href = `/blog/`
                } else {
                  window.location.href = `/user/`
                }
              }
            }}
          />
          <div className="px-5 overflow-y-scroll h-[90%]">
            {inputValue.length >= 1 && (
              <p className="absolute top-12 right-12 text-gray-600 text-sm flex items-center gap-2 italic">
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
                className="w-[90%] mt-4 mb-6"
              >
                {categories.map((category, index) => (
                  <Tab
                    label={category + "s"}
                    key={index}
                    disableRipple
                    className="!text-[0.9rem] !capitalize"
                  />
                ))}
              </Tabs>
            )}
            {!isLoading && !!data && inputValue.length >= 3 && (
              <div>
                {category === "blog" && (
                  <div>
                    {data.map((item: any, index: number) => (
                      <Link
                        to={`/blog/${item._id}`}
                        onClick={handleModalClose}
                        key={index}
                        className="flex gap-4 items-center border-b border-gray-200 py-4 group"
                      >
                        <img
                          src={item.img}
                          className="aspect-video object-cover h-20 bg-gray-300 rounded-md"
                        />
                        <div className="flex flex-col gap-1">
                          <h3 className="text-lg font-semibold text-dark  group-hover:underline">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {item.description}
                          </p>
                          <p className="text-gray-600 text-xs">
                            {new Date(item.createdAt).toDateString().slice(3)}
                          </p>
                          <div className="flex items-center gap-2">
                            <img
                              src={item.author}
                              className="w-6 h-6 rounded-full"
                            />
                            <p className="text-gray-600 text-sm">
                              {item.author}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}

                {category === "user" && (
                  <div>
                    {data.map((item: any, index: number) => (
                      <Link
                        to={`/user/${item._id}`}
                        onClick={handleModalClose}
                        key={index}
                        className="flex gap-4 items-center border-b border-gray-200 py-4 group"
                      >
                        <img
                          src={item.profileImage}
                          className="w-20 h-20 bg-gray-300 rounded-full"
                        />
                        <div className="flex flex-col gap-1">
                          <h3 className="text-lg font-semibold text-dark  group-hover:underline">
                            {item.name}
                          </h3>
                          <p className="text-gray-600 text-sm">{item.email}</p>
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
            {inputValue.length >= 3 && !isLoading && data.length === 0 && (
              <p className="text-gray-500 text-base mt-4">
                No {category}s found for "{inputValue}"
              </p>
            )}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default SearchBar
