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
    
    var river = gamestate.commonCards.length === 5; 
    var turn = gamestate.commonCards.length === 4;
    var preRiver = gamestate.commonCards.length < 5;
    var preTurn = gamestate.commonCards.length < 4;
    var preFlop = gamestate.commonCards.length < 3;

    var allInPlayers = _.filter(gamestate.players, function(g) { return g.chips == 0 } ).length;
    var somebodyAllInPreTurn = preTurn && allInPlayers > 0;
    

    var call = _.partial(bet, gamestate.callAmount);
    var fold = _.partial(bet, 0);
    var allIn = _.partial(bet, Infinity);

    // What we have
    var pair = c.hasPair(hand);
    var pairInHand = c.hasPair(me.cards);
    var tris = c.hasTris(hand);
    var poker = c.hasPoker(hand);
    var color = c.hasColor(hand);
    var highPair = highCards.indexOf(pair) >= 0;
    var highTris = highCards.indexOf(tris) >= 0;
    var nonHoUnCazzo = !pair && !color;

    if (gamestate.spinCount === 0) {
      var puntate = [];
    }

    if (nonHoUnCazzo && gamestate.spinCount >= 5) {
      if (somebodyAllInPreTurn) { return fold(); }
    }
    var ourBet = 1;

    if (pair || tris) {
      ourBet = 2;
    }

    if (highTris || highPair || color || poker) {
      ourBet = 4;
    }

    var b = Math.max(gamestate.callAmount, gamestate.sb * ourBet);
    
    if (puntate.length > 3) {
      var last = puntate[puntate.length - 1];
      var prev = puntate[puntate.length - 2];

      if (b == last && last == prev) {
        b = Infinity;
      }
    }
   

    puntate.push(b);
    return bet(b);

  }

};
