module.exports = {
  name: 'gameRoom',
  url: '/room/{gameId}',
  controller: function($state, game, name) {
    $state.go('game', { gameId: game.id, name: name });
  },

  resolve: {
    game: function($stateParams, GameRepository) {
      return GameRepository.getGame($stateParams.gameId);
    },

    name: function ($q, game, GameManager) {
      return $q(function (resolve, reject) {
        if ('IN_PROGRESS' === game.status) {
          reject({ error: 'You can not join to game which is already in progress.' });
        }

        if ('FINISHED' === game.status) {
          reject({ error: 'You can not join to game which is finished.' });
        }

        GameManager.getName().then(resolve, reject);
      });
    }
  }
};
