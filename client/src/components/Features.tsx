import React from "react"
import dragNdrop from "../assets/videos/Features/dragNdrop.mp4"
import imgGen from "../assets/videos/Features/imgGen.mp4"
const Features: React.FC = () => {
  return (
    <div className="w-5/6 mx-auto mt-6" id="features">
      <h1 className="text-7xl font-semibold text-center my-6 ">
        Discover the{" "}
        <span className="bg-gradient-to-r from-dark from-60% to-highlight text-transparent bg-clip-text">
          fe
        </span>
        <span className="bg-gradient-to-r from-dark from-70%  to-highlight  text-transparent bg-clip-text">
          at
        </span>
        <span className="bg-gradient-to-l from-dark from-30% to-highlight text-transparent bg-clip-text">
          ures
        </span>
      </h1>
      <p className="text-center text-slate-500 text-lg">
        Blogs are not just about reading, it's about<br></br> many other things
        like...
      </p>
      <section className="flex flex-col w-full my-10 item-center md:flex-row items-center gap-10 ">
        <div className="w-5/6 p-2 max-w-lg">
          <h1 className="text-center text-lg font-semibold p-2 ">
            Drag and drop your image.
          </h1>
          <div className="flex gap-3 mb-3 min-h-40">
            <div className="border p-4 rounded-lg bg-neutral-50">
              Easily upload images by simply dragging and dropping them on blog
              editor.
            </div>
            <div className="border p-4 rounded-lg bg-neutral-50">
              Our modern design puts your convenience first, making
              drag-and-drop a standout feature.
            </div>
          </div>
          <div className="border p-4 rounded-lg  bg-neutral-50">
            A more interactive and modern experience while saving time and
            effort.
          </div>
        </div>
        <div className="w-full ">
          <video
            autoPlay
            muted
            loop
            className="rounded-lg shadow-lg shadow-highlight"
          >
            <source src={dragNdrop} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>
      <section className="flex flex-col w-full my-28 item-center md:flex-row-reverse items-center gap-10">
        <div className="w-5/6 p-2 max-w-lg">
          <h1 className="text-center text-lg font-semibold p-2">
            AI image generation at ease.
          </h1>
          <div className="flex gap-3 mb-3 min-h-40 ">
            <div className="border p-4 rounded-lg bg-neutral-50">
              Enjoy an intuitive interface that simplifies the process of
              creating unique visuals effortlessly.
            </div>
            <div className="border p-4 rounded-lg bg-neutral-50">
              Image generation based on prompts!
            </div>
          </div>
        </div>
        <div className="w-full">
          <video
            autoPlay
            muted
            loop
            className="rounded-lg shadow-lg shadow-highlight"
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
