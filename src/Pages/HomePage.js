import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Container from '../Components/Container/Container'
import './HomePage.css'
import { server } from '../Components/Config/Config'

const HomePage = () => {
  const [users, setUsers] = useState([])
  const [albums, setAlbums] = useState([])
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const usersFetch = async () => {
      const rest = await fetch(`${server}/users`)
      const data = await rest.json()
      setUsers(data)
    }
    usersFetch()
  }, [])

  useEffect(() => {
    const postsFetch = async () => {
      const rest = await fetch(`${server}/posts`)
      const data = await rest.json()
      setPosts(data)
    }
    postsFetch()
  }, [])

  useEffect(() => {
    const albumsFetch = async () => {
      const rest = await fetch(`${server}/albums`)
      const data = await rest.json()
      setAlbums(data)
    }
    albumsFetch()
  }, [])




  const usersElement = users && users.map((user, index) => {
    return (
      <li className="users"
        key={index}>
        <Link className="home-page-link-element" to={`/users/${user.id}`}>
          {user.name}
        </Link>
      </li>
      )
  })

  const postsElement = posts && posts.map((post, index) => {
    return (
      <li className="posts"
        key={index}>
        <Link className="home-page-link-element" to={`/posts/${post.id}`}>
          {post.id}. {post.title}
        </Link>
      </li>
      )
  })

  
  const albumsElement = albums && albums.map((album, index) => {
    return (
      <li className="albums"
        key={index}>
        <Link className="home-page-link-element" to={`/albums/${album.id}`}>
          {album.id}. {album.title}
        </Link>
      </li>
      )
  })


  const usersWrapper = users && (
    <div className="users-wrapper">
      <h2 className="users-title">Users</h2>
      <ul className="users-list">{usersElement}</ul>
    </div>
  )

  const postsWrapper = posts && (
    <div className="posts-wrapper">
      <h2 className="post-title">Posts</h2>
      <ul className="post-list">{postsElement}</ul>
    </div>
  )

  const albumsWrapper = albums && (
    <div className="albums-wrapper">
      <h2 className="album-title">Albums</h2>
      <ul className="album-list">{albumsElement}</ul>
    </div>
  )


  return (
    <Container>
      <h1 className="home-page">HomePage</h1>
      {usersWrapper}
      {postsWrapper}
      {albumsWrapper}
    </Container>
  )
}

export default HomePage