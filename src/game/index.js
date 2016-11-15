var game = angular.module('game', []);

game.state = {
  name: 'game',
  url: '/game/{gameId}',
  template: require('./views/game.html'),
  controller: function($scope, game) {
    console.log(game);

  },
  resolve: {
    game: function($stateParams, GameRepository) {
      return GameRepository.getGame($stateParams.gameId);
    }
  }
};

game.factory('GameRepository', require('./services/gameRepository'));

module.exports = game;
