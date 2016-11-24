var createBoard = function (name) {
  return {
    name: name,
    currentPlayerMove: 0,
    status: 'WAIT_FOR_PLAYERS'
  }
};

module.exports = function($q, $timeout, $firebaseArray, firebase, GameShipsGenerator) {
  var roomListRef = firebase.database().ref().child("roomList");
  var roomList = $firebaseArray(roomListRef);

  return {
    getGames: function () {
      return roomList;
    },

    createGame: function(gameData)  {
      return roomList.$add(createBoard(gameData.name, GameShipsGenerator)).then(function (ref) {
        return ref.key;
      });
    },

    getGame: function (id) {
      return roomList
        .$loaded()
        .then(function(roomList) {
          return roomList.$getRecord(id);
        })
    },

    areTwoPlayers: function (gameId) {
      var index = roomList.$indexFor(gameId);

      return 2 === roomList[index].players.length;
    },

    updatePlayers: function (gameId, players) {
      return roomList
        .$loaded()
        .then(function(roomList) {
          var index = roomList.$indexFor(gameId);
          roomList[index].players = players;
          if (2 === roomList[index].players.length) {
            roomList[index].status = 'IN_PROGRESS'
          }

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

          if (data.hit){
            roomList[index].players[roomList[index].currentPlayerMove].hits['' + data.hit.x + data.hit.y] = data.hit;
            roomList[index].currentPlayerMove = (roomList[index].currentPlayerMove + 1) % 2;
          }

          roomList.$save(index).then(function(ref) {});
        });
    }
  };
};
