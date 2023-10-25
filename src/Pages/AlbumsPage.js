import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import "./AlbumsPage.css"
import { server } from "../Components/Config/Config"

const AlbumsPage = () => {
  const [albums, setAlbums] = useState([])

  useEffect(() => {
    const fetchAlbums = async () => {
      const res = await fetch(`${server}/albums?_expand=user&_embed=photos`)
      const albumsArray = await res.json()
      setAlbums(albumsArray)
    }
    fetchAlbums()
  }, [])

  const splitedAlbumsArray = albums.map((album, index) => {
    const { user, id, title, photos } = album
    const { name } = user
    const photosLength = photos.length
    const randomIndex = Math.floor(Math.random() * photosLength)
    const randomPhoto = photos[randomIndex]
    return (
      <div className="albums-list-li-item" key={index}>
        <Link className="albums-list-link-item" to={`/albums/${id}`}>
          <h2 className="albums-list-title">{id} {title}</h2>
          <h3 className="albums-list-creator">Created by ({name})</h3>
          <h4 className="albums-list-length">Album has {photosLength} phots.</h4>
          <img style={{ width: 300 }} src={randomPhoto.url} alt="kolkas nera" />
        </Link>
      </div>
    )
  })

  return (
    <div className="albums-list-wrapper">
      <Link className="button" to="/createalbum">Create album</Link>
      {splitedAlbumsArray}
    </div>
  )
}

export default AlbumsPage