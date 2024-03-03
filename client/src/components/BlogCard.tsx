const BlogCard = () => {
  return (
    <div className="container p-5    bg-white w-full border my-4 rounded-lg ">
      <div className=" lg:flex lg:items-center  gap-3">
        <img
          className="object-cover w-4/5 mx-auto lg:mx-0 lg:w-52 aspect-square rounded-xl"
          src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt=""
        />

        <div className="mt-6  lg:mt-0 lg:mx-6">
          <div className="flex gap-1 items-center">
            <p className="text-xs bg-highlight w-fit text-white py-1 px-2 rounded-full capitalize">
              Dev
            </p>
            <p className="text-xs bg-highlight w-fit text-white py-1 px-2 rounded-full capitalize">
              Finance
            </p>
          </div>

          <a
            href="#"
            className="block mt-3 text-2xl font-semibold text-gray-800 hover:underline md:text-3xl"
          >
            All the features you want to know
          </a>

          <p className="mt-3 text-sm text-gray-500 md:text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
            veritatis sint autem nesciunt, laudantium quia tempore delect
          </p>

          <a
            href="#"
            className="inline-block mt-2 text-blue-500 underline hover:text-blue-400"
          >
            Read more
          </a>

          <div className="flex items-center mt-6">
            <img
              className="object-cover object-center w-10 h-10 rounded-full"
              src="https://images.unsplash.com/photo-1531590878845-12627191e687?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
              alt=""
            />

            <div className="mx-4">
              <h1 className="text-sm text-gray-700">Amelia. Anderson</h1>
              <p className="text-sm text-gray-500">Lead Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
