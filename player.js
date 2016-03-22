
exports = module.exports = {

  VERSION: 'Superstar poker player',

  myCard: null,
  commonCards: null,
  myId: null,
  player: null,
  betValue:Infinity,

  getMyCard: function (gamestate) {
    gamestate.players.forEach( function(v){
      if(v.id == gamestate.me) {
        this.myCard = v.cards;
        this.player = v;
      }
    }.bind(this) );
  },

  getBet: function (gamestate) {
    if(this.isPair() && this.isPreFlop())
      return gamestate.pot*1.2;

    if(this.isPair() )
      return gamestate.pot*1.2;

    if(this.areFigures())
      return gamestate.callAmount;

    if(this.isThereAnyFigure())
      return gamestate.pot;

    return gamestate.sb*3;
  },
  
  isPair: function(){
    return (this.myCard[0].rank == this.myCard[1].rank)
  },

  isPreFlop: function(){
    return (this.commonCards.length==0);
  },

  isThereAnyFigure: function(){
    if(isNaN(this.myCard[0].rank*1) || isNaN(this.myCard[1].rank*1))
      return true;
  },
  
  areFigures: function(){
    if(isNaN(this.myCard[0].rank*1) && isNaN(this.myCard[1].rank*1))
      return true;
  },

  cardToNumber: function(cardRank) {
  if(parseInt(cardRank).toString() != "NaN"){
    return cardRank;
    }
  if(cardRank==='J')return '11';
    if(cardRank==='Q')return '12';
    if(cardRank==='K')return '13';
    if(cardRank==='A')return '14';
  },

  bet: function (gamestate, bet) {
    'use strict';
debugger;
    // gamestate contains info about the state of the game.
    // check the documentation at https://bot-poker.herokuapp.com/wiki for further info about the data structure.

    //
    // bet is the function you should use to send your bet.

    this.myId = gamestate.me;

    this.getMyCard(gamestate);
    // enjoy the game!

    this.commonCards = gamestate.commonCards;


    this.betValue = this.getBet(gamestate);


    //
    // currently we just go all-in every single hand!



    return bet(this.betValue);

  }

};