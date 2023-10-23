import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

const PostPage = () => {
  const [post, setPost] = useState({})
  const { ID } = useParams()

  useEffect(() => {
    const postFetch = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${ID}?_expand=user&_embed=comments`)
      const data = await res.json()
      setPost(data)
    }
    postFetch()
  }, [ID])

 

  const { body, title, userId, user, comments } = post

  let postName = ''
  if (title) {
    postName = <h2>Title: {title}</h2>
  } else {
    <span>Loading...</span>
  }
  const authorName = user ? <Link to={`/users/${userId}`}><h3>Author: {user.name}</h3></Link> : ''
  const content = post ? <p>{body}</p> : ''
  
  const commentars = comments && comments.length > 0 ? comments.map((comment, index) => {
    return (
      <div>
        <h4>Comment Title ({comment.name})</h4>
        <ul>
          <li key={index}>Comment content: {comment.body}</li>
          <li key={index}>Comment email: {comment.email}</li>
        </ul>
      </div>
    )
  }) : ''

  const otherPosts = <Link to={`/users/posts/${userId}`}>Other author posts</Link>

  return (
    <div>
      <h1>Post number: {ID}</h1>
      {postName}
      {authorName}
      {content}
      {commentars}
      {otherPosts}
    </div>
  )
}

export default PostPage