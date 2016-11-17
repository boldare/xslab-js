var game = angular.module('game', []);

game.state = require('./state');
game.factory('GameRepository', require('./services/game-repository'));
game.factory('GameManager', require('./services/game-manager'));
game.factory('GameAccessCheck', require('./services/game-acces-checker'));
game.factory('GameDrawer', require('./services/game-drawer'));
game.factory('ExplosionDrawer', require('./services/explosion-drawer'));
game.directive('gameUi', require('./directives/game'));
game.constant('HIT_STATUSES', {
  HIT: 'HIT',
  MISSED: 'MISSED',
  SUNK: 'SUNK',
});
game.constant('COLORS', require('./colors'));

module.exports = game;
