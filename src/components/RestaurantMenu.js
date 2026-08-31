import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { CDN_URL, MENU_API } from "../utils/constants";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();

  useEffect(() => {
    console.log("useEffect called in resturant menu");
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();

    setResInfo(json);
  };

  const { name, cuisines, cloudinaryImageId, avgRating, totalRatingsString, costForTwoMessage, timingsInfo, areaName, sla } =
    resInfo?.data?.cards[2]?.card?.card?.info || {};

  //   const categories = resInfo?.data?.cards[1]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  return resInfo === null ? (
    <Shimmer />
  ) : (
    <div className="menu">
      <div style={{ marginLeft: 16 + "px" }}>
        <h1>{name}</h1>
      </div>
      <div className="restaurantImage">
        <img alt="Restaurant Image cover" className="" src={CDN_URL + cloudinaryImageId} />
      </div>
      <div className="restaurantDetailsWrapper">
        <div className="rating_cost_wrapper">
          <div className="rating">
            <span className="rating-badge"> ★</span>
            <span className="textStyle bold">
              {avgRating} ({totalRatingsString})
            </span>
          </div>
          <span className="textStyle dot-separator">•</span>
          <div className="textStyle bold costForTwo"> {costForTwoMessage}</div>
        </div>
        <div className="cuisines_wrapper">
          <span className="subText cuisines">{cuisines?.join(", ")}</span>
        </div>
        <div className="status_time_wrapper">
          <button className="flex-center">
            <span className="subText">{timingsInfo.status}</span>
            <span className="subText dot-separator">•</span>
            <span className="subText">{timingsInfo.message}</span>
          </button>
        </div>
        <div className="divider"></div>
        <div className="flex-center location_wrapper">
          <div className="flex-center graphLine">
            <div className="startDot"></div>
            <div className="verticalLine"></div>
            <div className="endDot"></div>
          </div>
          <div className="location">
            <div className="flex-center outlet_wrapper">
              <div className="subText title">Outlet</div>
              <div className="subText outlet">{areaName}</div>
            </div>
            <div className="subText deliveryTime">{sla?.slaString}</div>
          </div>
        </div>
      </div>

      {/* {categories.map((category) => (
        <div key={category?.card?.card?.title}>
          <h2>{category?.card?.card?.title}</h2>
          <ul>
            {category?.card?.card?.itemCards?.map((item) => (
              <li key={item.card.info.id}>
                {item.card.info.name} - ₹{item.card.info.price / 100}
              </li>
            ))}
          </ul>
        </div>
      ))} */}
    </div>
  );
};

export default RestaurantMenu;
