var gameMock =  {
  id: 1,
  status: 'WAIT_FOR_PLAYERS',
  players: [
    {
      name: 'Joe',
      ships: [
        { 12: { x:1, y:2 }, 22: { x:2, y:2 } },
        { 55: { x:5, y:5 }, 56: { x:5, y:6 } },
        { 33: { x:3, y:3 }, 34: { x:3, y:4 }, 35: { x:3, y:5 } },
      ],
      hits: {
        55: { x:5, y:5, state: 'HIT' },
        45: { x:4, y:5, state: 'MISSED' },
        12: { x:1, y:2, state: 'HIT' }
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
        55: { x:5, y:5, state: 'HIT' },
        45: { x:4, y:5, state: 'MISSED' },
        12: { x:1, y:2, state: 'HIT' }
      }
    }
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
