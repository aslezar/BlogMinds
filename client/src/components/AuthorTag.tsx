import { NavLink } from "react-router-dom"
import { Author } from "../definitions"

const AuthorTag = ({ author }: { author: Author }) => {
  return (
    <NavLink className="flex items-end " to={`/user/${author._id}`}>
      <img
        className="object-cover object-center w-6 aspect-square rounded-full"
        src={author.profileImage}
        alt=""
      />
      <div className="ml-2">
        <h1 className="text-lg text-gray-700 hover:underline hover:cursor-pointer">
          {author.name}
        </h1>
      </div>
    </NavLink>
  )
}

export default AuthorTag
