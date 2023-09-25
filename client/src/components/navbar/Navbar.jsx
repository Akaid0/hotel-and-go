import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css"
import {Link, useNavigate} from "react-router-dom"

const Navbar = () => {
  const { user} = useContext(AuthContext);
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.clear();
    window.location.reload(false);
  }

  function handleLogin() {
    navigate("/login")
  }


  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration:"none"}}>
          <span className="logo">Hotel&Go</span>
        </Link>
        {user ? (
        <div className="navItems" style={{display:"flex", flexDirection:"row"}}>
          <div className="navUserName">{user.username}</div>
          <button onClick={handleLogout} className="navButton">Sign out</button>
        </div>
          ) : (
        <div className="navItems">
          <button className="navButton">Register</button>
          <button onClick={handleLogin} className="navButton">Sign in</button>
        </div>
        )}
      </div>
    </div>
  )
}

export default Navbar