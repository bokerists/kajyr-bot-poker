var cards = require('../cards.js');

module.exports = {
    setUp: function (callback) {
        var hand = [ {rank: '2', type: 'C'}, {rank: 'Q', type: 'C'}];
        var table = [ {rank: '2', type: 'C'}, {rank: '3', type: 'D'}, {rank: '5', type: 'T'}, {rank: 'K', type: 'T'} ];
        var tableColor = [ {rank: '2', type: 'C'}, {rank: '3', type: 'C'}, {rank: '5', type: 'C'}, {rank: 'K', type: 'C'} ];

        this._cardsWithColor = tableColor.concat(hand)
        this._cardsWithoutColor = table.concat(hand)

        callback();
    },
    tearDown: function (callback) {
        // clean up
        callback();
    },
    hasColor: function (test) {
        test.ok( cards.hasColor(this._cardsWithColor), 'Trova il colore');
        test.done();
    },
    notHasColor: function (test) {
        test.ok( !cards.hasColor(this._cardsWithoutColor), 'Non trova il colore se non c\'è');
        test.done();
    }
};