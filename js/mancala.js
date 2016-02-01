console.log("linked!");

var board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0],
    gameOver = false,
    player1,
    player2,
    turn = player1,
    seedsInHand = 0;




var move = function(seedIndex) {
  //transfers all seeds inside pit to your hand
    seedsInHand += board[seedIndex];
    board[seedIndex] = 0;

  }





// //phase 1
// if (board[seedIndex] > 0) {
//     seedsInHand += board[seedIndex];
//     board[seedIndex] === 0;
// //phase 2
//     for (var i = seedsInHand; i > 0; i--) {
//       seedIndex += 1;
// //phase 2.1
//       if (seedIndex === 6) {
//         if (turn === player1) {
//           board[seedIndex] += 1;
//           seedIndex += 1;
//         } else {
//           seedIndex = 7;
//         }
//     } if (seedIndex === 13) {
//         if (turn === player1) {
//           seedIndex = 0;
//         } else {
//           board[seedIndex] += 1
//           seedIndex += 1;
//         }
//     }
//   }}};
// //phase 3
// //     if ()




