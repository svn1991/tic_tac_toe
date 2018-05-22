// JavaScript Document

var winning_combinations = [
  ["one", "two","three"],
  ["four", "five","six"],
  ["seven", "eight","nine"],
  ["one", "four","seven"],
  ["two", "five","eight"],
  ["three", "six","nine"],
  ["one", "five","nine"],
  ["three", "five","seven"],
];

function gameWon(winning_symbol) {
  $("#game li").text("+");
  $("#game li").removeClass('disable')
  $("#game li").removeClass('o')
  $("#game li").removeClass('x')
  $("#game li").removeClass('btn-primary')
  $("#game li").removeClass('btn-info')
}

function setCurrentPlayer(player) {
  $(".player_type").text('Player ' + player);
  $(".player_type").removeClass(player === 1 ? 'player_two' : 'player_one')
  $(".player_type").addClass(player === 1 ? 'player_one' : 'player_two')
}

function isWin(winning_symbol) {
  var className = winning_symbol === 'o' ? '.o' : '.x';
  var arrayOfIds = $.map($(className), function(n, i){
    return n.id;
  });

  var success =  winning_combinations.filter(function(combi) {
    return arrayOfIds.length >= 3 && arrayOfIds.includes(combi[0]) && arrayOfIds.includes(combi[1]) && arrayOfIds.includes(combi[2]);
  });

  return success.length >= 1 ? true : false;
}

$(document).ready(
  function() {
    var x = "x"
    var o = "o"
    var count = 0;
    var o_win = 0;
    var x_win = 0;
    var currentWinner = null;
    $('#game li').click(
      function(){

      //check if current game has ended and user has not pressed restart/reset game yet
      if (currentWinner){
         var winnerSymbol = currentWinner === 'o' ? 'O' : 'X';
         alert(winnerSymbol + ' has won the game. Start a new game');
         gameWon();
         currentWinner = null;
      }
      //if player clicked a button which has been clicked previously in current round of game
      else if ($(this).hasClass('disable'))
      {
        alert('Already selected')
      } else {
        count++;
        //check if tie
        if (count == 9)
        {
          alert('Its a tie. It will restart.')
          gameWon();
          count = 0;
        } else {
          var symbolToCheck = 'x';
          var setPlayer = '1';
          var classAdded = 'disable x btn-info';
          if ((count - 1)%2 === 0 ) {
            symbolToCheck = 'o';
            setPlayer = 2;
            var classAdded = 'disable o btn-primary';
          }

          $(this).text(symbolToCheck);
          $(this).addClass(classAdded);

          //check if winning game
          if (isWin(symbolToCheck)){
            count = 0;
            if (symbolToCheck === 'o') {
              o_win++;
              $('#o_win').text(o_win)
              currentWinner = 'o';
              alert('O wins')
            }
            else {
              x_win++;
              $('#x_win').text(x_win)
              currentWinner = 'x';
              alert('X wins')
            }
          } else {
            setCurrentPlayer(setPlayer);
          } 
        }
      }
 });

    // resets board and not the score board
    $(".reset_board").click(
      function () {
        gameWon();
        count = 0
        currentWinner = null;
        setCurrentPlayer(1);
      });

    //resets board and score board
    $("#reset_game").click(
      function () {
        x_win = 0;
        o_win = 0;
        $('#x_win').text(x_win);
        $('#o_win').text(o_win);
      });
  });