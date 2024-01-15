import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { handler, getBlog } from "../api";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const BlogPage = () => {
	const [isLoading, setLoading] = React.useState<boolean>(true);
	const [blog, setBlog] = React.useState();
	const { id } = useParams<{ id: string }>();

	useEffect(() => {
		handler(
			getBlog,
			id,
			(blog: any) => {
				setBlog(blog);
				setLoading(false);
			},
			(msg: string) => toast.error(msg)
		);
	}, []);

	if (isLoading === true) return <Loader />;

	return <div>{JSON.stringify(blog)}</div>;
};

export default BlogPage;
