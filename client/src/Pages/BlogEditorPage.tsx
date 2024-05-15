import React from "react"
import { BlogCreateType } from "../definitions"
import EditorPage from "../components/Editor"
import EditorSideBar from "../components/EditorSideBar"
import toast from "react-hot-toast"
import { getUserBlogById, createBlog, updateBlog } from "../api"
import { useNavigate, useParams } from "react-router-dom"
import { useEditorContext } from "../context/EditorContext"
import Loader from "../components/Loader"
import confirm from "../components/ConfirmationComponent"

const initialBlog = `{"_id":"new_blog","title":"","description":"","img":"https://source.unsplash.com/random","content":{"time":${Date.now()},"blocks":[],"version":"2.29.1"},"tags":[]}`

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
        localStorage.getItem("new_blog") || initialBlog

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
    return data.data.id
  }

  const handlePublish = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    if (blog === null) return

    setLoadingPublish(true)
    try {
      const latestContent = await editor.save()
      const id = await createOrUpdateBlog(blog, latestContent)
      toast.success(
        blog._id === "new_blog" ? "Blog Published" : "Blog Updated",
        {
          id: "publish",
        },
      )
      localStorage.removeItem("new_blog")
      navigate(`/blog/${id}`)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingPublish(false)
    }
  }

  const resetBlog = async () => {
    if (!blogId) return

    const confirmReset = await confirm(
      "Are you sure you want to reset the blog?\nThis action is irreversible.",
      {
        title: "Reset Blog",
        deleteButton: "Reset",
        cancelButton: "Cancel",
      },
    )
    if (confirmReset === false) return
    if (blogId === "new_blog") {
      const blogFromStorageString = initialBlog

      const blogFromStorage = JSON.parse(blogFromStorageString)

      setBlog((_prevBlog) => blogFromStorage)
    } else {
      getUserBlogById(blogId)
        .then((response) => {
          let resBlog = response.data.blog
          resBlog.content = JSON.parse(resBlog.content)
          setBlog((_prevBlog) => resBlog)
        })
        .catch((err) => console.error(err))
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
    <div className="flex  z-40 mx-auto w-screen  top-0 bg-white lg:pl-[25%]">
      <EditorSideBar
        blogId={blogId}
        blog={blog}
        setBlog={setBlog}
        disabledPublish={loadingPublish || !editor}
        handlePublish={handlePublish}
        resetBlog={resetBlog}
      />
      <EditorPage />
      <div className=" lg:hidden mx-auto  h-[80vh] flex items-center italic  text-gray-600 px-20 text-center text-xl">
        Our Editor is only supported on desktop view for now. Please use a
        desktop to write a blog.
      </div>
    </div>
  )
}

export default BlogEditor
