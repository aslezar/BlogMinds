const PricingTable = () => {
  return (
    <div>
      <section className="bg-white" id="pricing">
        <div className="pt-24 px-4 mx-auto max-w-screen-xl lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
              Choose the plan that works for you
            </h2>
            <p className="mb-5 font-light text-gray-500 sm:text-xl">
              One time payments, lifetime access. No hidden fees.
            </p>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0 mx-auto w-11/12 ">
            <div className="flex flex-col p-6 mx-auto w-full md:w-[400px] text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8">
              <h3 className="mb-4 text-2xl font-semibold">Free Trial</h3>
              <p className="font-light text-gray-500 sm:text-lg">
                Free trial, no credit card required.
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">$0</span>
                <span className="text-gray-500">USD</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                {/* Starter plan features */}
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  <span>Embed Limit : 5 Blogs</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  <span>Slower Image Generation</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  <span>Limited Text Suggestions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  <span>Lifetime Access</span>
                </li>
              </ul>
              <a
                href="#"
                className="text-white bg-dark hover:bg-dark focus:ring-4 focus:ring-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Get started
              </a>
            </div>
            <div className="flex flex-col p-6 mx-auto w-full md:w-[400px] text-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8">
              <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
              <p className="font-light text-gray-500 sm:text-lg">
                Best option for writers and bloggers.
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">$29</span>
                <span className="text-gray-500">USD</span>
              </div>
              <ul role="list" className="mb-8 space-y-4 text-left">
                {/* Starter plan features */}
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="green"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  <span>
                    Emebed Limit :{" "}
                    <a className="text-dark font-medium">Unlimited</a>
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="green"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  <span>Fast Image Generation</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="green"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  <span>Faster and Accurate Text Suggestions</span>
                </li>
                <li className="flex items-center space-x-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="green"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>

                  <span>Lifetime Access</span>
                </li>
              </ul>
              <a
                href="#"
                className="text-white bg-dark hover:bg-dark focus:ring-4 focus:ring-dark font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Get started
              </a>
            </div>

            {/* Repeat similar content for Company and Enterprise plans */}
          </div>
        </div>
      </section>
    </div>
  )
}

export default PricingTable
