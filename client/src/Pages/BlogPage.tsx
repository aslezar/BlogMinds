import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { handler, getBlog } from "../api/index.ts"
import Loader from "../components/Loader"
import toast from "react-hot-toast"

import { BlogFullType } from "../definitions"

const BlogPage = () => {
    const [isError, setError] = React.useState<boolean>(false)
    const [isLoading, setLoading] = React.useState<boolean>(true)
    const [blog, setBlog] = React.useState<BlogFullType | null>(null)
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        handler(
            getBlog,
            id,
            (data: BlogFullType) => {
                setBlog(data)
                setLoading(false)
            },
            (msg: string) => {
                setError(true)
                setLoading(false)
                toast.error(msg)
            },
        )
    }, [])

    if (isLoading === true) return <Loader />
    if (isError === true) return <div>Error</div>

    return <div>{JSON.stringify(blog)}</div>
}

export default BlogPage
