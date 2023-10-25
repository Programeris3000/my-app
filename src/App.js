import Navigation, { searchAction } from './Components/Container/Navigation/Navigation';
import HomePage from './Pages/HomePage';
import UsersPage from './Pages/UsersPage';
import UserPage from './Pages/User/UserPage';
import AlbumsPage from './Pages/AlbumsPage';
import AlbumPage from './Pages/User/AlbumPage'
import PostsPage from './Pages/PostsPage';
import PostPage from './Pages/User/PostPage';
import EditPostPage from './Pages/EditPostPage';
import CreatePostPage from './Pages/CreatePostPage';
import Container from './Components/Container/Container'
import UserPosts from './Pages/User/UserPosts';
import SearchPage from './Pages/SearchPage';
import { Route, Routes } from "react-router-dom"
import { useSubmit } from 'react-router-dom';
import './App.css';
import EditCommentPage from './Pages/EditCommentPage';
import CreateCommentPage from './Pages/CreateCommentPage';
import CreateAlbumPage from './Pages/CreateAlbumPage';

function App() {
  return (
   <Container>
    <Navigation />
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/users" element={<UsersPage />}/>
      <Route path="/posts" element={<PostsPage />}/>
      <Route path="/createpost" element={<CreatePostPage />}/>
      <Route path="/posts/:ID/createcomment" element={<CreateCommentPage />}/>
      <Route path="/editpost/:ID" element={<EditPostPage />}/>
      <Route path="/editcomment/:ID" element={<EditCommentPage />}/>
      <Route path="/albums" element={<AlbumsPage />}/>
      <Route path="/users/:ID" element={<UserPage />}/>
      <Route path="/users/posts/:ID" element={<UserPosts />}/>
      <Route path="/posts/:ID" element={<PostPage />}/>
      <Route path="/albums/:ID" element={<AlbumPage />}/>
      <Route path="/createalbum" element={<CreateAlbumPage />}/>
      <Route path="/search" element={<SearchPage />}/>
      </Routes>
    </Container>
  )
}

export default App;
