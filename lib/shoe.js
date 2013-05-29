define([
  'flight/lib/component',
  'deck',
  'fisher-yates-shuffle'
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

        if (cardsRemaining - 1 <= this.attr.shoeLowCount) {
          this.trigger('deck-low', {remaining: cardsRemaining - 1});
        }
      } else {
        this.trigger('deck-empty');
      }
    };

    this.reset = function() {
      var cards = [];
      for (var i = 0; i < this.attr.numberOfDecks-1; i++) {
        cards.concat(this.deck());
      }

      this.cards = this.shuffle(cards);
    };

    this.after('initialize', function() {
      this.reset();
      this.on('deck-draw', this.draw);
      this.on('deck-reset', this.reset);
    });

  }

});
