[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

# flight-deck

A [Flight](https://github.com/twitter/flight) component for a deck of cards with Fisher-Yates shuffling.

## Installation

```bash
bower install --save flight-deck
```

## Example

```javascript
define(['flight-deck'], function(Deck) {

  Deck.attachTo(document, {
    numberOfDecks: 5
    cardCut: 35
  });

  $(document).on('deck-deal', function(e, card) {
    console.log(e, card);
  });

  $(document).on('deck-empty', function(e, error) {
    console.error(e, error);
  });

  $(document).trigger('deck-draw');
});
```

## Development

Development of this component needs [Bower](http://bower.io), and ideally
[Karma](http://karma-runner.github.io) to be globally installed:

```bash
npm install -g bower karma
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install
bower install
```

To continuously run the tests in Chrome and Firefox during development, just run:

```bash
karma start
```
