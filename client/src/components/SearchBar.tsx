import { ChangeEvent, useState } from "react"
import { Modal, Tab, Tabs } from "@mui/material"

const categories: string[] = ["Blogs", "People"]

const SearchBar = () => {
    const [category, setCategory] = useState<string>("Blogs") // Set the default category
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [inputValue, setInputValue] = useState("")

    const handleButtonClick = () => {
        setIsModalOpen(true)
    }

    const handleModalClose = () => {
        setIsModalOpen(false)
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleTabChange = (
        event: React.ChangeEvent<{}>,
        newValue: number,
    ) => {
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
                    />
                    <div className="px-5">
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 inline"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                    />
                                </svg>
                                Search for topics, articles, peoples and more
                            </p>
                        )}
                        {inputValue.length >= 1 && (
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
                                        label={category}
                                        key={index}
                                        disableRipple
                                        className="!text-[0.9rem] !capitalize"
                                    />
                                ))}
                            </Tabs>
                        )}
                        {inputValue.length >= 1 && (
                            <div className="flex flex-col gap-7 ">
                                <div
                                    role="status"
                                    className="max-w-sm animate-pulse "
                                >
                                    <div className="h-3 bg-gray-300 rounded-full  w-48 mb-4"></div>
                                    <div className="h-2 bg-gray-300 rounded-full  max-w-[360px] mb-2.5"></div>
                                    <div className="h-2 bg-gray-300 rounded-full  mb-2.5"></div>
                                    <div className="h-2 bg-gray-300 rounded-full  max-w-[330px] mb-2.5"></div>
                                    <div className="h-2 bg-gray-300 rounded-full  max-w-[300px] mb-2.5"></div>
                                    <div className="h-2 bg-gray-300 rounded-full  max-w-[100px]"></div>
                                    <span className="sr-only">Loading...</span>
                                </div>
                                <div
                                    role="status"
                                    className="max-w-sm animate-pulse"
                                >
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
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default SearchBar
