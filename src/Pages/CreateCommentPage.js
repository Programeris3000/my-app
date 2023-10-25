import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Container from '../Components/Container/Container'
import { server } from '../Components/Config/Config'



const CreateCommentPage = () => {
  
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [body, setBody] = useState('')
  const [users, setUsers] = useState([])
  const [created, setCreated] = useState(false)

  const {ID} = useParams()




  useEffect(() => {
    const fetchUser =  async () => {
      const res = await fetch(`${server}/users`)
      const data = await res.json()
      setUsers(data)

    }
    fetchUser()
  },[])
  


  const commentFormHandler = (event) => {
    event.preventDefault()
   const newComment = {
      postId: ID,
      name,
      email,
      body
      }
      console.log(newComment)

      fetch(`${server}/comments`, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
      .then(res => res.json())
      .then(data => console.log(data))
      
      setCreated(true)
  }
  const nameHandler = event => setName(event.target.value)
  const emailHandler = event => setEmail(event.target.value)
  const bodyHandler = event => setBody(event.target.value)


    if(created){
      return(
        <Container>
        <p style = {{color: 'green'}}>Comment successfully created...</p>
        <Link className="button" to={`/posts/${ID}`}>Get back to comments...</Link>
      </Container>
      )
    }

  return (
    <Container>
      <form onSubmit={commentFormHandler}>



        <div className='form-control'>
          <label htmlFor="name">Enter comment title</label>
          <input onChange={nameHandler} type="text" id="name" name="name" value={name}/>
        </div>

        <div className='form-control'>
          <label htmlFor="email">Enter your email</label>
          <input onChange={emailHandler} type="text" id="email" name="email" value={email}/>
        </div>

        <div className='form-control'>
          <label htmlFor="body">Enter comment content</label>
          <textarea onChange={bodyHandler} type="text" id="body" name="body" value={body}/>
        </div>

        <input className="button" type="submit" value="Create a comment"/>
      </form>
    </Container>
  )
}

export default CreateCommentPage

