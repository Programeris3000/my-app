import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import Container from "../../Components/Container/Container"
import "./AlbumPage.css"
import { server } from "../../Components/Config/Config"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const AlbumPage = () => {
  const [album, setAlbum] = useState([])
  const { ID } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const albumFetch = async () => {
      const res = await fetch(`${server}/albums/${ID}/?_embed=photos&_expand=user`)
      const albumArray = await res.json()
      setAlbum(albumArray)
    }
    albumFetch()
  }, [ID])

  const titleDisplay = album ? <h2>{album.title}</h2> : ''
  const creator = album.user ? <Link className="album-creator" to={`/users/${album.userId}`}>{album.user.name}</Link> : ''
  const photosDisplay = album.photos
    ? album.photos.map((photo, index) => (
      <img style={{ width: 300 }} key={index} src={photo.url} alt="perfectiliano" />
    ))
    : null


  const backToAlbumsHandler = () => {
    navigate('/albums')
  }

  const deleteAlbumHandler = () => {
    axios.delete(`${server}/albums/${ID}`)
    navigate('/albums')
  }

  return (
    <Container>
      <button className="button" onClick={deleteAlbumHandler}>Delete album</button>
      <button className="button" onClick={backToAlbumsHandler}>Back to albums...</button>
      <h1>Album {ID}</h1>
      {titleDisplay}
      {creator}
      {photosDisplay}
    </Container>
  )
}

export default AlbumPage