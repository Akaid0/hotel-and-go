import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css"
import {Link, useNavigate} from "react-router-dom"

const Navbar = () => {
  const { user} = useContext(AuthContext);
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('user');
    navigate("/")
    window.location.reload(false);
  }

  function handleLogin() {
    navigate("/login")
  }


  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{color:"inherit", textDecoration:"none", alignItems:"center",justifyContent:"center", display:"flex"}}>
          <span className="logo">Hotel&Go</span><span className="beta">BETA</span>
        </Link>
        {user ? (
        <div className="navItems" style={{display:"flex", flexDirection:"row"}}>
          <div className="navUserName">{user.username}</div>
          <button onClick={handleLogout} className="navButton">Sign out</button>
        </div>
          ) : (
        <div className="navItems">
          <button onClick={handleLogin} className="navButton">Register</button>
          <button onClick={handleLogin} className="navButton">Sign in</button>
        </div>
        )}
      </div>
    </div>
  )
}

export default Navbar