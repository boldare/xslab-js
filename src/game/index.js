var game = angular.module('game', []);

game.state = require('./state');
game.factory('GamesRepository', require('./services/games-repository'));
game.factory('GameManager', require('./services/game-manager'));
game.factory('GameAccessCheck', require('./services/game-acces-checker'));
game.factory('GameDrawer', require('./services/game-drawer'));
game.factory('ExplosionDrawer', require('./services/explosion-drawer'));
game.directive('gameUi', require('./directives/game'));
game.constant('HIT_STATUSES', {
  HIT: 'HIT',
  MISSED: 'MISSED',
  SUNK: 'SUNK'
});
game.constant('COLORS', require('./colors'));
game.constant('GRID_UNITS', 10); // @ToDo make it configurable on game creation

module.exports = game;
