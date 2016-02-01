console.log("linked!");

var board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
var gameOver = false;
var turn = "player1";
var seedsInHand = 0;

console.log("it's " + turn + "'s turn")

//phase 1
var move = function(seedIndex) {
  //transfers all seeds inside pit to your hand
  seedsInHand += board[seedIndex];
  board[seedIndex] = 0;
  console.log("seeds in hand =" + " " + seedsInHand);
  //phase 2 player adds 1 seed to each incoming pit from seedsInHand
  for (var i = seedsInHand; i > 0; i--) {
    if (seedIndex === 13) {
      seedIndex = 0;
    } else {
      seedIndex += 1;
    }
    if (seedIndex === 6 && turn === "player1") {
      board[seedIndex] += 1;
      console.log("added 1 seed to player1's store");
      console.log("seeds in hand =" + " " + (i - 1));
      console.log(board);
    } else if (seedIndex === 6 && turn === "player2") {
        seedIndex = 7;
        board[seedIndex] += 1;
        console.log("added 1 seed to pit");
        console.log("seeds in hand =" + " " + (i - 1));
        console.log(board);
    } else if (seedIndex === 13 && turn === "player1") {
        seedIndex = 0;
        board[seedIndex] += 1;
        console.log("added 1 seed to pit");
        console.log("seeds in hand =" + " " + (i - 1));
        console.log(board);
    } else if (seedIndex === 13 && turn === "player2") {
        board[seedIndex] += 1;
        console.log("added 1 seed to player2's store");
        console.log("seeds in hand =" + " " + (i - 1));
        console.log(board);
    } else {
        board[seedIndex] ++;
        console.log("added 1 seed to pit");
        console.log("seeds in hand =" + " " + (i - 1) );
        console.log(board);
    }

  } seedsInHand = 0;
  console.log("seed index is " + seedIndex)
  moveAgain(seedIndex);
  //phase 3
    // capture(seedIndex);
  //phase 4

}


var moveAgain = function(seedIndex) {
  if (turn === "player1") {
    if (seedIndex === 6) {
      turn = "player1";
      console.log(turn + " moves again")
    } else {
      turn = "player2";
      console.log("it's " + turn + "'s turn")
    }
  } else if (turn ==="player2") {
      if (seedIndex === 13) {
        turn = "player2";
        console.log(turn + " moves again")
      } else {
        turn = "player1"
        console.log("it's " + turn + "'s turn");
      }
  }
};


// var capture = function(seedIndex) {
//   if (turn === "player1") {
//     if (board[seedIndex] === board[0] && boardIndex[12] >= 1 ) {
//       board[6] += boardIndex[12] + 1;
//     } else if (board[seedIndex] === board[1] && boardIndex[11] >= 1 ) {
//       board[6] += boardIndex[11] + 1;
//     } else if (board[seedIndex] === board[2] && boardIndex[10] >= 1 ) {
//       board[6] += boardIndex[10] + 1;
//     } else if (board[seedIndex] === board[3] && boardIndex[9] >= 1 ) {
//       board[6] += boardIndex[9] + 1;
//     } else if (board[seedIndex] === board[4] && boardIndex[8] >= 1 ) {
//       board[6] += boardIndex[8] + 1;
//     } else if (board[seedIndex] === board[5] && boardIndex[7] >= 1 ) {
//       board[6] += boardIndex[7] + 1;
// } else if (turn === "player2") {
//     if (board[seedIndex] === board[7] && boardIndex[5] >= 1 ) {
//       board[13] += boardIndex[5] + 1;
//     } else if (board[seedIndex] === board[8] && boardIndex[4] >= 1 ) {
//       board[13] += boardIndex[4] + 1;
//     } else if (board[seedIndex] === board[9] && boardIndex[3] >= 1 ) {
//       board[13] += boardIndex[3] + 1;
//     } else if (board[seedIndex] === board[10] && boardIndex[2] >= 1 ) {
//       board[13] += boardIndex[2] + 1;
//     } else if (board[seedIndex] === board[11] && boardIndex[1] >= 1 ) {
//       board[13] += boardIndex[1] + 1;
//     } else if (board[seedIndex] === board[12] && boardIndex[0] >= 1 ) {
//       board[13] += boardIndex[0] + 1;
//     }}
//   }
// };



