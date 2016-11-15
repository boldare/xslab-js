require('./style.css');

var gameList = angular.module('gameList', []);

gameList.state = require('./state');

gameList.directive('xsCreateGame', require('./directives/create-game'));
gameList.directive('xsGamesTable', require('./directives/games-table'));

gameList.factory('GamesRepository', require('./services/games-repository'));

module.exports = gameList;

