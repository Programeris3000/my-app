import React, { useState } from 'react'
import Container from '../Container'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './Navigation.css'


const Navigation = () => {

  const [text, setText] = useState('')


  const SearchFormHandler = (event) => {
    event.preventDefault()
    console.log(text)
  }
  const SearchBarHandler = (event) => setText(event.target.value)
  
  return (
    <Container>
      <nav className="navigation-element">
        <ul className="navigation-list">

        <li className="navigation-list-item">
            <NavLink className="navigation-link-item" to='/'>Home</NavLink>
          </li>

        <li className="nav-li">
            <NavLink className="navigation-link-item" to='/users'>Users</NavLink>
          </li>

        <li className="nav-item">
            <NavLink className="navigation-link-item" to='/posts'>Posts</NavLink>
          </li>

        <li className="nav-item">
            <NavLink className="navigation-link-item" to='/albums'>Albums</NavLink>
          </li>

        </ul>

        <div className="form-control">
          <form id="search-bar-form" onSubmit={SearchFormHandler}>
          <label id="search-bar-label"htmlFor="search-bar">Search by key: </label>
          <input 
          id="search-bar" 
          name="search-bar" 
          type="text" 
          value={text} 
          onChange={SearchBarHandler}/>

          <button type="submit">Search</button>
          </form>
        </div>
      </nav>
    </Container>
  )
}

export default Navigation