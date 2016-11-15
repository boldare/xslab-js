var gameListMock =  [{
  id: 1,
  status: 'WAIT_FOR_PLAYERS',
  name: 'First Game',
  players: [
    { name: 'Joe' }
  ]
}, {
  id: 2,
  name: 'Some other game',
  status: 'WAIT_FOR_PLAYERS',
  players: []
}, {
  id: 3,
  name: 'I m the boss',
  status: 'IN_PROGRESS',
  players: [
    { name: 'John' },
    { name: 'Joe' }
  ]
}, {
  id: 4,
  name: 'Battle',
  status: 'FINISHED',
  players: [
    { name: 'Bob' },
    { name: 'Smith' }
  ],
  winner: 'Bob'
}, {
  id: 5,
  name: 'Started / missing',
  status: 'WAIT_FOR_PLAYERS',
  players: [
    { name: 'Rob', missing: true },
    { name: 'Elise', missing: true }
  ]
}];

var createGame = function(gameData) {
  return {
    id: 99,
    status: 'WAIT_FOR_PLAYERS',
    name: gameData.name,
    players: []
  };
};

module.exports = function($timeout) {
  var games = gameListMock;

  return {
    getGames: function () {
      return $timeout(function () {
        return games;
      }, 1);
    },

    createGame: function(gameData)  {
      return $timeout(function () {
        var game = createGame(gameData);
        games.push(game);

        return game;
      }, 1);
    }
  };
};
