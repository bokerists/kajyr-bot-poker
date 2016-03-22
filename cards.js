var _ = require("lodash");
var getColor = _.partialRight(_.map, 'type');

var hasPair = function(cards) {
  var grouped = _.groupBy(cards, 'rank');
  for (var key in grouped) {
    if (grouped.hasOwnProperty(key)) { 
      var arrayOfCards = grouped[key];
      if (arrayOfCards.length == 2) {
        return key;
      }
    }
  }
  return false;
}

var hasTris = function(cards) {
  var grouped = _.groupBy(cards, 'rank');
  for (var key in grouped) {
    if (grouped.hasOwnProperty(key)) { 
      var arrayOfCards = grouped[key];
      if (arrayOfCards.length == 3) {
        return key;
      }
    }
  }
  return false;
}

var hasPoker = function(cards) {
  var grouped = _.groupBy(cards, 'rank');
  for (var key in grouped) {
    if (grouped.hasOwnProperty(key)) { 
      var arrayOfCards = grouped[key];
      if (arrayOfCards.length == 4) {
        return key;
      }
    }
  }
  return false;
}

var hasColor = function(cards) {
	var g =	_.values(_.groupBy(cards, 'type'));
	var f = _.find(g, function(c) {
		return c.length >= 5;
	});
	// non posso avere due colori ;)
	return !!f && f.length > 0;
}

module.exports = {
	hasPair: hasPair,
	hasTris: hasTris,
	hasPoker: hasPoker,
	hasColor: hasColor
}