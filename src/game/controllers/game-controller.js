module.exports = function($scope, $firebaseArray, firebase, game, name, HIT_STATUSES, GamesRepository) {
  var roomListRef = firebase.database().ref().child("roomList");
  var roomList = $firebaseArray(roomListRef);

  roomList.$watch(function (event) {
    roomList
      .$loaded()
      .then(function(roomList) {
        $scope.game.players = roomList.$getRecord(event.key).players;

        $scope.you.hits = $scope.game.players.filter(function (value) {
          return value.name === name
        })[0].hits;

        $scope.opponent.hits = $scope.game.players.filter(function (value) {
          return value.name !== name
        })[0].hits;

        $scope.winner = getWinner($scope.you, $scope.opponent);

        if ($scope.winner && $scope.game.status != 'FINISHED') {
          GamesRepository.updateGameStatus(event.key, 'FINISHED');
        }
      });
  });

  var shipsRectNo = 0;

  $scope.game = game;
  $scope.name = name;
  $scope.you = $scope.game.players.filter(function (value) {
    return value.name === name
  })[0];

  $scope.opponent = $scope.game.players.filter(function (value) {
    return value.name !== name
  })[0];

  angular.forEach($scope.you.ships, function (ship) {
    shipsRectNo += Object.keys(ship).length;
  });

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

    $scope.winner = getWinner($scope.you, $scope.opponent);

    return hit;
  };

  function markShipAsSunk (ship) {
    angular.forEach(ship, function (point, key) {
      $scope.opponent.hits[key].state = HIT_STATUSES.SUNK;
    });
  }

  function getWinner (you, opponent) {
    var opponentSunked = Object.keys(opponent.hits).filter(function (hitId) {
      if (!opponent.hits[hitId]) {
        return false;
      }

      return opponent.hits[hitId].state === HIT_STATUSES.SUNK;
    }).length;

    var yourSunked = Object.keys(you.hits).filter(function (hitId) {
      if (!you.hits[hitId]) {
        return false;
      }

      return you.hits[hitId].state === HIT_STATUSES.SUNK;
    }).length;

    if (shipsRectNo === opponentSunked) {
      return you.name;
    }

    if (shipsRectNo === yourSunked) {
      return opponent.name;
    }

    return null;
  }
};
