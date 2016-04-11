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

$("#newGameId").on("click", function(event) {
  board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
  turn = "player1"
  turnBox.html("Turn: Player 1").css({color: "yellow"}).css({border: "7px solid teal"})
  clearTimeout(move);
  render();
});

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
//seedNum turns into an integer
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
      cb(seedIndex);
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
      getWinner();
    } else {
      turn = "player2";
      changeHoverColor();
      playHoverSound2();
      turnBox.html("Turn: Player 2").css({color: "red"})
      getWinner();
    }
  } else if (turn ==="player2") {
      if (seedIndex === 13) {
        turn = "player2";
        playGoAgain();
        getWinner();
      } else {
        turn = "player1";
        changeHoverColor();
        playHoverSound1();
        turnBox.html("Turn: Player 1").css({color: "yellow"})
        getWinner();
      }
  }
};

//checks if the player can capture the opponent's seeds
//////////////////////////////
var capture = function(seedIndex){
if (turn === "player1") {
  for (var i = 12, j = 0; i > 6; i--, j++) {
    if (12 - i === seedIndex && board[seedIndex] === 1 && board[i] >= 1) {
      board[6] += board[i] + 1;
      $(".points1").html("+" + (board[12] + 1)).fadeIn("slow").fadeOut("slow");
      board[i] = 0;
      board[j] = 0;
      playCollectSound();
      render();
    }
  }
} else if (turn === "player2") {
  for (var i = 5, j = 7; i >= 0; i--, j++ ) {
    if (12 - i === seedIndex && board[seedIndex] === 1 && board[i] >= 1) {
      board[13] += board[i] + 1;
      $(".points2").html("+" + (board[i] + 1)).fadeIn("slow").fadeOut("slow");
      board[j] = 0;
      board[i] = 0;
      playCollectSound();
      render();
    }
  }
}};

//getWinner functions
/////////////////////
function getWinner(){
if (board[0] + board[1] + board[2] + board[3] + board[4] + board[5] === 0) {
  for (var i = 7; i < 13; i++ ){
    board[13] += board[i];
    board[i] = 0;
  }
    render()
    winnerIs();
} else if (board[7] + board[8] + board[9] + board[10] + board[11] + board[12] === 0) {
    for (var i = 0; i < 6; i++) {
      board[6] += board[i];
      board[i] = 0;
    }
    render()
    winnerIs();
  }
};

function winnerIs(){
  if (board[6] > board[13]) {
    turnBox.html("Player 1 Wins!").css({color: "yellow"}).css({border: "7px solid yellow"})
    playWinnerSound();
  } else if (board[6] < board[13]) {
    turnBox.html("Player 2 Wins!").css({color: "red"}).css({border: "7px solid red"})
    playWinnerSound();
  } else {
    turnBox.html("It's a Draw!").css({color: "teal"}).css({border: "7px solid teal"})
  }
};

///displays data on html
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

var playHoverSound1 = function (){
$(".cell1").mouseenter(function() {
  audio.play();
});
}

var playHoverSound2 = function (){
$(".cell2").mouseenter(function() {
  audio.play();
});
}

playHoverSound1();

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

///changes hover color depending on who's turn it is
////////////////////
function changeHoverColor() {
if (turn === "player1") {
  $(".cell2").off('mouseenter mouseleave');
  playHoverSound1();
  $(".cell2").css("background-color", "teal").css({border: "7px solid teal"}).css("box-shadow", "0px 0px 0px")
  playerOneHover();
} else if (turn === "player2"){
  $(".cell1").off('mouseenter mouseleave');
  playHoverSound2();
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
