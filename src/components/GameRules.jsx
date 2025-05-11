import React from "react";
import iconCheck from "../assets/images/icon-check.svg";

// GameRules component displays a modal with the game rules.
function GameRules({ onClose }) {
  // Prevent modal from closing when clicking inside the modal content area
  const handleModalClick = (e) => e.stopPropagation();

  return (
    // Overlay background that covers the full screen
    // Close the modal
    <div
      className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* Modal content container */}
      <div
        className="bg-white px-6 rounded-4xl border-3 border-black z-10 shadow-[0px_10px_0px_black] max-w-lg w-full"
        onClick={handleModalClick}
      >
        <h2 className="text-6xl text-center mt-10 mb-10 font-bold uppercase">
          Rules
        </h2>

        {/* Rules content section */}
        <div className="text-lg space-y-6 mb-16">
          <h3 className="text-[#7945FF] font-bold uppercase">Objective</h3>
          <p className="font-medium text-md leading-tight">
            Be the first player to connect 4 of the same colored discs in a row
            (either vertically, horizontally or diagonally).
          </p>
          <h3 className="text-[#7945FF] font-bold uppercase">How to play</h3>
          <div className="font-medium leading-tight">
            <p className="mb-3">
              <span className="mr-3 font-black">1.</span>Red goes first in the
              first game.
            </p>
            <p className="mb-3">
              <span className="mr-3 font-black">2.</span>Players must alternate
              turns, and only one disc can be dropped in each turn.
            </p>
            <p className="mb-3">
              <span className="mr-3 font-black">3.</span>The game ends when
              there is a 4-in-a-row or a stalemate.
            </p>
            <p className="mb-3">
              <span className="mr-3 font-black">4.</span>The starter of the
              previous game goes second on the next game.
            </p>
          </div>
        </div>

        {/* Close button (check icon) at the bottom center of the modal */}
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
          >
            <img src={iconCheck} alt="Close rules" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameRules;
