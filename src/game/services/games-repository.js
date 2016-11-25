var createBoard = function (name) {
  return {
    name: name,
    currentPlayerMove: 0,
    status: 'WAIT_FOR_PLAYERS'
  }
};

module.exports = function($q, $timeout, $firebaseArray, firebase, GameShipsGenerator) {
  //Step-2-B: Adding firebase synchronization
  var roomListRef = firebase.database().ref().child("roomList");
  var roomList = $firebaseArray(roomListRef);

  return {
    getGames: function () {
      return roomList;
    },

    //Step-2-B: Adding firebase synchronization
    createGame: function(gameData)  {
      return roomList.$add(createBoard(gameData.name, GameShipsGenerator)).then(function (ref) {
        return ref.key;
      });
    },

    //Step-2-B: Adding firebase synchronization
    getGame: function (id) {
      return roomList
        .$loaded()
        .then(function(roomList) {
          return roomList.$getRecord(id);
        })
    }
  };
};
