import { CDN_URL } from "../utils/constants";

const RestroCard = (props) => {
  const { cloudinaryImageId, name, avgRating, cuisines, costForTwo, areaName, locality, sla } = props;

  return (
    <div className="restroCard">
      <div className="imageContainer">
        <img className="restroLogo" alt="restro-image" src={CDN_URL + cloudinaryImageId}></img>
        <div className="name-rating-container">
          <span className="restroName">{name}</span>
          <span className="restroRating">⭐ {avgRating}</span>
        </div>
      </div>
      <div className="restroDetailsContainer">
        <div className="cuisine-cost-container restro-details-wrapper">
          <span className="restroCuisine">{cuisines?.join(", ")}</span>
          <span className="restroCost">{costForTwo}</span>
        </div>
        <div className="address-container restro-details-wrapper">
          <span className="restroAddress">
            {locality}, {areaName}
          </span>
          <span className="restroDistance">{sla.lastMileTravel} km</span>
        </div>
      </div>
    </div>
  );
};

export default RestroCard;
