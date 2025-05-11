import React from "react";

// Display the result of the game and a button to start a new game
const PlayAgainButton = ({ onPlayAgain, winner }) => {
  return (
    <div className="w-[50%] md:w-[45%] h-28 mt-[-2%] bg-white flex items-center justify-center z-30 rounded-2xl border-3 border-black shadow-[0px_10px_0px_black]">
      <div className="text-lg font-bold uppercase text-black text-center">
        {/* Display "Game Over" or the winner's name */}
        <div className="text-sm">
          {winner === "Draw" ? "Game Over" : `${winner}`}
        </div>
        {/* Display "Draw" or "wins" based on the result */}
        <div className="text-4xl">{winner === "Draw" ? "Draw" : "wins"}</div>
        <button
          onClick={onPlayAgain}
          className="mt-1 text-xs font-bold uppercase bg-[#5C2DD5] text-white hover:bg-[#FD6687] transition px-10 py-2 rounded-full cursor-pointer"
        >
          Play Again?
        </button>
      </div>
    </div>
  );
};

export default PlayAgainButton;
