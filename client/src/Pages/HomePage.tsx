import React, { useEffect } from "react";
import Categories from "../components/Categories";
import Blogs from "../components/Blogs";
import Pagination from "../components/Pagination";

const blogs = [
	{
		_id: 1,
		title: "This is a title",
		description: "This is a description",
		img: "https://source.unsplash.com/random",
	},
	{
		_id: 2,
		title: "This is a title",
		description: "This is a description",
		img: "https://source.unsplash.com/random",
	},
	{
		_id: 3,
		title: "This is a title",
		description: "This is a description",
		img: "https://source.unsplash.com/random",
	},
	{
		_id: 4,
		title: "This is a title",
		description: "This is a description",
		img: "https://source.unsplash.com/random",
	},
	{
		_id: 5,
		title: "This is a title",
		description: "This is a description",
		img: "https://source.unsplash.com/random",
	},
	{
		_id: 6,
		title: "This is a title",
		description: "This is a description",
		img: "https://source.unsplash.com/random",
	},
	{
		_id: 7,
		title: "This is a title",
		description: "This is a description",
		img: "https://source.unsplash.com/random",
	},
	{
		_id: 8,
		title: "This is a title",
		description: "This is a description",
		img: "https://source.unsplash.com/random",
	},
	{
		_id: 9,
		title: "This is a title",
		description: "This is a description",
		img: "https://source.unsplash.com/random",
	},
];

const HomePage = () => {
	const [category, setCategory] = React.useState<string>("General");

	useEffect(() => {
		document.title = "BlogMinds | HomePage";
		//fetch blogs
	}, [category]);

	return (
		<div>
			<Categories category={category} setCategory={setCategory} />
			<Blogs blogs={blogs} />
			<Pagination />
		</div>
	);
};

export default HomePage;
