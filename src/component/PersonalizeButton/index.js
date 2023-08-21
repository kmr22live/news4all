import React, { useState } from "react";

export default function PersonalizeButton({
  category,
  setIsInitialCat,
  isInitialCat,
}) {
  const [isTick, setIsTick] = useState(false);

  const handleClick = () => {
    setIsInitialCat({ ...isInitialCat, [category]: !isInitialCat[category] });
  };
  return (
    <div className="personalize-select">
      <button
        id="btn"
        className={isInitialCat[category] ? "active" : ""}
        onClick={handleClick}
      >
        <p id="btnText">{category}</p>
        <div className="check-box">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
            <path fill="transparent" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>
      </button>
    </div>
  );
}
