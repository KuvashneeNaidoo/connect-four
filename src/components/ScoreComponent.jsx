import React from "react";
import PlayerOne from "../assets/images/player-one.svg";
import PlayerTwo from "../assets/images/player-two.svg";
import You from "../assets/images/you.svg";
import CPU from "../assets/images/cpu.svg";

const ScoreComponent = ({ player1Score, player2Score, gameMode }) => {
  // Determine if current mode is Player vs CPU
  const isVsCPU = gameMode === "player-vs-cpu";

  return (
    <>
      {/* Mobile Screen Score Layout */}
      <div className="absolute -top-[90px] sm:-top-[100px] left-1/2 transform -translate-x-1/2 -translate-y-1/4 z-30 flex justify-between items-center gap-4 lg:hidden w-full max-w-[90%]">
        {/* Player 1 or 'You' Score Card */}
        <div className="bg-white text-black font-bold text-xl p-3 flex flex-col items-center border-2 border-black shadow-[0px_10px_0px_black] rounded-xl w-[200px] uppercase">
          <span className="text-lg">{isVsCPU ? "You" : "Player 1"}</span>
          <img
            src={isVsCPU ? You : PlayerOne}
            alt={isVsCPU ? "You" : "Player 1"}
            className="mb-2 translate-x-[-50%] absolute left-0"
          />
          <div className="text-3xl">{player1Score}</div>
        </div>

        {/* Player 2 or 'CPU' Score Card */}
        <div className="bg-white text-black font-bold text-xl p-3 flex flex-col items-center border-2 border-black shadow-[0px_10px_0px_black] rounded-xl w-[200px] uppercase">
          <span className="text-lg">{isVsCPU ? "CPU" : "Player 2"}</span>
          <img
            src={isVsCPU ? CPU : PlayerTwo}
            alt={isVsCPU ? "CPU" : "Player 2"}
            className="mb-2 translate-x-[60%] absolute right-0"
          />
          <div className="text-3xl">{player2Score}</div>
        </div>
      </div>

      {/* Desktop Screen Layout - Player 1 or 'You' on the Left */}
      <div className="absolute top-[30%] left-[-28%] lg:left-[-35%] z-30 hidden lg:flex flex-col items-start">
        <div className="bg-white text-black font-bold text-xl p-4 flex flex-col items-center justify-center rounded-2xl border-3 border-black shadow-[0px_10px_0px_black] h-[160px] w-[150px] uppercase">
          <img
            src={isVsCPU ? You : PlayerOne}
            alt={isVsCPU ? "You" : "Player 1"}
            className="absolute -top-8 left-1/2 -translate-x-1/2"
          />
          {isVsCPU ? "You" : "Player 1"}
          <div className="mt-2 text-6xl">{player1Score}</div>
        </div>
      </div>

      {/* Desktop Screen Layout - Player 2 or 'CPU' on the Right */}
      <div className="absolute top-[30%] right-[-28%] lg:right-[-35%] z-30 hidden lg:flex flex-col items-end">
        <div className="bg-white text-black font-bold text-xl p-4 flex flex-col items-center justify-center rounded-2xl border-3 border-black shadow-[0px_10px_0px_black] h-[160px] w-[150px] uppercase">
          <img
            src={isVsCPU ? CPU : PlayerTwo}
            alt={isVsCPU ? "CPU" : "Player 2"}
            className="absolute -top-8 left-1/2 -translate-x-1/2"
          />
          {isVsCPU ? "CPU" : "Player 2"}
          <div className="mt-2 text-6xl">{player2Score}</div>
        </div>
      </div>
    </>
  );
};

export default ScoreComponent;
