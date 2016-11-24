module.exports = {
  name: 'game',
  params: {
    gameId: null,
    name: null
  },
  template: require('./views/game.html'),
  controller: require('./controllers/game-controller'),
  resolve: {
    game: function($stateParams, GamesRepository, GameManager) {
      return GamesRepository.getGame($stateParams.gameId).then(function (game) {
        return GameManager.connect(game, $stateParams.name);
      });
    },

    name: function($stateParams) {
      return $stateParams.name;
    }
  }
};
