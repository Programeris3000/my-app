import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Container from "../../Components/Container/Container"
import "./UserPage.css"
import { server } from "../../Components/Config/Config"

const UserPage = () => {
  const { ID } = useParams()
  const [user, setUser] = useState({})
  const { company, email, name, phone, username, website, address, posts, albums } = user
  const { suite, street, city, zipcode } = address || {}


  useEffect(() => {
    const userFetch = async () => {
      const res = await fetch(`${server}/users/${ID}?_embed=posts&_embed=albums`)
      const person = await res.json()
      setUser(person)
    }
    userFetch()
  }, [ID])



  const companyChecker = (company ? <li>Company: {company.name}</li> : '')
  let postsDisplayer = ''
  
  if (posts) {
    postsDisplayer = posts.map((post, index) => {
      return (
        <li>
            <Link to={`/posts/${post.id}`}>
              {post.title}
            </Link>
        </li>
      )
    })
  }

  let albumsDisplayer = ''

  if (albums){
    albumsDisplayer = albums.map((album, index)=>{
      return (
        <li key={index}>
          <Link to={`/albums/${album.id}`}>{ID}{album.title}</Link>
        </li>
      )
    })
  }


  return (
    <Container>
      <h2>{name}({username})</h2>
      <ul>
        <li>Email address: {email}</li>
        <li>Address: <a href="www.google.com">{suite}, {street}, {city}, {zipcode}</a></li>
        <li>Phone: {phone}</li>
        <li>Website: {website}</li>
        {companyChecker}
      </ul>

      <div>
        <h3>Posts written by {name}</h3>
        <ul>
        {postsDisplayer}
        </ul>
      </div>

      <div>
        <h3>Albums catched by {name}</h3>
        <ul>
        {albumsDisplayer}
        </ul>
      </div>

    </Container>
  )
}

export default UserPage
