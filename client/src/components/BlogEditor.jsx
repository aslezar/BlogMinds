import React, { useState, useRef } from "react";
import { Box, Button, TextField, Container } from "@mui/material";
import JoditEditor from "jodit-react";

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
				<div className="flex flex-col w-1/2">
					<TextField label="title" id="title" />
					<TextField label="description" id="description" />
					<div className="flex items-center">
						<img
							style={{
								width: "50%",
								height: "25%",
								maxWidth: "500px",
								maxHeight: "500px",
							}}
							src={blog.img}
							alt="image description"
						/>
						<TextField label="img" id="img" />
					</div>
					<Button type="submit" onClick={handleSubmit} variant="contained">
						Save
					</Button>
				</div>
				<div className="border-2 w-1/2">
					<JoditEditor
						ref={editor}
						value={blog.content}
						tabIndex={1} // tabIndex of textarea
						onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
						onChange={(newContent) => setContent(newContent)}
					/>
				</div>
			</div>
		</>
	);
}

export default BlogEditor;
