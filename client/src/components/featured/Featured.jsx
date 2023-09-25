import useFetch from "../../hooks/useFetch.js";
import "./featured.css";

const Featured = () => {
  const {data, loading, error, reFetch} = useFetch("https://hotel-and-go.onrender.com/api/hotels/countByCity?cities=berlin,madrid,london");

  return (
    <div className="featured">
      {loading ? (
        <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://images.unsplash.com/photo-1509136561942-7d8663edaaa2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80"
              alt="Berlin"
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Berlin</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>
        
        <div className="featuredItem">
          <img
            src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Madrid"
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>Madrid</h1>
            <h2>{data[1]} properties</h2>
          </div>
        </div>
        <div className="featuredItem">
          <img
            src="https://images.unsplash.com/photo-1486299267070-83823f5448dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
            alt="London"
            className="featuredImg"
          />
          <div className="featuredTitles">
            <h1>London</h1>
            <h2>{data[2]} properties</h2>
          </div>
        </div>
      </>
      )}
    </div>
  );
};

export default Featured;
