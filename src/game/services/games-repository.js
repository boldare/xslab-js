var createBoard = function (name) {
  return {
    name: name,
    currentPlayerMove: 0,
    status: 'WAIT_FOR_PLAYERS'
  }
};

module.exports = function($timeout) {
  //Step-2-A: Mock implementation
  var roomList = [];

  return {
    getGames: function () {
      return roomList;
    },

    //Step-2-A: Mock implementation - implement create game method
    createGame: function(gameData)  {
      return $timeout(function () {
        return roomList.push(createBoard(gameData.name));
      }, 1);
    },

    //Step-2-A: Mock implementation - implement get game method
    getGame: function (id) {
      return $timeout(function () {
        return roomList[id];
      }, 1);
    }
  };
};
