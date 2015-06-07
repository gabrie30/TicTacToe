(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = TTT.View = function (game, $el) {
    this.game = game;
    this.$el = $el;

    this.setupBoard();
    this.bindEvents();
  };

  View.prototype.bindEvents = function () {
    this.$el.on("click", "li", (function (event) {
      var $squareClicked = $(event.currentTarget);
      this.makeMove($squareClicked);
    }).bind(this));
  };

  View.prototype.makeMove = function ($square) {
    // get the data out of the squre,
    // send the data to the actual game, to make the move
    var coords = $square.data("pos")
    var currentPlayer = this.game.currentPlayer

    try{
      this.game.playMove(coords)
    } catch (e) {
      alert("Invalid move!")
      return;
    }

    $square.addClass(currentPlayer)


    if(this.game.isOver()) {
      var $gameOver = $("<figcaption>")
      this.$el.off("click");
      $gameOver.addClass("game-over");
      if (this.game.winner()){
        this.$el.append($gameOver.html(this.game.winner() + " is the winner!"))
      } else {
        this.$el.append($gameOver.html("Draw!"))
      }
        
    }


  };

  View.prototype.setupBoard = function () {
    
    var $ul = $("<ul>");

    $ul.addClass("group");

    for(var row=0; row< 3; row++) {
      for(var col=0; col<3; col++){
        var $li = $("<li>");
        $li.data("pos", [row, col]);
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  };
})();
