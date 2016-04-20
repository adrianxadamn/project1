var board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
var gameOver = false;
var turn = "player1";
var seedsInHand = 0;
var beforeClick = true;
var turnBox = $("#turn");
render();
playerOneHover();
turnBox.css({color: "yellow"})

var computer = false;

var askUser = function () {
computer = prompt("Do you want to play against an Bot(Easy)? [Yes/No]")
if (computer.toLowerCase() === "yes") {
  computer = true;
} else if (computer.toLowerCase() === "no"){
  computer = false;
} else {
  alert("Please type in [yes] or [no]")
  askUser();
}};

askUser();


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
  } else if (turn === "player2" && seedIndex > 6 && computer === true) {
      if (board[seedIndex] >= 1) {
        move(seedIndex, board[seedIndex], afterMove)
        console.log("computer made a move")
      } else {
        turnBox.html("Invalid Move!")
        console.log("computer made wrong move")
        playerAi();
      }
  } else if (turn === "player2" && seedIndex > 6) {
    if (board[seedIndex] >= 1) {
      move(seedIndex, board[seedIndex], afterMove)
    } else {
      turnBox.html("Invalid Move!")
    }
  } else {
    playWrongMoveSound();
    turnBox.html("Invalid Move!")
  }
}

var playerAi = function() {

  if (board[12] === 1) {
    invalidMove(12);
    getWinner();
  } else if (board[11] === 2) {
    invalidMove(11);
  } else if (board[10] === 3) {
    invalidMove(10);
  } else if (board[9] === 4) {
    invalidMove(9);
  } else if (board[8] === 5) {
    invalidMove(8);
  } else if (board[7] === 6) {
    invalidMove(7);
  } else if (board[12] + board[11] + board[10] >= board[9] + board[8] + board[7]) {
      if (board[12] >= board[11] && board[12] >= board[10]) {
        getWinner();
        invalidMove(12);
      } else if (board[11] >= board[12] && board[11] >= board[10]) {
        getWinner();
        invalidMove(11);
      } else if (board[10] >= board[12] && board[10] >= board[11]) {
        getWinner();
        invalidMove(10);
      };
  } else if (board[7] >= board[8] + board[9] + board[10] + board[11] + board[12]) {
    invalidMove(7);
  } else if (board[8] >= board[7] + board[9] + board[10] + board[11] + board[12]) {
    invalidMove(8);
  } else if (board[9] >= board[8] + board[7] + board[10] + board[11] + board[12]) {
    invalidMove(9);
  } else if (board[10] >= board[8] + board[9] + board[7] + board[11] + board[12]) {
    invalidMove(10);
  } else if (board[11] >= board[8] + board[9] + board[10] + board[7] + board[12]) {
    invalidMove(11);
  } else if (board[12] >= board[8] + board[9] + board[10] + board[11] + board[7]) {
    invalidMove(12);
  } else if (board[7] === 1 && board[8] === 0) {
    invalidMove(7);
  } else if (board[7] === 2 && board[9] === 0) {
    invalidMove(7);
  } else if (board[7] === 3 && board[10] === 0) {
    invalidMove(7);
  } else if (board[7] === 4 && board[11] === 0) {
    invalidMove(7);
  } else if (board[7] === 5 && board[12] === 0) {
    invalidMove(7);
  } else if (board[8] === 1 && board[9] === 0) {
    invalidMove(8);
  } else if (board[8] === 2 && board[10] === 0) {
    invalidMove(8);
  } else if (board[8] === 3 && board[11] === 0) {
    invalidMove(8);
  } else if (board[8] === 4 && board[12] === 0) {
    invalidMove(8);
  } else if (board[9] === 1 && board[10] === 0) {
    invalidMove(9);
  } else if (board[9] === 2 && board[11] === 0) {
    invalidMove(9);
  } else if (board[9] === 3 && board[12] === 0) {
    invalidMove(9);
  } else if (board[10] === 1 && board[11] === 0) {
    invalidMove(10);
  } else if (board[10] === 2 && board[12] === 0) {
    invalidMove(10);
  } else if (board[11] === 1 && board[12] === 0) {
    invalidMove(11);
  } else if (board[12] >= 8 && board[7] === 0) {
    invalidMove(12);
  } else if (board[11] >= 9 && board[7] === 0) {
    invalidMove(11);
  } else if (board[10] >= 10 && board[7] === 0) {
    invalidMove(10);
  } else if (board[9] >= 11 && board[7] === 0) {
    invalidMove(9);
  } else if (board[8] >= 12 && board[7] === 0) {
    invalidMove(8);
  } else if (board[7] >= 13 && board[7] === 0) {
    invalidMove(7);
  } else if (board[7] + board[8] + board[9] + board[10] + board[11] + board[12] === 0) {
    getWinner();
  } else {
    var seedIndex = (Math.floor((Math.random() * 6) + 7))
    invalidMove(seedIndex);
  };

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
  }, 300)
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
    } else if (seedIndex !== 6 && computer === true) {
      turn = "player2";
      changeHoverColor();
      turnBox.html("Turn: Player 2").css({color: "red"})
      getWinner();
      playerAi();
    } else {
      turn = "player2";
      changeHoverColor();
      turnBox.html("Turn: Player 2").css({color: "red"})
      getWinner();   }
  } else if (turn === "player2") {
      if (seedIndex === 13 && computer === true) {
        turn = "player2";
        playGoAgain();
        getWinner();
        playerAi();
      } else if (seedIndex !== 13 && computer === true) {
        turn = "player1";
        changeHoverColor();
        turnBox.html("Turn: Player 1").css({color: "yellow"})
        getWinner();
      } else if (seedIndex === 13 && computer === false) {
        turn = "player2";
        playGoAgain();
        getWinner();
      } else if (seedIndex !== 13 && computer === false) {
        turn = "player1";
        changeHoverColor();
        turnBox.html("Turn: Player 1").css({color: "yellow"})
        getWinner();
      } else {
        turn = "player1";
        changeHoverColor();
        getWinner();
      }
  }
};

var moveAgainAi = function(seedIndex) {
  if (seedIndex === 13) {
    turn = "player2"
    playGoAgain();
    getWinner();
    playerAi();
  } else {
    turn = "player1";
    changeHoverColor();
    turnBox.html("Turn: Player 1").css({color: "yellow"});
    getWinner();
  }
}

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

