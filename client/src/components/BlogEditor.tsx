import React, { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { Button } from "@mui/material";

function BlogEditor({ blogContent, handleSave }) {
	const editor = useRef(null);
	const [blog, setBlog] = useState(blogContent);

	const setContent = (newContent) => {
		setBlog({ ...blog, content: newContent });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		handleSave(blog);
	};

	return (
		<>
			<div className="flex min-h-screen">
				<div className="flex flex-col w-1 p-4 md:w-1/2 bg-gray-100">
					<label className="mb-2 font-bold">Title</label>
					<input
						type="text"
						value={blog.title}
						onChange={(e) => setBlog({ ...blog, title: e.target.value })}
						className="mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
					/>
					<label className="mb-2 font-bold">Description</label>
					<input
						type="text"
						value={blog.description}
						onChange={(e) => setBlog({ ...blog, description: e.target.value })}
						className="mb-4 px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
					/>
					<label className="mb-2 font-bold">Tags</label>
					<MultiSelect
						options={["Technology", "Science", "Health", "Travel"]}
						value={blog.tags}
						onChange={(selectedOptions) =>
							setBlog({ ...blog, tags: selectedOptions })
						}
						placeholder="Select categories"
					/>
					<ImageInput
						value={blog.imageUrl}
						onChange={(imageUrl) => setBlog({ ...blog, imageUrl })}
					/>

					<Button
						type="submit"
						onClick={handleSubmit}
						variant="contained"
						className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
					>
						Save
					</Button>
				</div>
				<div className="border-2 w-1 md:w-1/2">
					<JoditEditor
						ref={editor}
						value={blog.content}
						tabIndex={1}
						onBlur={(newContent) => setContent(newContent)}
						onChange={(newContent) => setContent(newContent)}
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
		<div className="relative mb-2">
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
							className={`px-4 py-2 cursor-pointer ${
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
		<div className="mb-4 flex items-center">
			<label htmlFor="image-url" className="mr-2 font-bold">
				Image URL
			</label>
			<input
				type="text"
				id="image-url"
				value={imageUrl}
				onChange={handleImageUrlChange}
				className="border px-3 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300 flex-grow"
			/>
			{imageUrl && (
				<img
					src={imageUrl}
					alt="Image Preview"
					className="w-20 h-20 ml-4 object-cover"
				/>
			)}
		</div>
	);
}
export default BlogEditor;
