var player = require('../player.js');

module.exports = {
    setUp: function (callback) {
        var hand = [ {rank: '2', type: 'C'}, {rank: 'Q', type: 'C'}];
        var table = [ {rank: '2', type: 'C'}, {rank: '3', type: 'D'}, {rank: '5', type: 'T'}, {rank: 'K', type: 'T'} ];
        var tableNull = [];
        this.gamestate = {
            "game": 2,
            "round": 1,
            "spinCount": 2,
            "sb": 2,
            "pot": 100,
            "commonCards": tableNull,
            "players": [{
                status: 'active',
                cards: hand
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
        player.bet(this.gamestate, function(amount) {
            test.equals(_this.gamestate.callAmount, amount);
             test.done();
        })
       
    }
};