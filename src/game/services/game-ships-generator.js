var shipSizeConfig = [4, 3, 2, 1, 1, 1, 1];

// Direction 0 - Vertical
// Direction 1 - Horizontal
// x, y are starting point
var placeShip = function (size, direction, x, y, ships) {
  for (var i = 0; i < size; i++) {
    var xx = x + i * (direction);
    var yy = y + i * (!direction);
    var ship = {};
    var key = '' + xx + yy;

    ship[key] = { x:xx, y:yy };

    ships.push(ship);
  }
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
        if (direction) {
          if (x + size > width) {
            return false
          }
        } else {
          if (y + size > height) {
            return false;
          }
        }

        for (var i = 0; i < size; i++) {
          var xx = x + i * (direction);
          var yy = y + i * (!direction);
          var key = '' + xx + yy;

          if (key in ships) {
            return false;
          }
        }

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
