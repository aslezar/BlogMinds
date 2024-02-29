import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
// import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { BlogShortType } from "../definitions";

import { useNavigate } from "react-router-dom";

interface Props {
	blog: BlogShortType;
}

export default function MediaCard({ blog }: Props) {
	const navigate = useNavigate();
	return (
		<Card sx={{ maxWidth: 300 }}>
			<CardMedia sx={{ height: 200 }} image={blog.img} title={blog.title} />
			<CardContent>
				<div className="relative group hover:cursor-pointer">
					<Typography gutterBottom variant="h5" className="">
						{blog.title}
					</Typography>
					<div className="absolute h-0 group-hover:h-1  z-10 transition-all duration-300  bottom-0 left-0 w-full  bg-indigo-200 "></div>
				</div>
				<Typography>
					{blog.description.length > 200
						? `${blog.description.slice(0, 200)}...`
						: blog.description}
				</Typography>
				<Typography variant="body2" className="!mt-3 text-indigo-600">
					Author: {blog.author}
				</Typography>
			</CardContent>
			<CardActions className="!px-4 my-2">
				<button
					className=" rounded px-3 py-1.5  overflow-hidden group bg-indigo-500 relative hover:bg-gradient-to-r hover:from-indigo-500 hover:to-indigo-400 text-white hover:ring-1 hover:ring-offset-1 hover:ring-indigo-400 transition-all ease-out duration-300"
					onClick={() => navigate(`/blog/${blog._id}`)}
				>
					<span className="relative">
						Read <span>&#8594;</span>{" "}
					</span>
				</button>
				<button className=" rounded px-3 py-1.5  overflow-hidden group border-2 border-indigo-500 relative  text-indigo-600 hover:ring-1 hover:ring-offset-1 hover:ring-indigo-400 transition-all ease-out duration-300">
					<span className="relative">Share</span>
				</button>
			</CardActions>
		</Card>
	);
}
