import { useEffect, useState } from "react"
import { server } from "../Components/Config/Config"
import Container from "../Components/Container/Container"
import { Link } from "react-router-dom"


const CreatePostPage = () => {

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState()
  const [created, setCreated] = useState(false)


  useEffect(() => {
    const usersFetch = async () => {
      const res = await fetch(`${server}/users`)
      const data = await res.json()
      const firstUserId = data[0].id
      setUsers(data)
      setSelectedUser(firstUserId)
    }
    usersFetch()
  }, [])


  const postSubmitHandler = (event) => {
    event.preventDefault()

    const post =
    {
      title,
      body,
      userId: Number(selectedUser)
    }
    console.log(post)

    fetch(`${server}/posts`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(res => res.json())
      .then(data => console.log(data));
      
      setCreated(true)

  }
  const titleHandler = event => setTitle(event.target.value)
  const bodyHandler = event => setBody(event.target.value)
  const userHandler = event => setSelectedUser(event.target.value)


  const namesSplitter = users.map(user => {
    const { name, id } = user
    return (
      <option key={id} value={id}>{name}</option>
    )
  })

  let selectElement = (
    <div className="form-control">
      <select onChange={userHandler} value={selectedUser}>
        {namesSplitter}
      </select>
    </div>
  )
  if (!users) {
    selectElement = <p>Loading...</p>
  }

  if(created){
    return(
      <Container>
      <p style = {{ color: 'green'}}>Post created successfully</p>
      <Link to='/posts'>Get back to posts</Link>
      </Container>
    )
  }
  return (
    <Container>
      {users && users.length > 0 ? (
        <form onSubmit={postSubmitHandler}>
          <div className="form-control">
            <label htmlFor="create-post-title">Enter post title</label>
            <input onChange={titleHandler} value={title} type="text" id="create-post-title" name="create-post-title" />
          </div>

          <div className="form-control">
            <label htmlFor="create-post-content">Enter post content</label>
            <textarea onChange={bodyHandler} value={body} type="text" id="create-post-content" name="create-post-content" />
          </div>

          {selectElement}

          <input type="submit" value="Create post" />
        </form>
      ) : (<p>loading...</p>)}
    </Container>

  )
}

export default CreatePostPage