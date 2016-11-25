module.exports = function () {
  return {
    isWaitingForPlayer: function(game) {
      return 'WAIT_FOR_PLAYERS'  === game.status;
    },

    canUserJoin: function(game, name) {
      return true;

      if (!game.players) {
        return true;
      }

      return !game.players.find(function (player) {
        return player.name == name
      });
    }
  };
};
