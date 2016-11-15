var game = angular.module('game', []);

game.state = require('./state');
game.factory('GameRepository', require('./services/game-repository'));
game.factory('GameManager', require('./services/game-manager'));
game.factory('GameAccessCheck', require('./services/game-acces-checker'));

module.exports = game;
