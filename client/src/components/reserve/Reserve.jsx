import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "./reserve.css"
import { AiOutlineClose} from "react-icons/ai"
import useFetch from "../../hooks/useFetch.js"
import { useContext, useState } from "react"
import { SearchContext } from "../../context/SearchContext.js"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Reserve = ({setOpen, hotelId}) => {
    const {data, loading, error} = useFetch(`https://hotel-and-go.onrender.com/api/hotels/room/${hotelId}`)
    const [selectedRooms, setSelectedRooms] = useState([])
    const {dates} = useContext(SearchContext)

    const getDatesInRange = (startDate, endDate) => {
        const start = new Date(startDate)
        const end = new Date(endDate)
        const date = new Date(start.getTime());

        let dates =[]

        while(date <= end){
            dates.push(new Date(date).getTime())
            date.setDate(date.getDate()+1)
        }
    
        return dates
    };

    const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate);
    
    const isAvailable = (roomNumber) => {
        const isFound = roomNumber.unavailableDates.some(date => 
            alldates.includes(new Date(date).getTime())
        );
        return !isFound
    };

    const handleSelect = (e) => {
        const checked = e.target.checked;
        const value = e.target.value;
        setSelectedRooms(checked ? [...selectedRooms, value] : selectedRooms.filter(item => item !== value))
    };

    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            await Promise.all(selectedRooms.map(roomId => {
                const res = axios.put(`/rooms/availability/${roomId}`, {dates:alldates})
                return res.data
            }))
            setOpen(false)
            navigate("/")
        } catch (err) {}
    };


    function DescLimit(text, count){
        return text.slice(0, count) + (text.length > count ? "..." : "");
    }

  return (
    <div className="reserve">
        <div className="rContainer">
            <AiOutlineClose className="rClose" onClick={() => setOpen(false)} />
            <div className="rHeader">
                <span>Select your room : </span>
            </div>
            <div className="rRoomWrapper">
                {data?.map((item) => (
                    <div className="rItem" key={item?._id}>
                        <div className="rItemInfo">
                            <div className="rTitle">{item?.title}</div>
                            <div className="rDesc">{DescLimit(item?.desc, 161)}</div>
                            <div className="rMax">Max people : <b>{item?.maxPeople}</b></div>
                            <div className="rPrice">${item?.price.toLocaleString()} per night</div>
                        </div>
                        <div className="rSelectRooms">
                            {item?.roomNumbers?.map((roomNumber) => (
                                <div className="room" key={roomNumber?._id}>
                                    <label>{roomNumber?.number}</label>
                                    <input type="checkbox" value={roomNumber?._id} onChange={handleSelect} disabled={!isAvailable(roomNumber)} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div className="rButtonWrapper">
                <button onClick={handleClick} className="rButton">Reserve Now</button>
            </div>
        </div>
    </div>
  )
}

export default Reserve