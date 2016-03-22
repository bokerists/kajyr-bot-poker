'use strict';

var _ = require("lodash");
var c = require("./cards.js");
var highCards = ['K', 'J', 'Q', 'A'];

var mapVal = {
  '2': 10,
  '3': 10,
  '4': 10,
  '5': 10,
  '6': 10,
  '7': 10,
  '8': 10,
  '9': 10,
  '10': 30,
  'J': 40,
  'Q': 60,
  'K': 80,
  'A': 100,
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


    if (numPlayers == 2) {
      turniInDue++;
    } else {
      turniInDue = 0;
    }

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

    // prevent loops
    if (turniInDue > 10 && !highPair) {
      return bet(gamestate.callAmount);
    }
   
    var ourBet = 0;

    if (gamestate.commonCards.length < 5) {
      ourBet = gamestate.callAmount;
    }

    
    if (poker) {
      ourBet = gamestate.callAmount + mapVal[poker] * 3;
    } else if (tris) {
      ourBet = gamestate.callAmount + mapVal[tris] * 2;
    } else if (pair) {
      ourBet = gamestate.callAmount + mapVal[pair];
    }

    if ((highTris || highPair)) {
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
  
   

    return bet(ourBet);

  }

};
