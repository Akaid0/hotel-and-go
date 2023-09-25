import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { roomInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewRoom = () => {
  const navigate = useNavigate()
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [hotelId, setHotelId] = useState(undefined);
  const [rooms, setRooms] = useState([]);
  const [hotelName, setHotelName] = useState(undefined);

  const {data, loading, error} = useFetch("https://hotel-and-go.onrender.com/api/hotels/");

  const handleHotelSelect = (e) => {
      setHotelId(e.target.value.split(',')[1]);
      setHotelName(e.target.value.split(',')[0]);    
  }

  const handleChange = (e) => {
    setInfo((prev) => ({...prev, [e.target.id]: e.target.value }));
  }

  console.log(files)

  const handleClick = async (e) => {
    e.preventDefault();
      
    try {
      const list = await Promise.all(Object.values(files).map(async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset","upload");
        const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dfkdo9xtd/image/upload", data);
        const {url} = uploadRes.data
        return url
      }))
    const roomNumbers = await rooms.split(",").map((room) => ({ number: room }));

    const newroom = {
      ...info,
      roomNumbers,
      photos: list,
      hotelName: hotelName,
    };
      await axios.post(`/rooms/${hotelId}`, newroom)
    } catch (err) {
      console.log(err)
    }
    navigate("/rooms")
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom"> 
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
            <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange} />
                </div>
              ))}
               <div className="formInput" >
                  <label>Rooms</label>
                  <textarea onChange={(e) => setRooms(e.target.value)} placeholder="Give comma between room numbers : 101,102,103,104" />
                </div>
              <div className="formInput">
                  <label>Choose a hotel</label>
                  <select defaultValue='default' id="hotelId" onChange={(e) => handleHotelSelect(e)}>
                    <option value="default" disabled >Choose a hotel</option>
                    {
                      loading ? "loading" : data && data.map((hotel) =>(
                        <option id={hotel.name}  key={hotel._id} value={[hotel.name,hotel._id]} >{hotel.name}</option>
                      ))
                    }
                  </select>
                </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
