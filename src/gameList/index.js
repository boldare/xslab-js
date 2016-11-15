var gameList = angular.module('gameList', []);

gameList.state = {
  name: 'gameList',
  url: '/',
  template: require('./views/gameList.html'),
  resolve: {
    games: function($q) {
      return $q(function(resolve) {
        setTimeout(resolve, 2000);
      })
    }
  }
};

module.exports = gameList;
