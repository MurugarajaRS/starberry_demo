import React, { useEffect, useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import Auth from '../Auth/Auth'

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [userName, setUserName] = useState("")
  const history = useNavigate();
  useEffect(() => {
    setIsLoggedIn(Auth.isLoggedIn());
    setUserName(Auth.loggedInUser())
  })
  useEffect(() => {
    setIsLoggedIn(Auth.isLoggedIn());
    
  },[isLoggedIn])
  const logOut = () =>{
    Auth.removeInfo()
    setIsLoggedIn(false)
    history('/')
  }
  return (
    <div className="navbar" >
      <div className="nav-links" >
        {isLoggedIn ? 
          <div >
            <span onClick={() => logOut()}>Log out </span>
            <span style={{marginLeft:"15px", fontWeight:"bold"}}>{userName}</span>
          </div> : 
          <Link to="/">Login</Link>
        }
      </div>
    </div>
  )
}

export default Nav