import useFetch from "../../hooks/useFetch.js";
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const {data, loading, error, reFetch} = useFetch("https://hotel-and-go.onrender.com/api/hotels?featured=true&limit=4");

  return (
    <div className="fp">
      {loading ? (
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      ) : (
        <>
          {data?.map((item) => (
            <div className="fpItem" key={item._id}>
              <img
                src={item.photos[0]}
                alt=""
                className="fpImg"
              />
              <div className="fpText">
                <div className="fpInfo">
                  <span className="fpName">{item.name}</span>
                  <span className="fpCity">{item.city}</span>
                </div>
                <span className="fpPrice">Starting from ${item.cheapestPrice.toLocaleString()}</span>
                {item.rating && 
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
                }
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
