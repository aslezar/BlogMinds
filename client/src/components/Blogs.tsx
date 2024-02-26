import { Grid, Typography } from "@mui/material";
import BlogCard from "./BlogCard";

import { BlogShortType } from "../definitions";

type BlogsProps = {
	blogs: BlogShortType[];
};

const Blogs = ({ blogs }: BlogsProps) => {
	return (
		<Grid
			container
			spacing={2}
			alignItems={"center"}
			justifyContent="center"
			className="!my-4"
		>
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
	);
};

export default Blogs;
