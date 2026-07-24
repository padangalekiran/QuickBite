import React from "react";
import ReactDOM from "react-dom/client";

const Header = () => {
  return (
    <div className="header">
      <div className="logoContainer">
        <img className="logo" src="https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png" />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About us</li>
          <li>Contact us</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

const RestroCard = () => {
  return (
    <div className="restroCard">
      <div className="imageContainer">
        <img
          className="restroLogo"
          alt="restro-image"
          src="https://dineout-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_600,h_400/DINEOUT_ALL_RESTAURANTS/IMAGES/RESTAURANT_IMAGE_SERVICE/2024/8/20/edf0905c-2fd7-4254-b4f5-3539708cef97_20240820T140101897.jpg"
        ></img>
        <div className="name-rating-container">
          <span className="restroName">House of Candy</span>
          <span className="restroRating">⭐ 4.3</span>
        </div>
      </div>
      <div className="restroDetailsContainer">
        <div className="cuisine-cost-container restro-details-wrapper">
          <span className="restroCuisine">Bakery, Desserts</span>
          <span className="restroCost">₹500 for two</span>
        </div>
        <div className="address-container restro-details-wrapper">
          <span className="restroAddress">Phoenix Avenue of Stars, Viman Nagar, Pune</span>
          <span className="restroDistance">9.3 km</span>
        </div>
      </div>
    </div>
  );
};

const Body = () => {
  return (
    <div className="body">
      <div className="search">Search</div>
      <div className="restro-container">
        <RestroCard />
      </div>
    </div>
  );
};

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Body />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayout />);
