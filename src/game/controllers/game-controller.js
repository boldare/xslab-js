module.exports = function($scope, $firebaseArray, firebase, game, name, HIT_STATUSES, GamesRepository, $firebaseObject) {
  var ref = firebase.database().ref().child("roomList").child(game.$id);
  var room = $firebaseObject(ref);
  var refreshPlayerHits = function(player) {
    if (player) {
      player.hits = player.hits || [];
    }
  };

  room.$watch(function (event) {
    $scope.game.players = room.players;
    if (!$scope.game.players || 2 != $scope.game.players.length) {
      return;
    }
    $scope.winner = room.winner;
    //TASK-4: Implement getYou function
    $scope.you = getYou();
    //TASK-4: Implement getOpponent function
    $scope.opponent = getOpponent();

    $scope.status = room.status;

    //TASK-4: Implement getWinner function
    var winner = getWinner($scope.you, $scope.opponent);

    //TASK-4: Implement saving game status and winner to firebase
  });

  var shipsRectNo = 0;

  $scope.game = game;
  $scope.name = name;
  $scope.you = getYou();
  $scope.opponent = getOpponent();

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
  }

  function getYou() {
  }
  function getOpponent () {
  }
};
