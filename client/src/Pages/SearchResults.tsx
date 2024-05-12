import { useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from "react-router-dom"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Pagination from "@mui/material/Pagination"
import PaginationItem from "@mui/material/PaginationItem"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { search } from "../api/index"

import BlogCard from "../components/BlogCard"

const categories: string[] = ["blog", "user"]
const SearchResults: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [data, setData] = useState<{}[]>([])
  const [page, setPage] = useState<number>(1)
  const [totalCount, setTotalCount] = useState<number>(0)
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const type = params.get("type")
  const query = params.get("query")
  const [category, setCategory] = useState<string>(type as string)
  useEffect(() => {
    setCategory(type as string)
    const fetchData = async () => {
      if (!query || !type) return
      setIsLoading(true)
      try {
        const response = await search(query, type, page, 20)

        if (response.data.blogs) {
          setData(response.data.blogs)
        } else {
          setData(response.data.users)
        }
        setTotalCount(response.data.totalCount)
      } catch (error: any) {
        console.error(error.response)
        // Handle error
      } finally {
        setIsLoading(false)
      }
    }
    if (query && query.length >= 3) fetchData()
    else {
      setIsLoading(false)
      setData([])
    }
  }, [query, type, page])
  const handleTabChange = (_event: React.ChangeEvent<{}>, newValue: number) => {
    setCategory(categories[newValue])
  }
  useEffect(() => {
    navigate(`/search?type=${category}&query=${query}`)
  }, [category])

  return (
    <div className="w-11/12 md:w-3/4  mx-auto pb-7">
      <div className="flex justify-between items-center md:my-4 px-6 sticky md:py-4 top-16 bg-white">
        {query && query.length >= 3 && (
          <Tabs
            value={categories.indexOf(category as string)}
            onChange={handleTabChange}
            indicatorColor="secondary"
            TabIndicatorProps={{
              style: { transition: "none" },
            }}
            textColor="secondary"
            className=""
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
        <Pagination
          // calculate count by the length of response and limit
          count={Math.ceil(totalCount / 20)}
          shape="rounded"
          color="secondary"
          onChange={(_e, value: number) => setPage(value)}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </div>
      {query && query.length >= 3 && !isLoading && data.length == 0 && (
        <p className="text-gray-500 text-base mt-4 px-5 italic">
          No {category}s found for the term "{query}"
        </p>
      )}
      {query && query.length >= 3 && !isLoading && data.length != 0 && (
        <p className="text-gray-500 text-base mt-2 px-5 italic">
          Showing results for "{query}"
        </p>
      )}
      <div className=" h-[90%]">
        {!isLoading && !!data && query && query.length >= 3 && (
          <div>
            {category === "blog" && (
              <div>
                {data?.map((item: any, index: number) => (
                  <BlogCard blog={item} key={index} />
                ))}
              </div>
            )}

            {category === "user" && (
              <div>
                {data?.map((item: any, index: number) => (
                  <Link
                    to={`/user/${item._id}`}
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
      </div>
    </div>
  )
}

export default SearchResults
