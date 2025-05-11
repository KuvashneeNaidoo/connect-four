import React from "react";

// Display the current starting player and a button to start the game
const PlayButton = ({ onPlay, currPlayer, gameMode }) => {
  return (
    <div className="w-[50%] md:w-[45%] h-28 mt-[-2%] bg-white flex items-center justify-center z-30 rounded-2xl border-3 border-black shadow-[0px_10px_0px_black]">
      <div className="text-lg font-bold uppercase text-black text-center">
        {/* Displays which player will start the game */}
        <div className="text-sm">
          {currPlayer === "R"
            ? "Player 1 starts"
            : gameMode === "player-vs-cpu"
            ? "CPU starts"
            : "Player 2 starts"}
        </div>
        <div className="text-4xl">Ready ?</div>
        {/* Button to start the game, triggers the onPlay callback */}
        <button
          onClick={onPlay}
          className="mt-1 text-sm font-bold uppercase bg-[#5C2DD5] text-white hover:bg-[#FD6687] transition px-10 py-2 rounded-full cursor-pointer"
        >
          Play
        </button>
      </div>
    </div>
  );
};

export default PlayButton;
