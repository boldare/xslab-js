var gameMock =  {
  id: 1,
  status: 'WAIT_FOR_PLAYERS',
  players: [
    { name: 'Joe' },
    { name: 'Bob', missing: true }
  ]
};

module.exports = function($timeout) {
  return {
    getGame: function (id) {
      return $timeout(function () {
        return gameMock;
      }, 2000);
    }
  };
};
