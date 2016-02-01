console.log("linked!");

var board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
var gameOver = false;
var turn = "player2";
var seedsInHand = 0;



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

    }
    seedsInHand = 0;
  }

