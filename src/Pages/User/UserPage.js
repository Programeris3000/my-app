import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Container from "../../Components/Container/Container"
import "./UserPage.css"

const UserPage = () => {
  const { ID } = useParams()
  const [user, setUser] = useState({})
  const { company, email, name, phone, username, website, address, posts, albums } = user
  const { suite, street, city, zipcode } = address || {}


  useEffect(() => {
    const userFetch = async () => {
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${ID}?_embed=posts&_embed=albums`)
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
          <Link to={`/albums/${album.id}`}>{album.title}</Link>
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

// 5. Sukurti naują puslapį use, kuriame bus atvaizduojama vartotojo informacija:
//   5.1. Pilnas vardas.
//   5.2. Vartotojo vardas / nick'as.
//   5.3. El. paštas.
//   5.4. Adresas, kuris turės gatvę, namo numerį, miestą, pašto kodą. Paspaudus ant adreso, pagal koordinates, turėtų atidaryti šios vietos Google Maps.
//   5.5. Telefono numeris.
//   5.6. Internetinio puslapio adresas.
//   5.7. Įmonės, kurioje dirba, pavadinimas.

// 6. Šiame puslapyje (use) turi būti atvaizduojama:
//   6.1. Visi vartotojo parašyti įrašai (posts). Kiekvienas post'as turi turėti nuorodą.
//   6.2. Visi vartotojo sukurti foto albumai. Kiekvienas albumas turės pavadinimą, kuris turi būti nuoroda.