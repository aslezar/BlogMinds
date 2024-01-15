import Categories from "../components/Categories";
import BlogCard from "../components/BlogCard";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
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
	return (
		<div>
			<Categories />
			<Grid container spacing={2}>
				{blogs.length ? (
					blogs.map((blog) => (
						<Grid
							item
							xs={12}
							sm={6}
							md={4}
							key={blog._id}
							style={{
								maxWidth: 345,
							}}
						>
							<BlogCard blog={blog} />
						</Grid>
					))
				) : (
					<Typography variant="subtitle1">No blogs available</Typography>
				)}
			</Grid>
			<Pagination />
		</div>
	);
};

export default HomePage;
