var createBoard = function (name) {
  return {
    name: name,
    currentPlayerMove: 0,
    status: 'WAIT_FOR_PLAYERS'
  }
};

module.exports = function($q, $timeout, $firebaseArray, firebase, GameShipsGenerator) {
  //Step-2-B: Adding firebase synchronization - collection initialization

  return {
    getGames: function () {
    },

    //Step-2-B: Adding firebase synchronization - implement createGame method
    createGame: function(gameData)  {
    },

    //Step-2-B: Adding firebase synchronization - implement getGame method
    getGame: function (id) {
    }
  };
};
