var gameList = angular.module('gameList', []);

gameList.state = {
  name: 'gameList',
  url: '/',
  template: require('./views/gameList.html'),
  controller: function($scope, games) {
    console.log(games);

  },
  resolve: {
    games: function(GamesRepository) {
      return GamesRepository.getGames();
    }
  }
};

gameList.factory('GamesRepository', require('./services/gamesRepository'));

module.exports = gameList;

