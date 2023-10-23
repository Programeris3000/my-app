import Navigation from './Components/Container/Navigation/Navigation';
import HomePage from './Pages/HomePage';
import UsersPage from './Pages/UsersPage';
import UserPage from './Pages/User/UserPage';
import AlbumsPage from './Pages/AlbumsPage';
import AlbumPage from './Pages/User/AlbumPage'
import PostsPage from './Pages/PostsPage';
import PostPage from './Pages/User/PostPage'
import Container from './Components/Container/Container'
import { Route, Routes } from "react-router-dom"
import './App.css';
import UserPosts from './Pages/User/UserPosts';
import SearchPage from './Pages/SearchPage';

function App() {
  return (
   <Container>
    <Navigation />
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/users" element={<UsersPage />}/>
      <Route path="/posts" element={<PostsPage />}/>
      <Route path="/albums" element={<AlbumsPage />}/>
      <Route path="/users/:ID" element={<UserPage />}/>
      <Route path="/users/posts/:ID" element={<UserPosts />}/>
      <Route path="/posts/:ID" element={<PostPage />}/>
      <Route path="/albums/:ID" element={<AlbumPage />}/>
      <Route path="/search/:ID" element={<SearchPage />}/>
      </Routes>
    </Container>
  )
}

export default App;
