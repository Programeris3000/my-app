import { useEffect, useState } from "react"
import Container from "../Components/Container/Container"
import axios from "axios"
import { server } from "../Components/Config/Config"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const CreateAlbumPage = () => {
  const [users, setUsers] = useState([])
  const [title, setTitle] = useState('')
  const [selectedUser, setSelectedUser] = useState('')
  const [created, setCreated] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    const usersAxios = async () => {
      const { data } = await axios(`${server}/users`)
      setUsers(data)
      // setSelectedUser(data[0].id)
    }
    usersAxios()
  })

  const optionElements = users.map((user, index) => {
    return (
      <option key={index} value={user.id}>{user.name}</option>
    )
  })


  const titleHandler = event => setTitle(event.target.value)
  const selectedUserHandler = event => setSelectedUser(event.target.value)

  const albumCreateHandler = async (event) => {
    event.preventDefault()

    const newAlbum = {
      userId: selectedUser,
      title
    }
    const res = await axios.post(`${server}/albums`, newAlbum)

    if (res.statusText === 'Created') {
      navigate('/albums/' + res.data.id)
    } else {
      console.error('something went wrong.')
    }
  }


  return (
    <Container>
      <form id="album-create-form" onSubmit={albumCreateHandler}>

        <div className="form-control">
          <label id="album-title">Enter title</label>
          <input type="text" id="album-title" name="album-title" value={title} onChange={titleHandler} />
        </div>

        <div className="form-control">
          <label id="album-user">Select creator</label>
          <select id="album-user" name="album-user" value={selectedUser} onChange={selectedUserHandler}>
            {optionElements}
          </select>
        </div>

        <input type="submit" value="Create album" />
      </form>
    </Container>
  )
}

export default CreateAlbumPage

