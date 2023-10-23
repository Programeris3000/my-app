import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Container from "../../Components/Container/Container"
import "./AlbumPage.css"

const AlbumPage = () => {
  const [album, setAlbum] = useState([])
  const {ID} = useParams()
  console.log(album)

  useEffect(() => { 
    const albumFetch = async () => {
      const res = await fetch (`https://jsonplaceholder.typicode.com/albums/${ID}/?_embed=photos&_expand=user`)
      const albumArray = await res.json()
      setAlbum(albumArray)
    }
    albumFetch()
  },[ID])

const titleDisplay = album ? <h2>{album.title}</h2> : ''
const creator = album.user ? <Link className="album-creator"to={`/users/${album.userId}`}>{album.user.name}</Link> : ''
const photosDisplay = album.photos
  ? album.photos.map((photo, index) => (
      <img style={{width:300}}key={index} src={photo.url} alt="perfectiliano" />
    ))
  : null

  return (
    <Container>
    <h1>Album {ID}</h1>
    {titleDisplay}
    {creator}
    {photosDisplay}
    </Container>
  )
}

export default AlbumPage