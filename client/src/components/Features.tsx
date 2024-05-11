import React from "react"
import dragNdrop from "../assets/videos/Features/dragNdrop.mp4"
import imgGen from "../assets/videos/Features/imgGen.mp4"
const Features: React.FC = () => {
  return (
    <div className="w-11/12 lg:w-5/6 mx-auto lg:mt-20 overflow-hidden pt-20" id="features">
      <h1 className="text-4xl lg:text-6xl font-semibold text-center  ">
        Publish{' '}
        <span className="bg-gradient-to-r from-dark from-60% to-highlight text-transparent bg-clip-text">
          Effo
        </span>
        <span className="bg-gradient-to-r from-dark from-70%  to-highlight  text-transparent bg-clip-text">
          rtl
        </span>
        <span className="bg-gradient-to-l from-dark from-30% to-highlight text-transparent bg-clip-text">
          eslly
        </span>
      </h1>
      <p className="text-center text-slate-500 text-lg mb-4">
        Write blogs effortlessly with AI-driven text suggestions and images.
      </p>
      <section className="flex flex-col w-full lg:my-10  md:flex-row items-center lg:gap-10 ">
        <div className="lg:w-5/6 p-2 max-w-lg mx-auto">
          <h1 className="text-center md:tex-left font-semibold p-2 text-2xl lg:text-3xl mb-2">
            Drag and Drop Editor
          </h1>
          <div className="flex gap-3 mb-3 min-h-40 text-sm md:text-base">
            <div className="border p-4 rounded-lg bg-neutral-50">
              Simply Drag n Drop to Images to your blog.
            </div>
            <div className="border p-4 rounded-lg bg-neutral-50">
              Our modern design puts your convenience first, making
              drag-and-drop a standout feature.
            </div>
          </div>
          <div className="border p-4 rounded-lg  bg-neutral-50 text-sm md:text-base mb-2">
            A more interactive and modern experience while saving time and
            effort.
          </div>
        </div>
        <div className="lg:w-1/2 ">
          <video
            autoPlay
            muted
            loop
            className="rounded-lg shadow-lg shadow-highlight w-full"
          >
            <source src={dragNdrop} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      <section className="flex flex-col w-full my-14 lg:my-28 item-center md:flex-row-reverse items-center lg:gap-10">
        <div className="lg:w-5/6 p-2 max-w-lg mx-auto">
          <h1 className="text-center lg:text-right font-semibold p-2 text-2xl lg:text-3xl mb-2">
            Generative AI to enhance image and text creation
          </h1>
          <div className="flex gap-3 mb-3 min-h-40 ">
            <div className="border p-4 rounded-lg bg-neutral-50 text-sm md:text-base">
              Enjoy an intuitive interface that simplifies the process of
              creating unique visuals effortlessly.
            </div>
            <div className="border p-4 rounded-lg bg-neutral-50 text-sm md:text-base">
              Image generation based on prompts!
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <video
            autoPlay
            muted
            loop
            className="rounded-lg shadow-lg shadow-highlight w-full"
          >
            <source src={imgGen} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
    </div>
  )
}
export default Features
