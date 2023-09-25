import { useContext, useState } from 'react'
import "./login.scss"
import { AuthContext } from '../../context/AuthContext.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: undefined,
        password: undefined,
    });

    const { loading, error, dispatch} = useContext(AuthContext);

    const navigate = useNavigate()

    const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value}));
    }

    const handleClick = async e => {
        e.preventDefault();
        dispatch({type:"LOGIN_START"})
        try {
            const res = await axios.post("https://hotel-and-go.onrender.com/api/auth/login", credentials)
            if(res.data.isAdmin){
              dispatch({type:"LOGIN_SUCCESS", payload: res.data.details});
              navigate("/")
            } else {
              dispatch({type:"LOGIN_FAILURE", payload: {message:"You are not allowed"}})
            }
        } catch (err) {
            dispatch({type:"LOGIN_FAILURE", payload: err.response.data})
        }
    }

  return (
    <div className='login'>
      <div className='lTitleWrapper'>
        <a href="/">
          <h1 className='lTitle'>Hotel & Go</h1>
          <h2 className='lSubtitle'>Admin panel</h2>
        </a>
      </div>
        <div className='post-it'>
            <h1>Registration is closed</h1>
            <p style={{marginBottom:"25px"}}>Try to connect using these credentials :</p>
            <p style={{marginLeft:"50px"}}>username : user</p>
            <p style={{marginLeft:"50px"}}>password : user</p>
        </div>
        <div className="lContainer">
            <input type="text" placeholder='username' id='username' onChange={handleChange} className="lInput" />
            <input type="text" placeholder='password' id='password' onChange={handleChange} className="lInput" />
            <button disabled={loading} onClick={handleClick} className="lButton">Login</button>
            {error && <span>{error.message}</span>}
        </div>
    </div>
  )
}

export default Login