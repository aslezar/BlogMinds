import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import BlogPageNav from "./BlogPageNav";

type BlogEditorProps = {
	blogContent: {
		title: string;
		content: string;
		description: string;
		imageUrl: string;
		tags: string[];
	};
	handleSave: (blog: {
		title: string;
		content: string;
		description: string;
		imageUrl: string;
		tags: string[];
	}) => void;
};

function BlogEditor({ blogContent, handleSave }: BlogEditorProps) {
	const editor = useRef(null);
	const [blog, setBlog] = useState(blogContent);

	const setContent = (newContent) => {
		setBlog({ ...blog, content: newContent });
	};

	const handleSubmit = (event: React.SyntheticEvent) => {
		event.preventDefault();
		handleSave(blog);
	};

	return (
		<>
			<div className="flex min-h-screen  mx-auto ">
				<div className="flex flex-col  px-3 pt-4 md:w-1/5 bg-white mx-auto  gap-3 min-h-screen">
					<NavLink to="/" className="flex items-center space-x-2  mb-2 px-2 ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 32 32"
							className="h-8 "
						>
							<g data-name="75-Write">
								<path d="M30 7v18a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h9V0H7a7 7 0 0 0-7 7v18a7 7 0 0 0 7 7h18a7 7 0 0 0 7-7V7z" />
								<path d="M22.38 24H11a3 3 0 0 1 0-6h4v-2h-4a5 5 0 0 0 0 10h13a1 1 0 0 0 .89-.55l2-4A1 1 0 0 0 27 21V1a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v20a1 1 0 0 0 .11.45zM23 2h2v1h-2zm0 3h2v15h-2z" />
							</g>
						</svg>
						<span className="self-center text-2xl font-semibold whitespace-nowrap uppercase tracking-wide">
							Creativerse
						</span>
					</NavLink>
					<figure className="aspect-video overflow-hidden  rounded-md relative">
						<button className=" top-1 left-1 absolute bg-white rounded-full px-2 p-1 text-sm font-medium text-gray-600">
							Generate with AI
						</button>

						<img
							src="https://source.unsplash.com/random"
							alt=""
							className="w-full aspect-video object-cover"
						/>
						<figcaption className="absolute bg-white text-dark py-1 px-2 text-xs font-medium rounded-full bottom-1 right-1">
							Cover
						</figcaption>
					</figure>
					<ImageInput
						value={blog.imageUrl}
						onChange={(imageUrl: string) => setBlog({ ...blog, imageUrl })}
					/>
					<input
						type="text"
						placeholder="Article Title"
						value={blog.title}
						onChange={(e) => setBlog({ ...blog, title: e.target.value })}
						className=" p-3 border rounded-lg focus:outline-none focus:ring  w-full text-lg"
					/>
					<textarea
						value={blog.description}
						onChange={(e) => setBlog({ ...blog, description: e.target.value })}
						placeholder="Short Description of the Article ...."
						rows={7}
						className=" px-3 py-2 border rounded-md focus:outline-none focus:ring  resize-none "
					/>
					<div>
						<span className="text-sm px-2 italic text-gray-600 mb-0.5">
							Categories & Topics
						</span>
						<MultiSelect
							options={["Technology", "Science", "Health", "Travel"]}
							value={blog.tags}
							onChange={(selectedOptions: string) =>
								setBlog({ ...blog, tags: selectedOptions })
							}
							placeholder="Select categories"
						/>
					</div>

					<div className="flex gap-2 mb-8 mt-auto self-end pr-2">
						<button
							type="submit"
							onClick={handleSubmit}
							className="border-2 text-dark border-dark font-medium px-4 py-2 rounded-full hover:bg-dark hover:text-white"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-5 h-5 inline mr-1"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
								/>
							</svg>
							Publish
						</button>
						<button
							type="submit"
							onClick={handleSubmit}
							className="border-2 text-highlight border-highlight font-medium px-4 py-2 rounded-full hover:bg-highlight hover:text-white"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={2}
								stroke="currentColor"
								className="w-5 h-5 mr-1 inline"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
								/>
							</svg>
							Save Draft
						</button>
					</div>
				</div>
				<div className="border-2  md:w-4/5 mx-auto">
					<JoditEditor
						ref={editor}
						value={blog.content}
						// tabIndex={1}
						// onBlur={(newContent) => setContent(newContent)}
						// onChange={(newContent) => setContent(newContent)}
						config={{
							height: "100vh",

							style: {
								padding: "2rem",
							},
						}}
					/>
				</div>
			</div>
		</>
	);
}
function MultiSelect({ options, value, onChange, placeholder }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleOption = (option) => {
		const isSelected = value.includes(option);
		if (isSelected) {
			onChange(value.filter((item) => item !== option));
		} else {
			onChange([...value, option]);
		}
	};

	return (
		<div className="relative my-1 text-gray-700 text-[15px]">
			<button
				type="button"
				className="border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between w-full"
				onClick={() => setIsOpen(!isOpen)}
			>
				{value.length === 0 ? placeholder : value.join(", ")}
				<svg
					className="h-5 w-5 ml-2"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
					aria-hidden="true"
					focusable="false"
				>
					<path
						fillRule="evenodd"
						d="M10 12a2 2 0 100-4 2 2 0 000 4z"
						clipRule="evenodd"
					/>
					<path
						fillRule="evenodd"
						d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm14 0a6 6 0 11-12 0 6 6 0 0112 0z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
			{isOpen && (
				<div className="absolute z-10 top-full left-0 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-lg">
					{options.map((option) => (
						<div
							key={option}
							className={`px-4 py-2 cursor-pointer hover:bg-highlight hover:text-white ${
								value.includes(option) ? "bg-gray-100" : ""
							}`}
							onClick={() => toggleOption(option)}
						>
							{option}
						</div>
					))}
				</div>
			)}
		</div>
	);
}
function ImageInput({ value, onChange }) {
	const [imageUrl, setImageUrl] = useState(value);

	const handleImageUrlChange = (e) => {
		const url = e.target.value;
		setImageUrl(url);
		onChange(url);
	};

	return (
		<div className=" flex items-center">
			<input
				type="text"
				id="image-url"
				placeholder="Paste Image Url here ..."
				value={imageUrl}
				onChange={handleImageUrlChange}
				className="border px-3 py-2 rounded-lg focus:outline-none focus:ring  flex-grow"
			/>
			{imageUrl && (
				<img
					src={imageUrl}
					alt="Image Preview"
					className="w-20 h-20 ml-4 object-cover"
				/>
			)}
			<style>
				{`
					.jodit-status-bar{
						display:none;
					}
					`}
			</style>
		</div>
	);
}
export default BlogEditor;
