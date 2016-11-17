module.exports = function($scope, game, name, HIT_STATUSES) {
  var shipsRectNo = 0;

  $scope.game = game;
  $scope.name = name;
  $scope.you = game.players.filter(function (value) {
    return value.name === name
  })[0];
  $scope.opponent = game.players.filter(function (value) {
    return value.name !== name
  })[0];

  angular.forEach($scope.you.ships, function (ship) {
    shipsRectNo += Object.keys(ship).length;
  })

  $scope.onOpponentClick = function (coords) {
    var hit = angular.extend({}, coords);
    var hitId = '' + coords.x + coords.y;
    var ship = {};
    var shipHits = 0;
    var isHit = false;
    var isSunk = false;

    if ($scope.opponent.hits.hasOwnProperty(hitId)) {
      return;
    }

    for (var i = 0, len = $scope.opponent.ships.length; i < len; i += 1) {
      ship = $scope.opponent.ships[i];
      isHit = ship.hasOwnProperty(hitId);

      if (!isHit) {
        continue;
      }

      angular.forEach(ship, function (point) {
        if ($scope.opponent.hits.hasOwnProperty('' + point.x + point.y)) {
          shipHits += 1;
        }
      });

      if (shipHits + 1 === Object.keys(ship).length) {
        hit.state = HIT_STATUSES.SUNK;
        isSunk = true;
      } else {
        hit.state = HIT_STATUSES.HIT;
      }

      $scope.opponent.hits[hitId] = hit;
      isSunk && markShipAsSunk(ship);

      break;
    }

    if (!isHit) {
      hit.state = HIT_STATUSES.MISSED;
      $scope.opponent.hits[hitId] = hit;
    }

    $scope.winner = getWinner();

    return hit;
  };

  function markShipAsSunk (ship) {
    angular.forEach(ship, function (point, key) {
      $scope.opponent.hits[key].state = HIT_STATUSES.SUNK;
    });
  }

  function getWinner () {
    var opponentSunked = Object.keys($scope.opponent.hits).filter(function (hitId) {
      return $scope.opponent.hits[hitId].state === HIT_STATUSES.SUNK;
    }).length;
    var yourSunked = Object.keys($scope.you.hits).filter(function (hitId) {
      return $scope.opponent.hits[hitId].state === HIT_STATUSES.SUNK;
    }).length;

    if (shipsRectNo === opponentSunked) {
      return $scope.you.name;
    }

    if (shipsRectNo === yourSunked) {
      return $scope.opponent.name;
    }

    return null;
  }
};
