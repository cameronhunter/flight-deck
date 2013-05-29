define([
  'flight/lib/component',
  './deck',
  './fisher-yates-shuffle'
], function (defineComponent, withDeck, withShuffle) {

  return defineComponent(shoe, withDeck, withShuffle);

  function shoe() {

    this.defaultAttrs({
      numberOfDecks: 1,
      cardCut: 0
    });

    this.draw = function() {
      var card = this.cards.pop();
      this.trigger('deck-deal', {suit: card.suit, value: card.value});
    };

    this.checkCards = function() {
      var remainingCards = this.cards.length;
      if (!remainingCards || remainingCards <= this.attr.cardCut) {
        this.trigger('deck-empty');
        this.off('deck-draw');
      }
    };

    this.reset = function() {
      var cards = [];
      for (var i = 0; i < this.attr.numberOfDecks; i++) {
        cards.push.apply(cards, this.deck());
      }

      this.cards = this.shuffle(cards);
      this.on('deck-draw', this.draw);
      this.after('deck-draw', this.checkCards);
    };

    this.after('initialize', function() {
      this.reset();
      this.on('deck-reset', this.reset);
    });

  }

});
