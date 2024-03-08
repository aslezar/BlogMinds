import BlogEditor from "../components/BlogEditor";
import { BlogFullType } from "../definitions";

const blog: BlogFullType = {
	_id: "1",
	title: "",
	description: "",
	img: "https://source.unsplash.com/random",
	content: "This is a content",
	tags: [],
	createdAt: "2021-09-01",
	updatedAt: "2021-09-01",
	author: "John Doe",
};
;
const AddBlogPage = () => {
	const handleSave = (newBlog: BlogFullType) => {
		console.log(newBlog);
	};

	return (
		<div>
			<BlogEditor blogContent={blog} handleSave={handleSave} />
		</div>
	);
};

export default AddBlogPage;
