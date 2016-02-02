
console.log("linked!");

board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0]
var gameOver = false;
var turn = "player1";
var seedsInHand = 0;





render();
// for (var i = 0; i < board.length; i++){
//   pit[i].addEventListener("click", move)
// }

//Example
// $('.cell').click(function(evt) {
//   render();
// })


console.log("it's " + turn + "'s turn")

// var pit = $("#pit")

// for (var i = 0; i < 14; i +=1) {
//     $("#pit" + i).click(function(event) {
//       move(pit + i);
//     });
//   };


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
      playCollectSound();
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
        playCollectSound();
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
  render();
  seedsInHand = 0;
  console.log("this should be last")
  console.log("seed index is " + seedIndex)
  // capture(seedIndex);
  moveAgain(seedIndex);
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
//     if (board[seedIndex] === board[0] && board[12] >= 1 ) {
//       board[6] += board[12] + 1;
//       board[12] = 0;
//       board[0] = 0;
//       console.log("you stole your opponents seeds!");
//       render();
//     } else if (board[seedIndex] === board[1] && board[11] >= 1 ) {
//       board[6] += board[11] + 1;
//       board[1] = 0;
//       board[11] = 0;
//       console.log("you stole your opponents seeds!");
//       render();
//     } else if (board[seedIndex] === board[2] && board[10] >= 1 ) {
//       board[6] += board[10] + 1;
//       board[2] = 0;
//       board[10] = 0;
//       console.log("you stole your opponents seeds!");
//       render();
//     } else if (board[seedIndex] === board[3] && board[9] >= 1 ) {
//       board[6] += board[9] + 1;
//       board[3] = 0;
//       board[9] = 0;
//       console.log("you stole your opponents seeds!");
//       render();
//     } else if (board[seedIndex] === board[4] && board[8] >= 1 ) {
//       board[6] += board[8] + 1;
//       board[4] = 0;
//       board[8] = 0;
//       console.log("you stole your opponents seeds!");
//       render();
//     } else if (board[seedIndex] === board[5] && board[7] >= 1 ) {
//       board[6] += board[7] + 1;
//       board[5] = 0;
//       board[7] = 0;
//       console.log("you stole your opponents seeds!");
//       render();
// } else if (turn === "player2") {
//     if (board[seedIndex] === board[7] && board[5] >= 1 ) {
//       board[13] += board[5] + 1;
//       board[7] = 0;
//       board[5] = 0;
//       console.log("you stole your opponents seeds!");
//       render();
//     } else if (board[seedIndex] === board[8] && board[4] >= 1 ) {
//       board[13] += board[4] + 1;
//       board[8] = 0;
//       board[4] = 0;
//       console.log("you stole your opponents seeds!");
//       render();
//     } else if (board[seedIndex] === board[9] && board[3] >= 1 ) {
//       board[13] += board[3] + 1;
//       board[9] = 0;
//       board[3] = 0;
//       console.log("you stole your opponents seeds!");
//       render();
//     } else if (board[seedIndex] === board[10] && board[2] >= 1 ) {
//       board[13] += board[2] + 1;
//       board[10] = 0;
//       board[2] = 0;
//       console.log("you stole your opponents seeds!");
//       render();
//     } else if (board[seedIndex] === board[11] && board[1] >= 1 ) {
//       board[13] += board[1] + 1;
//       board[11] = 0;
//       board[1] = 0;
//       console.log("you stole your opponents seeds!");
//       render();
//     } else if (board[seedIndex] === board[12] && board[0] >= 1 ) {
//       board[13] += board[0] + 1;
//       board[12] = 0;
//       board[0] = 0;
//       console.log("you stole your opponents seeds!");
//       render();
//     }}
//   }
// };



function render() {
  for (var i = 0; i < 14; i +=1) {
    $("#pit" + i).html(board[i]);
  }
}


var audio = $("#hover-cells")[0];
var score = $("#score")[0];

//play sounds when you hover pits
$(".cell").mouseenter(function() {
  audio.play();
})

//play sounds
var playCollectSound = function() {
  score.play();
}
