require('./style.css');

var gameList = angular.module('gameList', ["firebase"]);

gameList.state = require('./state');

gameList.directive('xsCreateGame', require('./directives/create-game'));
gameList.directive('xsGamesTable', require('./directives/games-table'));

module.exports = gameList;
