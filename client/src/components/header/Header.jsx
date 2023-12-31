import {
  faBed, 
  faCar,
  faPlane,
  faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import {LiaBedSolid} from "react-icons/lia"
import {BsCalendar3} from "react-icons/bs"
import {GoPerson} from "react-icons/go"
import {AiOutlineMinus} from "react-icons/ai"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./header.css";
import { DateRange } from "react-date-range";
import { useContext, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };

  function handleLogin() {
    navigate("/login")
  }

  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <div className="headerListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="headerComingSoon">
            <div className="headerNavCategory">
              <div className="headerListItem">
                <FontAwesomeIcon icon={faPlane} />
                <span>Flights</span>
              </div>
              <div className="headerListItem">
                <FontAwesomeIcon icon={faCar} />
                <span>Car rentals</span>
              </div>
              <div className="headerListItem">
                <FontAwesomeIcon icon={faBed} />
                <span>Attractions</span>
              </div>
              <div className="headerListItem">
                <FontAwesomeIcon icon={faTaxi} />
                <span>Airport taxis</span>
              </div>
            </div>
            <div className="headerNavCategoryComment">
              <span>New features coming soon !</span>
            </div>
          </div>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">
            Find your next stay
            </h1>
            <p className="headerDesc">
            Search low prices on hotels, homes and much more...
            </p>
            {!user && <button className="headerBtn btn2" onClick={handleLogin}>Sign in / Register</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <LiaBedSolid className="headerIcon" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value.toLowerCase())}
                />
              </div>
              <div className="headerSearchItem">
                <BsCalendar3 className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >
                  {dates[0].startDate === null ? `${format(dates[0].startDate, "MM/dd/yyyy")}` : "Check-in date"  } &#8212; {dates[0].endDate === null ? `${format(dates[0].endDate, "MM/dd/yyyy")}` : "Check-out date" }
                </span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                <GoPerson className="headerIcon" />
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{`${options.adult} adult`} &#8226; {`${options.children} children`} &#8226; {`${options.room} room`}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Room</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.room <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.room}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("room", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <button className="headerBtn" onClick={handleSearch}>
                  Search
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
