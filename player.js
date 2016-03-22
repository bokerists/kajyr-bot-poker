'use strict';

var _ = require("lodash");
var c = require("./cards.js");
var highCards = ['K', 'J', 'Q', 'A'];

var mapVal = {
  '2': 1,
  '3': 1,
  '4': 1,
  '5': 1,
  '6': 1,
  '7': 1,
  '8': 1,
  '9': 1,
  '10': 3,
  'J': 4,
  'Q': 6,
  'K': 8,
  'A': 10,
}

var turniInDue = 0;

exports = module.exports = {

  VERSION: 'Superstar poker player',

  bet: function (gamestate, bet) {

    var me = gamestate.players[gamestate.me];
    var hand = gamestate.commonCards.concat(me.cards);
    var numPlayers = _.filter(gamestate.players, function(g) { return g.status == 'active'} ).length;
    
    var allInPlayers = _.filter(gamestate.players, function(g) { return g.chips == 0 } ).length;
    var river = gamestate.commonCards.length === 5; 

    var allIn = _.partial(bet, Infinity);

    // What we have
    var pair = c.hasPair(hand);
    var tris = c.hasTris(hand);
    var poker = c.hasPoker(hand);
    var color = c.hasColor(hand);
    var highPair = highCards.indexOf(pair) >= 0;
    var highTris = highCards.indexOf(tris) >= 0;
 
    if (gamestate.commonCards.length < 3 && !pair) {
      return bet(gamestate.callAmount);
    }

    var ourBet = 0;

    if (gamestate.commonCards.length < 5) {
      ourBet = 1;
    }
   
    if (poker) {
      ourBet = mapVal[poker];
    } else if (tris) {
      ourBet = mapVal[tris];
    } else if (pair) {
      ourBet = mapVal[pair];
    }

    if (highTris || highPair) {
      ourBet = Infinity;
    }

    if (highTris) {
      ourBet = Infinity;
    }

    if (numPlayers == 2 && poker !== false) {
      ourBet = Infinity;
    }

    if (color) {
      ourBet = Infinity;
    }
  

    return bet(Math.max(gamestate.callAmount, gamestate.sb * ourBet));

  }

};
