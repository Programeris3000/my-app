import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import "./PostsPage.css"
import { server } from "../Components/Config/Config"

const PostsPage = () => {
  const [posts, setPosts] = useState([])
  const {ID} = useParams()


  useEffect(() => {
    const postsFetch = async () => {
      const res = await fetch(`${server}/posts?_expand=user&_embed=comments`)
      const post = await res.json()
      setPosts(post)
    }
    postsFetch()
  }, [])

  const postsSplitted = posts.map((post, index) => {
  
    const { id, title, userId, user, comments } = post
    const { name } = user
    const commentsLength = comments.length
    return (
      <div className="posts-list-item" key={index}>
        <Link className="posts-list-title-link" to={`/posts/${id}`}>
          <h2 className="post-list-title">{id}. {title}</h2>
          <span className="post-comments">({commentsLength}) Comments.</span>
        </Link>

        <Link className="posts-list-creator" to={`/users/${userId}`}>
          Written by: {name}.
        </Link>

        <Link className="button" to={`/editpost/${id}`}>Edit post</Link>
      </div>
     )
  })

  return (
    <div className="posts-list-wrapper">
      <Link className="button" to="/createpost">Create post</Link>
        {postsSplitted}
    </div>
  )
}

export default PostsPage