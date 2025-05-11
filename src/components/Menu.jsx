import React from "react";
import Logo from "../assets/images/logo.svg";
import PlayerVsCPUImage from "../assets/images/player-vs-cpu.svg";
import PlayerVsPlayerImage from "../assets/images/player-vs-player.svg";

function Menu({ onStartGame, onShowRules }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Background behind the menu */}
      <div className="absolute inset-0 bg-[#5C2DD5]"></div>

      {/* Menu Content */}
      <div className="bg-[#7945FF] py-4 px-10 rounded-4xl border-3 border-black z-10 shadow-[0px_10px_0px_black]">
        {/* Logo */}
        <div className="flex justify-center mb-8 py-8">
          <img src={Logo} alt="Logo" className="h-16 w-16" />
        </div>

        {/* Game Modes */}
        <div className="space-y-8 mb-10 space-x-12">
          <button
            onClick={() => onStartGame("player-vs-cpu")}
            className="w-full font-bold uppercase px-4 py-6 bg-[#FD6687] text-white rounded-2xl border-3 border-black hover:border-[#5C2DD5] shadow-[0px_10px_0px_black] hover:shadow-[0px_10px_0px_#5C2DD5] transition-all duration-200 ease-in-out text-xl flex items-center justify-between overflow-hidden"
          >
            <span>Player vs CPU</span>
            <img src={PlayerVsCPUImage} alt="Icon" className="mx-2" />
          </button>

          <button
            onClick={() => onStartGame("player-vs-player")}
            className="w-full font-bold uppercase px-4 py-6 bg-[#FFCE67] text-black rounded-2xl border-3 border-black hover:border-[#5C2DD5] shadow-[0px_10px_0px_black] hover:shadow-[0px_10px_0px_#5C2DD5] transition-all duration-200 ease-in-out text-xl flex items-center justify-between overflow-hidden"
          >
            <span>Player vs Player</span>
            <img src={PlayerVsPlayerImage} alt="Icon" className="mx-2" />
          </button>

          {/* Game Rules */}
          <button
            onClick={onShowRules}
            className="w-full font-bold uppercase px-4 py-8 bg-white text-black rounded-2xl border-3 border-black hover:border-[#5C2DD5] shadow-[0px_10px_0px_black] hover:shadow-[0px_10px_0px_#5C2DD5] transition-all duration-200 ease-in-out text-xl flex items-center justify-between overflow-hidden"
          >
            Game Rules
          </button>
        </div>
      </div>
    </div>
  );
}

export default Menu;
