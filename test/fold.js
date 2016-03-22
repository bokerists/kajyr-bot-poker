var player = require('../player.js');

module.exports = {
    setUp: function (callback) {
        this.hand = [ {rank: '2', type: 'C'}, {rank: 'Q', type: 'C'}];
        var table = [ {rank: '2', type: 'C'}, {rank: '3', type: 'D'}, {rank: '5', type: 'T'}, {rank: 'K', type: 'T'} ];
        this.tableNull = [];
        this.gamestate = {
            "game": 2,
            "round": 1,
            "spinCount": 2,
            "sb": 2,
            "pot": 100,
            "commonCards": [],
            "players": [{
                status: 'active',
                cards: []
            }, {
                status: 'active',
                cards: []
            }, {
                status: 'folded',
                cards: []
            }],
            "me": 0,
            "callAmount": 10
        };
        this._bet = function(amount) {
            console.log('bet:', amount);
        }
        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    betCallAmount: function (test) {
        var _this = this;

        this.gamestate.commonCards = this.tableNull;
        this.gamestate.players[0].cards = this.hand;

        player.bet(this.gamestate, function(amount) {
            test.equals(_this.gamestate.callAmount, amount);
             test.done();
        })
    },
    betAllIn: function(test) {
        this.gamestate.commonCards = [];
        this.gamestate.players[0].cards = [ {rank: 'A', type: 'C'}, {rank: 'A', type: 'R'}];
        
        player.bet(this.gamestate, function(amount) {
            test.equals(Infinity, amount);
             test.done();
        })
    }
};