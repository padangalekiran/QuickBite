import RestroCard from "./RestroCard";
import restroList from "../utils/mockData";
import { useEffect, useState } from "react";

const Body = () => {
  const [restuarantList, setRestaurantList] = useState(restroList);

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = () => {
  //   const data = fetch();
  // };

  return (
    <div className="body">
      <div className="filter">
        <button
          className="filter-btn"
          onClick={() => {
            const resList = restroList.filter((res) => res.info.avgRating > 4.4);
            setRestaurantList(resList);
          }}
        >
          Top Rated Restaurants
        </button>
      </div>
      <div className="restro-container">
        {restuarantList.map((restaurant, idx) => {
          return <RestroCard {...restaurant?.info} key={restaurant?.info?.id} />;
        })}
      </div>
    </div>
  );
};

export default Body;
