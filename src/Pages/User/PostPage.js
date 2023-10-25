import { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { server } from "../../Components/Config/Config"
import Container from "../../Components/Container/Container"
import './PostPage.css'

const PostPage = () => {
  const [post, setPost] = useState({})
  const [postDeleted, setPostDeleted] = useState(false)

  const { ID } = useParams()

  useEffect(() => {
    const postFetch = async () => {
      const res = await fetch(`${server}/posts/${ID}?_expand=user&_embed=comments`)
      const data = await res.json()
      setPost(data)
    }
    postFetch()
  }, [ID])




  const commentDeleteHandler = () => {
    console.log(`veikia`)
  }
 

  const { body, title, userId, user, comments } = post

  let postName = ''
  if (title) {
    postName = <h2>Title: {title}</h2>
  } else {
    <span>Loading...</span>
  }
  const authorName = user ? <Link to={`/users/${userId}`}><h3>Author: {user.name}</h3></Link> : ''
  const content = post ? <p className="comment-content">{body}</p> : ''
  
  const commentars = comments && comments.length > 0 ? comments.map((comment, index) => {
    return (
      <div key={index}>
        <h5>{comment.id}. Comment Title ({comment.name})</h5>
          <p>Comment content: {comment.body}</p>
          <span>Comment email: {comment.email}</span>
          <Link className="button" to={`/editcomment/${comment.id}`}>Edit Comment</Link>
          <button className="button" onClick={commentDeleteHandler}>Delete Comment</button>
      </div>
    )
  }) : ''

  const otherPosts = <Link className="button" to={`/users/posts/${userId}`}>Other author posts </Link>
  const createComment = <Link className="button" to={`/posts/${ID}/createcomment`}>Write a comment</Link>

  const deletePostHandler = () => {
    fetch(`${server}/posts/${ID}`, {
      method: 'DELETE',
    })
    setPostDeleted(true)
  }



  return (
    <Container>
      {!postDeleted ? (
      <>
      <button className="button" onClick={deletePostHandler}>Delete post</button>
      <Link className="button" to={`/editpost/${ID}`}>Edit post</Link>
      <h1>Post number: {ID}</h1>
      {postName}
      {authorName}
      {content}
      {commentars}
      {otherPosts}
      {createComment}
      </>
      ) : (
      <>
      <Link to="/posts">Get back to posts</Link>
      <p>Post deleted...</p>
      </>
      )}

    </Container>
  )
}

export default PostPage