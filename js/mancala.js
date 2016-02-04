var board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
var gameOver = false;
var turn = "player1";
var seedsInHand = 0;
var beforeClick = true;
var turnBox = $("#turn");
render();
playerOneHover();
turnBox.css({color: "yellow"})

//restarts Game
/////////////
$("#newGameId").on("click", function(event) {
  board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
  turn = "player1"
  turnBox.html("Turn: Player 1").css({color: "yellow"}).css({border: "7px solid teal"})
  clearTimeout(move);
  render();
});

function changeHoverColor() {
if (turn === "player1") {
  $(".cell2").off('mouseenter mouseleave');
  $(".cell2").css("background-color", "teal").css({border: "7px solid teal"}).css("box-shadow", "0px 0px 0px")
  playerOneHover();
} else if (turn === "player2"){
  $(".cell1").off('mouseenter mouseleave');
  $(".cell1").css("background-color", "teal").css({border: "7px solid teal"}).css("box-shadow", "0px 0px 0px")
  playerTwoHover();
}};

function playerOneHover() {
  $(".cell1").hover(function(){
    $(this).css("background-color", "yellow").css({border: "7px solid yellow"}).css("box-shadow", "0px 0px 100px #fff")
  }, function () {
    $(this).css("background-color", "teal").css({border: "7px solid teal"}).css("box-shadow", "0px 0px 0px")
  });
}
function playerTwoHover() {
  $(".cell2").hover(function(){
    $(this).css("background-color", "red").css({border: "7px solid red"}).css("box-shadow", "0px 0px 100px #fff")
  }, function () {
    $(this).css("background-color", "teal").css({border: "7px solid teal"}).css("box-shadow", "0px 0px 0px")
  });
}

//triggers move function when you click a pit
////////////////////////////
$(".cell1").on("click", function(event) {
  event.preventDefault();
  var seedIndex = parseInt(event.target.id.slice(3));
  turnBox.html("Turn: Player 1")
  invalidMove(seedIndex);
});

$(".cell2").on("click", function(event) {
  event.preventDefault();
  var seedIndex = parseInt(event.target.id.slice(3));
  turnBox.html("Turn: Player 2")
  invalidMove(seedIndex);
});

// checks if move is invalid
///////////////////////
var invalidMove = function (seedIndex){
  if (turn === "player1" && seedIndex < 6) {
    if (board[seedIndex] >= 1) {
      move(seedIndex, board[seedIndex], afterMove);
    } else {
      turnBox.html("Invalid Move!")
    }
  } else if (turn === "player2" && seedIndex > 6) {
      if (board[seedIndex] >= 1) {
        move(seedIndex, board[seedIndex], afterMove);
      } else {
        turnBox.html("Invalid Move!")
      }
  } else {
    playWrongMoveSound();
    turnBox.html("Invalid Move!")
  }
}

//move function
//////////////////////////
function move(seedIndex, seedNum, cb) {
  if (beforeClick === true) {
    board[seedIndex] = 0;
    beforeClick = false;
  }
  setTimeout(function() {
    if (seedIndex === 13) {
      seedIndex = 0;
    } else {
      seedIndex += 1;
    }
    if (seedIndex === 6 && turn === "player1") {
      board[seedIndex] += 1;
      $(".points1").html("+1").fadeIn("slow").fadeOut("slow");
      playCollectSound();
    } else if (seedIndex === 6 && turn === "player2") {
        seedIndex = 7;
        board[seedIndex] += 1;
    } else if (seedIndex === 13 && turn === "player1") {
        seedIndex = 0;
        board[seedIndex] += 1;
    } else if (seedIndex === 13 && turn === "player2") {
        board[seedIndex] += 1;
        $(".points2").html("+1").fadeIn("slow").fadeOut("slow");
        playCollectSound();
    } else {
        board[seedIndex] ++;
    }
    seedNum--;
    render();
    //recursion function
    if (seedNum === 0) {
      cb(seedIndex)
    } else {
      move(seedIndex, seedNum, cb);
    }
  }, 200)
}

//this function will run once move has ended
////////////////////////
function afterMove(seedIndex) {
  beforeClick = true;
  capture(seedIndex);
  moveAgain(seedIndex);
}

var moveAgain = function(seedIndex) {
  if (turn === "player1") {
    if (seedIndex === 6) {
      turn = "player1";
      playGoAgain();
      console.log(turn + " moves again")
      getWinner();
    } else {
      turn = "player2";
      changeHoverColor();
      turnBox.html("Turn: Player 2").css({color: "red"})
      console.log("it's " + turn + "'s turn")
      getWinner();
    }
  } else if (turn ==="player2") {
      if (seedIndex === 13) {
        turn = "player2";
        playGoAgain();
        console.log(turn + " moves again")
        getWinner();
      } else {
        turn = "player1";
        changeHoverColor();
        turnBox.html("Turn: Player 1").css({color: "yellow"})
        console.log("it's " + turn + "'s turn");
        getWinner();
      }
  }
};

//checks if the player can capture the opponent's seeds
//////////////////////////////
var capture = function(seedIndex) {
  if (turn === "player1") {
    if (12 - 12 === seedIndex && board[seedIndex] === 1 && board[12] >= 1 ) {
      board[6] += board[12] + 1;
      $(".points1").html("+" + (board[12] + 1)).fadeIn("slow").fadeOut("slow");
      board[12] = 0;
      board[0] = 0;
      playCollectSound();
      render();
    } else if (12 - 11 === seedIndex && board[seedIndex] === 1 && board[11] >= 1 ) {
      board[6] += board[11] + 1;
      $(".points1").html("+" + (board[11] + 1)).fadeIn("slow").fadeOut("slow");
      board[1] = 0;
      board[11] = 0;
      playCollectSound();
      render();
    } else if (12 - 10 === seedIndex && board[seedIndex] === 1 && board[10] >= 1 ) {
      board[6] += board[10] + 1;
      $(".points1").html("+" + (board[10] + 1)).fadeIn("slow").fadeOut("slow");
      board[2] = 0;
      board[10] = 0;
      playCollectSound();
      render();
    } else if (12 - 9 === seedIndex && board[seedIndex] === 1 && board[9] >= 1 ) {
      board[6] += board[9] + 1;
      $(".points1").html("+" + (board[9] + 1)).fadeIn("slow").fadeOut("slow");
      board[3] = 0;
      board[9] = 0;
      playCollectSound();
      render();
    } else if (12 - 8 === seedIndex && board[seedIndex] === 1 && board[8] >= 1 ) {
      board[6] += board[8] + 1;
      $(".points1").html("+" + (board[8] + 1)).fadeIn("slow").fadeOut("slow");
      board[4] = 0;
      board[8] = 0;
      playCollectSound();
      render();
    } else if (12 - 7 === seedIndex && board[seedIndex] === 1 && board[7] >= 1 ) {
      board[6] += board[7] + 1;
      $(".points1").html("+" + (board[7] + 1)).fadeIn("slow").fadeOut("slow");
      board[5] = 0;
      board[7] = 0;
      playCollectSound();
      render();
}} else if (turn === "player2") {
    if (12 - 5 === seedIndex && board[seedIndex] === 1 && board[5] >= 1 ) {
      board[13] += board[5] + 1;
      $(".points2").html("+" + (board[5] + 1)).fadeIn("slow").fadeOut("slow");
      board[7] = 0;
      board[5] = 0;
      playCollectSound();
      render();
    } else if (12 - 4 === seedIndex && board[seedIndex] === 1 && board[4] >= 1 ) {
      board[13] += board[4] + 1;
      $(".points2").html("+" + (board[4] + 1)).fadeIn("slow").fadeOut("slow");
      board[8] = 0;
      board[4] = 0;
      playCollectSound();
      render();
    } else if (12 - 3 === seedIndex && board[seedIndex] === 1 && board[3] >= 1 ) {
      board[13] += board[3] + 1;
      $(".points2").html("+" + (board[3] + 1)).fadeIn("slow").fadeOut("slow");
      board[9] = 0;
      board[3] = 0;
      playCollectSound();
      render();
    } else if (12 - 2 === seedIndex && board[seedIndex] === 1 && board[2] >= 1 ) {
      board[13] += board[2] + 1;
      $(".points2").html("+" + (board[2] + 1)).fadeIn("slow").fadeOut("slow");
      board[10] = 0;
      board[2] = 0;
      playCollectSound();
      render();
    } else if (12 - 1 === seedIndex && board[seedIndex] === 1 && board[1] >= 1 ) {
      board[13] += board[1] + 1;
      $(".points2").html("+" + (board[1] + 1)).fadeIn("slow").fadeOut("slow");
      board[11] = 0;
      board[1] = 0;
      playCollectSound();
      render();
    } else if (12 - 0 === seedIndex && board[seedIndex] === 1 && board[0] >= 1 ) {
      board[13] += board[0] + 1;
      $(".points2").html("+" + (board[0] + 1)).fadeIn("slow").fadeOut("slow");
      board[12] = 0;
      board[0] = 0;
      playCollectSound();
      render();
    }}
  };

//getWinner functions
/////////////////////
function getWinner(){
  if (board[0] + board[1] + board[2] + board[3] + board[4] + board[5] === 0) {
    board[13] += board[7] + board[8] + board[9] + board[10] + board[11] + board[12];
    board[7] = 0;
    board[8] = 0;
    board[9] = 0;
    board[10] = 0;
    board[11] = 0;
    board[12] = 0;
    render();
    return winnerIs();
  } else if (board[7] + board[8] + board[9] + board[10] + board[11] + board[12] === 0) {
    board[6] += board[0] + board[1] + board[2] + board[3] + board[4] + board[5];
    board[0] = 0;
    board[1] = 0;
    board[2] = 0;
    board[3] = 0;
    board[4] = 0;
    board[5] = 0;
    render();
    return winnerIs();
  }
};

function winnerIs(){
  if (board[6] >= board[13]) {
    turnBox.html("Player 1 Wins!").css({color: "yellow"}).css({border: "7px solid yellow"})
    playWinnerSound();
  } else {
    turnBox.html("Player 2 Wins!").css({color: "yellow"}).css({border: "7px solid yellow"})
    playWinnerSound();
  }
};

function render() {
  for (var i = 0; i < 14; i +=1) {
    $("#pit" + i).html(board[i]);
  }
};

//audio manipulation
///////////////////////////////
var audio = $("#hover-cells")[0];
var score = $("#score")[0];
var song = $("#song")[0];
var kO = $("#winner")[0];
var oneUp = $("#goAgain")[0];
var wrongMove = $("#wrongMove")[0];

//play sounds when you trigger a specific type of move
////////////////////////////////
$(".cell").mouseenter(function() {
  audio.play();
});

var playCollectSound = function() {
  score.play();
};

var playGoAgain = function() {
  oneUp.play();
};

var playWinnerSound = function () {
  kO.play();
};

var playWrongMoveSound = function() {
  wrongMove.play();
};

$("#pauseMusic").on("click", function(){
  if ($("#pauseMusic").html() === "Music: ON" ) {
   song.pause();
   $("#pauseMusic").html("Paused");
  } else {
    song.play();
    $("#pauseMusic").html("Music: ON");
  }
});
