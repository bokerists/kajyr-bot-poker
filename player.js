
exports = module.exports = {

  VERSION: 'Superstar poker js-player',

  bet: function (gamestate, bet) {

    //
    // gamestate contains info about the state of the game.
    // check the documentation at https://bot-poker.herokuapp.com/wiki for further info about the data structure.

    //
    // bet is the function you should use to send your bet.



    // enjoy the game!

    //
    // currently we just fold every single hand.

    'use strict';

    console.log(`Currently playing tournament ${gamestate.tournamentId}`);

    return bet(0);

  }

};
