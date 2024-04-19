import React from "react"
import { BlogCreateType } from "../definitions"
import EditorPage from "../components/Editor"
import EditorSideBar from "../components/EditorSideBar"
import toast from "react-hot-toast"
import { getUserBlogById, createBlog, updateBlog } from "../api"
import { useNavigate, useParams } from "react-router-dom"
import { useEditorContext } from "../context/EditorContext"
import Loader from "../components/Loader"

const initalBlog =
  '{"_id":"new_blog","title":"","description":"","img":"https://source.unsplash.com/random","content":{"time":1550476186479,"blocks":[{"type":"title","data":{"text":"Editor.js","level":2}},{"type":"paragraph","data":{"text":"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration."}},{"type":"title","data":{"text":"Key features","level":3}}],"version":"2.8.1"},"tags":[]}'

function BlogEditor() {
  const [loading, setLoading] = React.useState<boolean>(true)
  const [loadingPublish, setLoadingPublish] = React.useState<boolean>(false)
  const [blog, setBlog] = React.useState<BlogCreateType | null>(null)

  const navigate = useNavigate()

  //if `blogId === new_blog` then it is a new blog
  const { id: blogId } = useParams<{ id: string }>()
  const { editor } = useEditorContext()

  React.useEffect(() => {
    if (!blogId) return

    if (blogId === "new_blog") {
      const blogFromStorageString =
        localStorage.getItem("new_blog") || initalBlog

      const blogFromStorage = JSON.parse(blogFromStorageString)
      setBlog((_prevBlog) => blogFromStorage)
      setLoading(false)
    } else {
      const blogFromStorageString = localStorage.getItem(blogId)

      if (blogFromStorageString) {
        const blogFromStorage = JSON.parse(blogFromStorageString)
        setBlog((_prevBlog) => blogFromStorage)
        setLoading(false)
        return
      }

      setLoading(true)
      getUserBlogById(blogId)
        .then((response) => {
          let resBlog = response.data.blog
          resBlog.content = JSON.parse(resBlog.content)
          setBlog((_prevBlog) => resBlog)
        })
        .catch((err) => {
          console.error(err)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [blogId])

  React.useEffect(() => {
    if (editor && blog) editor.render(blog.content)
  }, [editor, blog?.content])

  React.useEffect(() => {
    if (!blogId) return
    const id = setInterval(async () => {
      if (!editor) return
      const output = await editor.save()
      localStorage.setItem(blogId, JSON.stringify({ ...blog, content: output }))
    }, 1000)
    return () => {
      clearInterval(id)
    }
  }, [blog, blogId, blog?.content, editor])

  const createOrUpdateBlog = async (
    blog: BlogCreateType,
    latestContent: BlogCreateType["content"],
  ) => {
    if (blogId) localStorage.setItem("new_blog", JSON.stringify(blog))
    const data = await (blog._id === "new_blog"
      ? createBlog({ ...blog, content: latestContent })
      : updateBlog({ ...blog, content: latestContent }))
    console.log(data.data.id)
    return data.data.id
  }

  const handlePublish = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (blog === null) return

    setLoadingPublish(true)
    try {
      const latestContent = await editor.save()
      console.log(latestContent)
      const id = await createOrUpdateBlog(blog, latestContent)
      toast.success(
        blog._id === "new_blog" ? "Blog Published" : "Blog updated",
        {
          id: "publish",
        },
      )
      if (blogId === "new_blog") {
        localStorage.removeItem("new_blog")
        navigate(`/write/${id}`)
      } else if (blogId) {
        localStorage.removeItem(blogId)
        navigate(`/blog/${blogId}`)
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoadingPublish(false)
    }
  }
  if (loading) return <Loader />
  if (blog === null)
    return (
      <div style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
        You are not authorized to edit this blog.
      </div>
    )
  return (
    <div className="flex  z-40 mx-auto w-screen  top-0 bg-white pl-[25%]">
      <EditorSideBar
        blogId={blogId}
        blog={blog}
        setBlog={setBlog}
        disabledPublish={loadingPublish || !editor}
        handlePublish={handlePublish}
      />
      <EditorPage />
    </div>
  )
}

export default BlogEditor
