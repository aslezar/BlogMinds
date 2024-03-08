import BlogPageNav from "../components/BlogPageNav"
import BlogCard from "../components/BlogCard"
import Categories from "../components/Categories"
import { useState } from "react"
const AllBlogs = () => {
    const [category, setCategory] = useState<string>("For You")
    return (
        <div>
            <BlogPageNav />
            <div className="flex gap-3 py-24 mx-auto w-5/6">
                <div className=" w-3/4  ">
                    <Categories category={category} setCategory={setCategory} />
                    <BlogCard />
                    <BlogCard />
                    <BlogCard />
                </div>
                <div className="w-[25%]  p-4 border rounded-lg mt-16 h-fit">
                    <h2 className="text-lg font-medium mb-5">
                        Trending{" "}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-5 h-5 inline mb-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
                            />
                        </svg>
                    </h2>
                    <div className="flex flex-col gap-1 mb-2 py-2 pb-3 border-t">
                        <p className="font-medium text-gray-700">
                            JWT Authentication in NodeJS
                        </p>
                        <div className="text-sm flex items-center gap-5 pr-5 text-gray-600">
                            <span>John Doe</span> <span>500 reads</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 mb-2 py-2 pb-3 border-t">
                        <p className="font-medium text-gray-700">
                            Cookies Authentication in NodeJS
                        </p>
                        <div className="text-sm flex items-center gap-5 pr-5 text-gray-600">
                            <span>John Doe</span> <span>750 reads</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 mb-2 py-2 pb-3 border-t">
                        <p className="font-medium text-gray-700">
                            Bun a new NodeJS runtime
                        </p>
                        <div className="text-sm flex items-center gap-5 pr-5 text-gray-600">
                            <span>John Doe</span> <span>600 reads</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllBlogs
