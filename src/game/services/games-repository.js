var createBoard = function (name) {
  // random ships generator
  return {
    name: name,
    currentPlayerMove: 0,
    status: 'WAIT_FOR_PLAYERS',
    players: [
      {
        name: 'Kris',
        missing: true,
        ships: [
          { 32: { x:3, y:2 }, 33: { x:3, y:3 } },
          { 65: { x:6, y:5 }, 66: { x:6, y:6 } },
          { 73: { x:7, y:3 }, 74: { x:7, y:4 }, 75: { x:7, y:5 } },
        ],
        hits: {
          200: { x:200, y:200, state: 'HIT' }
        }
      },
      {
        name: 'Bob',
        missing: true,
        ships: [
          { 12: { x:1, y:2 }, 22: { x:2, y:2 } },
          { 55: { x:5, y:5 }, 56: { x:5, y:6 } },
          { 33: { x:3, y:3 }, 34: { x:3, y:4 }, 35: { x:3, y:5 } },
        ],
        hits: {
          200: { x:200, y:200, state: 'HIT' }
        }
      }
    ]
  }
};

module.exports = function($q, $timeout, $firebaseArray, firebase) {
  var roomListRef = firebase.database().ref().child("roomList");
  var roomList = $firebaseArray(roomListRef);

  return {
    getGames: function () {
      return roomList;
    },

    createGame: function(gameData)  {
      return roomList.$add(createBoard(gameData.name)).then(function (ref) {
        return ref.key;
      });
    },

    getGame: function (id) {
      return $q(function(resolve, reject) {
        roomList
          .$loaded()
          .then(function(roomList) {
            resolve(roomList.$getRecord(id));
          })
          .catch(function(error) {
            reject(error);
          });
      });
    },

    areTwoPlayers: function (gameId) {
      var index = roomList.$indexFor(gameId);

      var count = 0;
      roomList[index].players.map(function (player) {
        if (!player.missing) count++;
      });

      return count > 1;
    },

    updatePlayer: function (gameId, playerName) {
      return roomList
        .$loaded()
        .then(function(roomList) {
          var index = roomList.$indexFor(gameId);

          var player = roomList[index].players.filter(function (player) {
            return player.name == playerName;
          });

          player.missing = false;

          return roomList.$save(index);
        });
    },

    whoseTurn: function (gameId, playerName) {
      return roomList
        .$loaded()
        .then(function(roomList) {
          var index = roomList.$indexFor(gameId);

          if (!angular.isDefined(roomList[index].currentPlayerMove)) {
            return true;
          }

          return roomList[index].players[roomList[index].currentPlayerMove].name == playerName;
        });
    },

    updateGame: function (id, data) {
      roomList
        .$loaded()
        .then(function(roomList) {
          var index = roomList.$indexFor(id);

          if (!angular.isDefined(roomList[index].currentPlayerMove)) {
            roomList[index].currentPlayerMove = 0;
          }

          if (!angular.isDefined(roomList[index].players[roomList[index].currentPlayerMove].hits)) {
            roomList[index].players[roomList[index].currentPlayerMove].hits = {};
          }

          roomList[index].players[roomList[index].currentPlayerMove].hits['' + data.hit.x + data.hit.y] = data.hit;
          roomList[index].currentPlayerMove = (roomList[index].currentPlayerMove + 1) % 2;

          roomList.$save(index).then(function(ref) {});
        });
    },

    updateGameStatus: function (gameId, status) {
      return roomList
        .$loaded()
        .then(function(roomList) {
          var index = roomList.$indexFor(gameId);

          roomList[index].status = status;

          return roomList.$save(index);
        });
    }
  };
};
