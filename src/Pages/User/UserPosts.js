import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Container from "../../Components/Container/Container"
import { server } from "../../Components/Config/Config"
const UserPosts = () => {


  const { ID } = useParams()
  const [posts, setPosts] = useState([])
  const [author, setAuthor] = useState([])

  useEffect(() => {
    const authorPostsFetch = async () => {
      const res = await fetch(`${server}/users/${ID}/posts`)
      const authorPosts = await res.json()
      setPosts(authorPosts)
    }
    authorPostsFetch()
  }, [ID])

  useEffect(() => {
    const authorFetch = async () => {
      const res = await fetch(`${server}/users/${ID}`)
      const authorName = await res.json()
      setAuthor(authorName)
    }
    authorFetch()
  }, [ID])



  let authorPostsDisplay = ''
  if (posts && posts.length > 0) {
    authorPostsDisplay = ( posts.map((post,index)=>{
      return(
        <div key={index}>
          <h2>Post Title: {post.title}</h2>
          <p>Post Paragraph: {post.body}</p>
        </div>
      )
    })
    )
  }
  const creator = author ? author.name : ''



  return (
    <Container>
      <h1>{creator} Posts</h1>
      {authorPostsDisplay}
    </Container>
  )
}

export default UserPosts