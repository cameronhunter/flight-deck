define([], function() {

  var suits = ['♥', '♦', '♠', '♣'];
  var cards = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

  return function() {

    this.defaultAttrs({
      jokers: 0
    });

    this.deck = function() {
      var deck = [];

      suits.forEach(function(suit) {
        cards.forEach(function(card) {
          deck.push({suit: suit, value: card});
        });
      });

      for (var i = 0; i < this.attr.jokers - 1; i++) {
        deck.push({value: 'Joker'});
      }

      return deck;
    };
  }

});