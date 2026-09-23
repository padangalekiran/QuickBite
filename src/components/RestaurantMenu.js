import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { CDN_URL, DISH_URL, MENU_API } from "../utils/constants";
import { VegIcon, NonVegIcon } from "../utils/Icons";
import { useParams } from "react-router-dom";

const RestaurantMenu = () => {
  const [resInfo, setResInfo] = useState(null);
  const { resId } = useParams();
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    fetchMenu();
  }, []);

  // fetch restaurant menu
  const fetchMenu = async () => {
    const data = await fetch(MENU_API + resId);
    const json = await data.json();
    setResInfo(json.data);
  };

  // toggle sections
  const setToggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // load shimmer UI if no data available
  if (resInfo === null) return <Shimmer />;

  const restaurantInfoCard = resInfo?.cards?.find((c) => c?.card?.card?.["@type"]?.includes("presentation.food.v2.Restaurant"));

  const { name, cuisines, cloudinaryImageId, avgRating, totalRatingsString, costForTwoMessage, timingsInfo, areaName, sla } =
    restaurantInfoCard?.card?.card?.info || {};

  const groupedCardEntry = resInfo?.cards?.find((c) => c?.groupedCard);

  const regularCards = groupedCardEntry?.groupedCard?.cardGroupMap?.REGULAR?.cards || [];

  // Build a nested structure: top-level categories, each with its own sub-sections.
  // Flat ItemCategory -> one section, treated as its own "top-level with 1 sub-section".
  // NestedItemCategory -> parent title + array of sub-categories.
  const menuCategories = regularCards.reduce((acc, cardWrapper) => {
    const card = cardWrapper?.card?.card;

    if (!card) return acc;

    const type = card["@type"] || "";

    if (type.includes("NestedItemCategory")) {
      const subSections = (card.categories || [])
        .filter((sub) => sub.itemCards?.length)
        .map((sub) => ({
          key: sub.categoryId || `${card.categoryId}-${sub.title}`,
          title: sub.title,
          itemCards: sub.itemCards
        }));
      // if have subsections
      if (subSections.length) {
        acc.push({
          key: card.categoryId || card.title,
          title: card.title,
          subSections
        });
      }
    } else if (type.includes("ItemCategory") && card.itemCards?.length) {
      // Flat category: wrap it as a single sub-section under its own title
      acc.push({
        key: card.categoryId || card.title,
        title: card.title,
        subSections: [
          {
            key: card.categoryId || card.title,
            title: card.title,
            itemCards: card.itemCards
          }
        ]
      });
    }
    return acc;
  }, []);

  return (
    <div className="menuPage">
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
            <span className="subText">{timingsInfo?.status}</span>
            <span className="subText dot-separator">•</span>
            <span className="subText">{timingsInfo?.message}</span>
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

      {/* Top-level categories: Starters, Biryani, Main Course, etc. */}
      {menuCategories.map((topCategory) => (
        <div className="menuWrapper" key={topCategory.key}>
          <h2 className="categoryTitle">{topCategory.title}</h2>
          {/* Collapsible sub-sections, e.g. Snacks veg, Egg Snacks, etc.. */}
          {topCategory.subSections.map((sub) => {
            const isOpen = !!openSections[sub.key];
            return (
              <div className="accordionSection" key={sub.key}>
                <button className="accordionHeader" onClick={() => setToggleSection(sub.key)}>
                  <span className="accordionTitle">
                    {sub.title} ({sub?.itemCards?.length})
                  </span>
                  <span className={`accordionArrow ${isOpen ? "open" : ""}`}></span>
                </button>

                {isOpen && (
                  <div className="menuList">
                    {sub.itemCards?.map((item) => (
                      <div className="dish-item" key={item.card.info.id}>
                        <div className="dish">
                          <div className="dish-details">
                            <div className="flex-center veg-nonveg-icon">{item.card.info.isVeg ? <VegIcon /> : <NonVegIcon />}</div>
                            <div className="dish-name">{item.card.info.name}</div>
                            <div className="flex-center dish-price">₹ {(item.card.info.price || item.card.info.defaultPrice) / 100}</div>
                            <div className="dish-rating">
                              {item.card.info.ratings?.aggregatedRating?.rating && (
                                <>
                                  ★ {item.card.info.ratings.aggregatedRating.rating} ({item.card.info.ratings.aggregatedRating.ratingCountV2})
                                </>
                              )}
                            </div>
                            <div className="textStyle dish-description">{item.card.info.description}</div>
                          </div>
                          <div className="dish-image-wrapper">
                            {item.card.info.imageId && (
                              <div className="dish-image">
                                <img src={DISH_URL + item.card.info.imageId} alt={item.card.info.name}></img>
                              </div>
                            )}
                            <div className="flex-center button-container">
                              <div className="flex-center add-btn">Add</div>
                              <div className="customisable">Customisable</div>
                            </div>
                          </div>
                        </div>
                        <div className="horizontalSeparator"></div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;
