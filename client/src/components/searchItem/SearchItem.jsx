import "./searchItem.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

const SearchItem = ({item}) => {

  function TextLimit(text, count){
    return text.slice(0, count) + (text.length > count ? "..." : "");
}

  return (
    <div className="searchItem">
      <img
        src={item.photos[0]}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance"><FontAwesomeIcon icon={faLocationDot} className="locationIcon" />&#160;&#160;{item.distance}km from center</span>
        { item.taxi ? <span className="siTaxiOp">Free airport taxi</span> : ""}
        
        <span className="siSubtitle">
          { item.subtitle ? item.subtitle : "Studio Apartment with Air conditioning"}
        </span>
        <span className="siFeatures">
          {TextLimit(item.desc, 150)}
        </span>
        {
          item.cancellation ? 
          <div>
            <span className="siCancelOp">Free cancellation </span>
            <span className="siCancelOpSubtitle">
              You can cancel later, so lock in this great price today!
            </span>
          </div> :
        ""
        }
      </div>
      <div className="siDetails">
        {item.rating ?
        <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div> :
        " "
        }
        <div className="siDetailTexts">
          <div className="siPriceWrapper">
            <span className="siPrice">${item.cheapestPrice.toLocaleString()}</span>
            <span className="siTaxOp">Includes taxes and fees</span>
          </div>
          <Link to={`/hotels/${item._id}`}>
            <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
