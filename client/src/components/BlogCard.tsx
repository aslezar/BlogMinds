import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface Blog {
	title: string;
	description: string;
	img: string;
}
interface Props {
	blog: Blog;
}

export default function MediaCard({ blog }: Props) {
	return (
		<Card sx={{ maxWidth: 345 }}>
			<CardMedia sx={{ height: 140 }} image={blog.img} title={blog.title} />
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					{blog.title}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{blog.description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Share</Button>
				<Button size="small">Read</Button>
			</CardActions>
		</Card>
	);
}
