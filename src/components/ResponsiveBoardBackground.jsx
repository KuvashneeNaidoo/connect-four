import React from "react";
import BlackBoard from "../assets/images/board-layer-black-large.svg";
import WhiteBoard from "../assets/images/board-layer-white-large.svg";
import SmallBlackBoard from "../assets/images/board-layer-black-small.svg";
import SmallWhiteBoard from "../assets/images/board-layer-white-small.svg";

// Layered board background images that switch based on screen size
const ResponsiveBoardBackground = () => {
  return (
    <div className="board-container relative mx-auto">
      {/* Large black board image - shown only on screens wider than 350px */}
      <img
        src={BlackBoard}
        alt="Black Game Board"
        className="absolute top-0 left-0 z-10 hide-below-350"
      />

      {/* Small black board image - shown only on screens 350px or smaller */}
      <img
        src={SmallBlackBoard}
        alt="Small Black Game Board"
        className="absolute top-0 left-0 z-10 show-below-350"
      />

      {/* Large white board overlay image - shown only on screens wider than 350px */}
      <img
        src={WhiteBoard}
        alt="White Game Board"
        className="absolute -top-1 left-0 z-20 hide-below-350"
      />

      {/* Small white board overlay image - shown only on screens 350px or smaller*/}
      <img
        src={SmallWhiteBoard}
        alt="Small White Game Board"
        className="absolute top-0 left-0 z-20 show-below-350"
      />
    </div>
  );
};

export default ResponsiveBoardBackground;
