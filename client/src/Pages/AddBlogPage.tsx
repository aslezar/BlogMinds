import BlogEditor from "../components/BlogEditor";

const blog = {
	_id: 1,
	title: "This is a title",
	description: "This is a description",
	img: "https://source.unsplash.com/random",
	content: "This is a content",
	tags: ["Technology"],
};

const AddBlogPage = () => {
	const handleSave = (newBlog) => {
		console.log(newBlog);
	};
	return (
		<div>
			<BlogEditor blogContent={blog} handleSave={handleSave} />
		</div>
	);
};

export default AddBlogPage;
