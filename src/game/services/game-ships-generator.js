// Expected data
// [{
//   "37": {
//     "x": 3,
//     "y": 7
//   },
//   "47": {
//     "x": 4,
//     "y": 7
//   },
//   "57": {
//     "x": 5,
//     "y": 7
//   },
//   "67": {
//     "x": 6,
//     "y": 7
//   }
// }, {
//   "98": {
//     "x": 9,
//     "y": 8
//   }
// }]


var shipSizeConfig = [4, 3, 2, 1, 1, 1, 1];

// Direction 0 - Vertical
// Direction 1 - Horizontal
// x, y are starting point
var placeShip = function (size, direction, x, y, ships) {
  var ship = {};

  for (var i = 0; i < size; i++) {
   //Create ship here
  }

  ships.push(ship);
};

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


module.exports = function(GRID_UNITS) {
  return {
    generate: function () {
      var width = GRID_UNITS;
      var height = GRID_UNITS;
      var ships = [];

      var canBePlaced = function (size, direction, x, y, ships) {
        //Determine if ship can be placed -> does not overlaps on other ships and is inside map ragne
        return true;
      };

      shipSizeConfig.forEach(function (shipLength) {
        var direction = +(Math.random() > 0.5);
        do {
          var x = getRandomInt(1, width);
          var y = getRandomInt(1, height);
        } while (!canBePlaced(shipLength, direction, x, y, ships));
        placeShip(shipLength, direction, x, y, ships);
      });

      return ships;
    }
  }
};
