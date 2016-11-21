module.exports = {
  name: 'game',
  params: {
    gameId: null,
    name: null
  },
  template: require('./views/game.html'),
  controller: require('./controllers/GameController'),
  resolve: {
    game: function($stateParams, GameRepository, GameManager) {
      return GameRepository.getGame($stateParams.gameId).then(function (game) {
        return GameManager.connect(game, $stateParams.name);
      });
    },

    name: function($stateParams) {
      return $stateParams.name;
    }
  }
};
