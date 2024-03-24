import ImagePlaceholder from "../assets/img/Feed/ImagePlaceholder"

const BlogLoader = () => {
  return (
    <div
      role="status"
      className=" pr-5 my-6 mr-8 animate-pulse md:space-y-0  rtl:space-x-reverse md:flex flex-row-reverse md:items-center justify-between"
    >
      <div className="flex items-center justify-center w-full h-40 mt-4 bg-gray-300 rounded-md sm:w-96 ">
        <ImagePlaceholder />
      </div>
      <div className="w-full">
        <div className="h-2.5 bg-gray-200 rounded-full w-48 mb-4"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[480px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full mb-2.5 w-4/5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[440px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[460px] mb-2.5"></div>
        <div className="h-2 bg-gray-200 rounded-full max-w-[360px]"></div>
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  )
}

export default BlogLoader
