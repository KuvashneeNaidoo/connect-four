import React, { useState, useEffect } from "react";
import ResponsiveBoardBackground from "./ResponsiveBoardBackground";
import SmallRedCounter from "../assets/images/counter-red-small.svg";
import SmallYellowCounter from "../assets/images/counter-yellow-small.svg";
import LargeRedCounter from "../assets/images/counter-red-large.svg";
import LargeYellowCounter from "../assets/images/counter-yellow-large.svg";
import PlayButton from "./PlayButton";
import ScoreComponent from "./ScoreComponent";
import TimerPlayer1 from "../assets/images/turn-background-red.svg";
import TimerPlayer2 from "../assets/images/turn-background-yellow.svg";
import PlayAgainButton from "./PlayAgainButton";
import RedMarker from "../assets/images/marker-red.svg";
import YellowMarker from "../assets/images/marker-yellow.svg";

// Constants for board dimensions
const ROWS = 6;
const COLS = 7;

const GameBoard = ({ gameMode }) => {
  const [board, setBoard] = useState(
    // Initialize an empty board with 6 rows and 7 columns
    Array(ROWS)
      .fill(null)
      .map(() => Array(COLS).fill(""))
  );
  const [currPlayer, setCurrPlayer] = useState("R");
  const [currColumns, setCurrColumns] = useState(Array(COLS).fill(ROWS - 1));
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [timer, setTimer] = useState(15);
  const [hoveredCol, setHoveredCol] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [lastStarter, setLastStarter] = useState(null);

  // Timer handler
  useEffect(() => {
    // Stop timer if the game isn't started or is over
    if (!gameStarted || gameOver) return;

    // Run the timer every second
    const interval = setInterval(() => {
      setTimer((prev) => {
        // If timer reaches 1, switch players
        if (prev === 1) {
          const nextPlayer = currPlayer === "R" ? "Y" : "R";

          // Player 1's turn (random move)
          if (currPlayer === "R") {
            const validCols = currColumns
              .map((row, idx) => (row >= 0 ? idx : null))
              .filter((col) => col !== null);

            const randomCol =
              validCols[Math.floor(Math.random() * validCols.length)];

            handleClick(randomCol);
            setCurrPlayer(nextPlayer); // Switch to Player 2
            setTimer(15); // Reset the timer
          } else if (currPlayer === "Y") {
            // Player 2's turn
            if (gameMode === "player-vs-cpu") {
              setCurrPlayer(nextPlayer); // Switch to Player 1
              setTimer(15); // Reset the timer

              // CPU move with a 1-second delay
              setTimeout(() => {
                cpuMove();
              }, 1000);
            } else {
              // Player vs Player mode
              const validCols = currColumns
                .map((row, idx) => (row >= 0 ? idx : null))
                .filter((col) => col !== null);

              const randomCol =
                validCols[Math.floor(Math.random() * validCols.length)];

              // Player 2 move with a 1-second delay
              setTimeout(() => {
                handleClick(randomCol);
                setCurrPlayer(nextPlayer); // Switch to Player 1
                setTimer(15); // Reset the timer
              }, 1000);
            }
          }

          return 15; // Reset the timer for the next turn
        }
        return prev - 1; // Decrease timer by 1 second
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on component unmount
  });

  useEffect(() => {
    // If Player 2's turn (Yellow) and the game is not over
    if (
      gameStarted &&
      gameMode === "player-vs-cpu" &&
      currPlayer === "Y" &&
      !gameOver
    ) {
      // Delay the CPU move by 1 second
      const timeout = setTimeout(() => {
        cpuMove();
      }, 1000);
      // Clean up timeout on component unmount
      return () => clearTimeout(timeout);
    }
  });

  const isWinningMove = (simBoard, row, col, player) => {
    // Directions to check (horizontal, vertical, diagonal)
    const directions = [
      [0, 1], // Horizontal
      [1, 0], // Vertical
      [1, 1], // Diagonal (bottom-right)
      [-1, 1], // Diagonal (top-right)
    ];

    // Check each direction for a winning move
    for (let [dr, dc] of directions) {
      let count = 1;

      // Check in the positive direction
      for (let d = 1; d < 4; d++) {
        const nr = row + dr * d;
        const nc = col + dc * d;
        // If out of bounds or not the player's piece, break the loop
        if (
          nr < 0 ||
          nr >= ROWS ||
          nc < 0 ||
          nc >= COLS ||
          simBoard[nr][nc] !== player
        )
          break;
        count++; // Increment count if the piece matches
      }

      // Check in the opposite direction
      for (let d = 1; d < 4; d++) {
        const nr = row - dr * d;
        const nc = col - dc * d;
        // If out of bounds or not the player's piece, break the loop
        if (
          nr < 0 ||
          nr >= ROWS ||
          nc < 0 ||
          nc >= COLS ||
          simBoard[nr][nc] !== player
        )
          break;
        count++; // Increment count if the piece matches
      }

      // If 4 connected pieces are found, it's a winning move
      if (count >= 4) return true;
    }

    return false; // No winning move found
  };

  const cpuMove = () => {
    // Get the list of valid columns where a move can be made
    let validCols = currColumns
      .map((row, idx) => (row >= 0 ? idx : null))
      .filter((col) => col !== null);
    if (validCols.length === 0) return; // If no valid moves left, exit

    // Check if CPU can win by placing a piece in any column
    for (let col of validCols) {
      const row = currColumns[col];
      const simBoard = board.map((r) => [...r]);
      simBoard[row][col] = "Y";
      if (isWinningMove(simBoard, row, col, "Y")) {
        handleClick(col, true);
        return;
      }
    }

    // Check if Player 1 can win, and block their move
    for (let col of validCols) {
      const row = currColumns[col];
      const simBoard = board.map((r) => [...r]);
      simBoard[row][col] = "R";
      if (isWinningMove(simBoard, row, col, "R")) {
        handleClick(col, true);
        return;
      }
    }

    // If no winning or blocking move, pick a random column
    const randomCol = validCols[Math.floor(Math.random() * validCols.length)];
    handleClick(randomCol, true);
  };

  const handleClick = (col, isCPU = false) => {
    // Check if the game has not started, is over, or if the column is full
    if (!gameStarted || gameOver || currColumns[col] < 0) return;

    // Prevent Player 2 from making a move if it's the CPU's turn
    if (!isCPU && gameMode === "player-vs-cpu" && currPlayer === "Y") return;

    // Get the row where the piece will be placed
    const row = currColumns[col];

    // Create a copy of the board and place the current player's piece
    const newBoard = board.map((r) => [...r]);
    newBoard[row][col] = currPlayer;

    // Update the column tracker
    const updatedColumns = [...currColumns];
    updatedColumns[col] -= 1;

    // Update the game state
    setBoard(newBoard);
    setCurrColumns(updatedColumns);
    checkWinner(newBoard, row, col, currPlayer);
    setCurrPlayer((prev) => (prev === "R" ? "Y" : "R"));
    setTimer(15);
  };

  const checkWinner = (board, r, c, player) => {
    // Directions to check for a winning line (horizontal, vertical, and diagonal)
    const directions = [
      [0, 1], // Horizontal
      [1, 0], // Vertical
      [1, 1], // Diagonal (down-right)
      [-1, 1], // Diagonal (up-right)
    ];

    // Check each direction for a possible winning line
    for (let [dr, dc] of directions) {
      let count = 1;
      const cells = [[r, c]]; // Track the winning cells

      // Check one direction (positive)
      for (let d = 1; d < 4; d++) {
        const nr = r + dr * d;
        const nc = c + dc * d;
        // If out of bounds or not the same player, break
        if (
          nr < 0 ||
          nr >= ROWS ||
          nc < 0 ||
          nc >= COLS ||
          board[nr][nc] !== player
        )
          break;
        count++;
        cells.push([nr, nc]);
      }

      // Check the opposite direction (negative)
      for (let d = 1; d < 4; d++) {
        const nr = r - dr * d;
        const nc = c - dc * d;
        // If out of bounds or not the same player, break
        if (
          nr < 0 ||
          nr >= ROWS ||
          nc < 0 ||
          nc >= COLS ||
          board[nr][nc] !== player
        )
          break;
        count++;
        cells.push([nr, nc]);
      }

      // If a winning line is found (4 connected cells), update game state
      if (count >= 4) {
        setWinningCells(cells);
        setGameOver(true);
        setWinner(player === "R" ? "Player 1" : "Player 2");
        if (player === "R") setPlayer1Score((prev) => prev + 1);
        else setPlayer2Score((prev) => prev + 1);
        return;
      }
    }

    // Enf game with a draw if the board is full and no empty cells are left
    const isDraw = board.every((row) => row.every((cell) => cell !== ""));
    if (isDraw) {
      setGameOver(true);
      setWinner("Draw");
    }
  };

  const startGame = () => {
    // Start the game and reset necessary states
    setGameStarted(true);
    setGameOver(false);
    setWinner("");

    // Reset the board with empty cells
    setBoard(
      Array(ROWS)
        .fill(null)
        .map(() => Array(COLS).fill(""))
    );
    // Reset column tracker (topmost empty row for each column)
    setCurrColumns(Array(COLS).fill(ROWS - 1));

    // Clear any previous winning cells
    setWinningCells([]);

    // Alternate the starting player
    let starter;
    if (lastStarter === "R") {
      starter = "Y";
    } else {
      starter = "R";
    }
    setCurrPlayer(starter);
    setLastStarter(starter);

    // If CPU starts, delay its move by 1 second
    if (gameMode === "player-vs-cpu" && starter === "Y") {
      setTimeout(() => {
        cpuMove();
      }, 1000);
    }

    // Start the timer
    setTimer(15);
  };

  // Return different footer colors based on the winner
  const getFooterColor = () => {
    if (winner === "Player 1") return "bg-[#FD6687]";
    if (winner === "Player 2") return "bg-[#FFCE67]";
    if (winner === "Draw") return "bg-[#5C2DD5]";
    return "bg-[#5C2DD5]"; // Default color when game starts
  };

  return (
    <div className=" flex items-center justify-center bg-[#7945ff] p-0 flex-col">
      {/* Game board container */}
      <div className="relative w-[85vw] max-w-[550px] aspect-[7/6] max-h-[90vh] mt-24 sm:mt-28 md:mt-30 lg:mt-6">
        {/* Renders the board background based on screen size */}
        <ResponsiveBoardBackground />

        {/* Score display for both players */}
        <ScoreComponent
          player1Score={player1Score}
          player2Score={player2Score}
          isPlayerOne={true}
          gameMode={gameMode}
        />

        {/* Game board grid with rows and columns */}
        <div className="absolute inset-0 grid grid-cols-7 grid-rows-6 z-10 sm:gap-0 sm:m-2 m-1 min-h-[40px] sm:min-h-[60px]">
          {board.map((row, rIdx) =>
            row.map((cell, cIdx) => (
              <div
                key={`${rIdx}-${cIdx}`}
                className="relative flex items-center justify-center h-full"
              >
                {/* Red token */}
                {cell === "R" && (
                  <>
                    <img
                      src={SmallRedCounter}
                      alt="Red"
                      className="block sm:hidden w-5/6 h-5/6"
                    />
                    <img
                      src={LargeRedCounter}
                      alt="Red"
                      className="hidden sm:block w-5/6 h-5/6"
                    />
                  </>
                )}
                {/* Yellow token */}
                {cell === "Y" && (
                  <>
                    <img
                      src={SmallYellowCounter}
                      alt="Yellow"
                      className="block sm:hidden w-5/6 h-5/6"
                    />
                    <img
                      src={LargeYellowCounter}
                      alt="Yellow"
                      className="hidden sm:block w-5/6 h-5/6"
                    />
                  </>
                )}

                {/* White dot overlay for winning cells */}
                {winningCells.some(([r, c]) => r === rIdx && c === cIdx) && (
                  <div
                    key={`${rIdx}-${cIdx}-dot`} // Ensure a unique key for each dot
                    className="absolute w-4 h-4 sm:w-6 sm:h-6 border-4 sm:border-5 border-white rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  ></div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Hover markers that appear above the grid on desktop */}
        <div className="hidden lg:grid absolute -top-[40px] lg:-top-[11%] left-0 right-0 z-20 grid-cols-7 h-[10%] pointer-events-none">
          {Array(COLS)
            .fill(null)
            .map((_, colIdx) => (
              <div key={colIdx} className="flex justify-center items-center">
                {hoveredCol === colIdx && (
                  <img
                    src={currPlayer === "R" ? RedMarker : YellowMarker}
                    alt="Marker"
                    className="w-8 mt-2"
                  />
                )}
              </div>
            ))}
        </div>

        {/* Clickable overlay to register player moves */}
        <div className="absolute inset-0 grid grid-cols-7 z-20">
          {Array(COLS)
            .fill(null)
            .map((_, colIdx) => (
              <div
                key={colIdx}
                className="cursor-pointer"
                onClick={() => handleClick(colIdx)}
                onMouseEnter={() => setHoveredCol(colIdx)}
                onMouseLeave={() => setHoveredCol(null)}
              />
            ))}
        </div>
      </div>

      {/* "Play Again" button shown when game ends */}
      {gameOver && (
        <PlayAgainButton
          onPlayAgain={startGame}
          winner={winner}
          player1Score={player1Score}
          player2Score={player2Score}
        />
      )}

      {/* Conditional rendering of "Play" button or timer */}
      {!gameStarted ? (
        <PlayButton
          onPlay={startGame}
          currPlayer={currPlayer}
          gameMode={gameMode}
        />
      ) : (
        !gameOver && (
          <div className="text-white text-xl z-20">
            <div className="relative inline-block">
              {currPlayer === "R" ? (
                <>
                  {/* Player 1's timer and label */}
                  <span className="mb-12 absolute inset-0 flex items-center justify-center text-sm font-bold uppercase">
                    Player 1's Turn
                  </span>
                  <img
                    src={TimerPlayer1}
                    alt="Player 1 Timer"
                    className="w-42 h-32 inline-block"
                  />
                  <div className="mb-0 mt-8 absolute inset-0 flex items-center justify-center text-5xl font-bold uppercase">
                    {timer}
                    <span className="text-lg mt-4">s</span>
                  </div>
                </>
              ) : (
                <>
                  {/* Player 2's timer and label */}
                  <span className="mb-12 absolute inset-0 flex items-center justify-center text-sm font-bold uppercase">
                    Player 2's Turn
                  </span>
                  <img
                    src={TimerPlayer2}
                    alt="Player 2 Timer"
                    className="w-42 h-32 inline-block"
                  />
                  <div className="mb-0 mt-8 absolute inset-0 flex items-center justify-center text-5xl font-bold uppercase">
                    {timer}
                    <span className="text-lg mt-4">s</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )
      )}
      {/* Footer with dynamic background color based on game state */}
      <div
        className={`${getFooterColor()} w-full h-[120px] sm:h-[100px] md:h-[100px] fixed bottom-0 left-0 z-0 rounded-t-[2rem]`}
      />
    </div>
  );
};

export default GameBoard;
