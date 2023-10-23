import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import "./PostsPage.css"

const PostsPage = () => {
  const [posts, setPosts] = useState([])


  useEffect(() => {
    const postsFetch = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_expand=user&_embed=comments')
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
      <li className="posts-list-item" key={index}>
        <Link className="posts-list-creator" to={`/users/${userId}`}>
          {name}.
        </Link>

        <Link className="posts-list-title" to={`/posts/${id}`}>
          Title: {title}. ({commentsLength}) Comments.
        </Link>
      </li>)
  })

  return (
    <div className="posts-list-wrapper">
      <ul className="posts-list">
        {postsSplitted}
      </ul>
    </div>
  )
}

export default PostsPage