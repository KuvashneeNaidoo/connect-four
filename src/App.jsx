import React, { useState } from "react";
import GameBoard from "./components/GameBoard";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import GameRules from "./components/GameRules";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameMode, setGameMode] = useState("");
  const [gameKey, setGameKey] = useState(0);
  const [showRules, setShowRules] = useState(false);

  // Start the game with selected mode
  const handleStartGame = (mode) => {
    setGameMode(mode);
    setGameStarted(true);
  };

  // Show rules modal
  const handleShowRules = () => {
    setShowRules(true);
  };

  // Close rules modal
  const handleCloseRules = () => {
    setShowRules(false);
  };

  // Restart game by updating gameKey to remount GameBoard
  const resetGame = () => {
    setGameKey((prev) => prev + 1);
  };

  // Quit game and return to main menu
  const quitGame = () => {
    setGameStarted(false);
    setGameMode("");
    setGameKey(0);
  };

  return (
    <div className="App min-h-screen bg-[#7945ff] flex flex-col items-center justify-center">
      {gameStarted ? (
        // Game UI
        <>
          <Navbar onRestart={resetGame} onQuit={quitGame} />
          <GameBoard key={gameKey} gameMode={gameMode} />
        </>
      ) : (
        // Menu UI
        <>
          <Menu onStartGame={handleStartGame} onShowRules={handleShowRules} />
          {showRules && <GameRules onClose={handleCloseRules} />}
        </>
      )}
    </div>
  );
}

export default App;
