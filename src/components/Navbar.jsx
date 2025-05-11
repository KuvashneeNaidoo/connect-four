import React, { useState } from "react";
import Logo from "../assets/images/logo.svg";

const Navbar = ({ onRestart, onQuit, onOpenMenu }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Controls visibility of menu when game is paused

  // Handle opening the menu when paused
  const handleOpenMenu = () => {
    setIsModalOpen(true);
    onOpenMenu && onOpenMenu();
  };

  // Resume the game (close modal)
  const handleContinueGame = () => {
    setIsModalOpen(false);
  };

  // Quit the game and close modal
  const handleQuit = () => {
    setIsModalOpen(false);
    onQuit();
  };

  // Prevent modal from closing when clicking inside it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  // Close modal when clicking on overlay
  const handleOverlayClick = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-[#7945ff] text-white flex justify-center mb-4 lg:mb-0 md:mb-0">
      {/* Centered navbar container */}
      <div className="w-[600px] h-20 relative flex items-center justify-between">
        {/* Left: Menu button */}
        <div className="absolute left-8 h-full flex items-center">
          <button
            onClick={handleOpenMenu}
            className="font-bold uppercase w-24 h-10 bg-[#5C2DD5] text-white px-4 rounded-full hover:bg-[#FD6687] transition cursor-pointer"
          >
            Menu
          </button>
        </div>

        {/* Center: Game Logo */}
        <img src={Logo} alt="Logo" className="h-10 flex-grow mx-auto" />

        {/* Right: Restart button */}
        <div className="absolute right-8 h-full flex items-center">
          <button
            onClick={onRestart}
            className="font-bold uppercase w-24 h-10 bg-[#5C2DD5] text-white px-4 rounded-full hover:bg-[#FD6687] transition cursor-pointer"
          >
            Restart
          </button>
        </div>
      </div>

      {/* Background overlay when modal is open */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black opacity-70 z-40"
          onClick={handleOverlayClick}
        ></div>
      )}

      {/* Pause menu modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleOverlayClick}
        >
          <div
            className="bg-[#7945FF] font-bold uppercase mb-10 px-10 rounded-4xl border-3 border-black z-10 shadow-[0px_10px_0px_black] max-w-lg w-full"
            onClick={handleModalClick}
          >
            {/* Pause title */}
            <h2 className="text-5xl text-center text-white m-10">Pause</h2>

            {/* Modal options */}
            <div className="space-y-8">
              <button
                onClick={handleContinueGame}
                className="w-full font-bold uppercase px-6 py-5 bg-white text-black rounded-2xl border-3 border-black hover:border-[#5C2DD5] shadow-[0px_10px_0px_black] hover:shadow-[0px_10px_0px_#5C2DD5] transition-all duration-200 ease-in-out text-2xl flex justify-center"
              >
                Continue
              </button>

              <button
                onClick={() => {
                  onRestart();
                  setIsModalOpen(false);
                }}
                className="w-full font-bold uppercase px-6 py-5 bg-white text-black rounded-2xl border-3 border-black hover:border-[#5C2DD5] shadow-[0px_10px_0px_black] hover:shadow-[0px_10px_0px_#5C2DD5] transition-all duration-200 ease-in-out text-2xl flex items-center justify-center"
              >
                Restart
              </button>

              <button
                onClick={handleQuit}
                className="w-full font-bold uppercase px-6 py-5 mb-8 bg-[#FD6687] text-white rounded-2xl border-3 border-black hover:border-[#5C2DD5] shadow-[0px_10px_0px_black] hover:shadow-[0px_10px_0px_#5C2DD5] transition-all duration-200 ease-in-out text-2xl flex items-center justify-center"
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
