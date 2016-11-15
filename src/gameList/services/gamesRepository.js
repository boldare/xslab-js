var gameListMock =  [{
  id: 1,
  status: 'WAIT_FOR_PLAYERS',
  players: [
    { name: 'Joe' }
  ]
}, {
  id: 2,
  status: 'WAIT_FOR_PLAYERS',
  players: []
}, {
  id: 3,
  status: 'IN_PROGRESS',
  players: [
    { name: 'John' },
    { name: 'Joe' }
  ]
}, {
    id: 4,
    status: 'FINISHED',
    players: [
      { name: 'Bob' },
      { name: 'Smith' }
    ]
  }
];

module.exports = function($timeout) {
  var games = gameListMock;

  return {
    getGames: function () {
      return $timeout(function () {
        return games;
      }, 1000)
    },
    createGame: function(gameData)  {
      games.push(gameData);

      return games;
    }
  }
};
