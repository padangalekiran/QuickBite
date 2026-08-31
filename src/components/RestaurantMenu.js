import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { CDN_URL } from "../utils/constants";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    console.log("useEffect called in resturant menu");
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const data = await fetch(
      "/api/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.6653014&lng=73.7970946&restaurantId=203925&catalog_qa=undefined&submitAction=ENTER"
    );
    const json = await data.json();

    setResInfo(json);
  };

  const { name, cuisines, cloudinaryImageId, avgRating, totalRatingsString, costForTwoMessage, timingsInfo, nearestOutletNudge } =
    resInfo?.data?.cards[2]?.card?.card?.info || {};

  //   const categories = resInfo?.data?.cards[1]?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  function getDeliveryRange(minutes) {
    const lower = Math.floor(minutes / 5) * 5;
    const upper = lower + 5;
    return `${lower}-${upper}`;
  }

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
              <div className="subText outlet">{nearestOutletNudge?.nearestOutletInfo?.siblingOutlet?.areaName}</div>
            </div>
            <div className="subText deliveryTime">{getDeliveryRange(nearestOutletNudge?.nearestOutletInfo?.siblingOutlet?.sla?.deliveryTime)}</div>
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
