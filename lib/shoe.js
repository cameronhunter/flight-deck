define([
  'flight/lib/component',
  './deck',
  './fisher-yates-shuffle'
], function (defineComponent, withDeck, withShuffle) {

  return defineComponent(shoe, withDeck, withShuffle);

  function shoe() {

    this.defaultAttrs({
      numberOfDecks: 1,
      shoeLowCount: 1
    });

    this.draw = function() {
      var cardsRemaining = this.cards.length;
      if (cardsRemaining) {
        var card = this.cards.pop();
        this.trigger('deck-deal', {suit: card.suit, value: card.value});
      } else {
        this.trigger('deck-empty');
      }
    };

    this.checkCards = function() {
      var cardsRemaining = this.cards.length;
      if (!cardsRemaining) {
        this.trigger('deck-empty');
        this.off('deck-draw');
      } else if (cardsRemaining <= this.attr.shoeLowCount) {
        this.trigger('deck-low', {remaining: cardsRemaining});
      }
    };

    this.reset = function() {
      var cards = [];
      for (var i = 0; i < this.attr.numberOfDecks; i++) {
        cards.push.apply(cards, this.deck());
      }

      this.cards = this.shuffle(cards);
      this.on('deck-draw', this.draw);
      this.after('deck-draw', this.deckLow);
    };

    this.after('initialize', function() {
      this.reset();
      this.on('deck-reset', this.reset);
    });

  }

});
