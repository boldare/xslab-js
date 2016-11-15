module.exports = {
  name: 'gameList',
  url: '/',
  template: require('./views/gameList.html'),
  controller: function($scope, games) {
    $scope.games = games;
  },

  resolve: {
    games: function(GamesRepository) {
      return GamesRepository.getGames();
    }
  }
};
