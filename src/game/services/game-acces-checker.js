module.exports = function () {
  return {
    isWaitingForPlayer: function(game) {
      return 'WAIT_FOR_PLAYERS'  === game.status;
    },

    canUserJoin: function(game, name) {
      var missingPlayers = game.players.filter(function(player) {
        return player.missing;
      });

      if (!missingPlayers.length) {
        return { error: 'Game is in progress!' };
      }

      var missingPlayer = missingPlayers.filter(function(player) {
        return player.name === name;
      });

      if (!missingPlayer.length) {
        return { error: 'You can not join to this game!' };
      }

      return true;
    }
  };
};
