import RestroCard from "./RestroCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
  const [restuarantList, setRestaurantList] = useState([]);
  const [filteredRestaurantList, setFilteredRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch("/api/dapi/restaurants/list/v5?lat=18.6208&lng=73.8023&page_type=DESKTOP_WEB_LISTING");
    const json = await data.json();
    setRestaurantList(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurantList(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

  return restuarantList.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="flex-center filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              const resList = restuarantList.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()));
              setFilteredRestaurantList(resList);
            }}
          >
            Search
          </button>
        </div>
        <button
          className="filter-btn"
          onClick={() => {
            const resList = restuarantList.filter((res) => res.info.avgRating > 4.4);
            setFilteredRestaurantList(resList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="restro-container">
        {filteredRestaurantList.map((restaurant, idx) => {
          return <RestroCard {...restaurant?.info} key={restaurant?.info?.id} />;
        })}
      </div>
    </div>
  );
};

export default Body;
