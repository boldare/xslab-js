module.exports = function ($q, $timeout, $mdDialog, GameAccessCheck, GamesRepository, GameShipsGenerator) {
  var joinGame = function (game, name) {
    //1st user join
    if (!game.players) {
      game.players = [];
    }
    game.players.push({
      name: name,
      ships: GameShipsGenerator.generate(),
      hits: {}
    });

    return GamesRepository.updatePlayers(game.$id, game.players).then(function () {
      return game;
    });
  };

  var connect = function(game, name) {
    return $q(function(resolve, reject) {
      var canJoin = GameAccessCheck.canUserJoin(game, name);
      if (!canJoin) {
        reject({ error: "You cant joint to game!" });
      } else {
        joinGame(game, name).then(resolve);
      }
    });
  };

  var getName = function () {
    return $q(function(resolve, reject) {
      $mdDialog.show($mdDialog.prompt()
        .title('What is your nickname')
        .placeholder('Nickname')
        .ok('Join!')
        .cancel('Go to list'))
        .then(function(name) {
            if (!name) {
              reject({ error: 'Please fill nickname!' });
            } else {
              resolve(name);
            }
          }, function() {

            reject({ error: 'Please fill nickname!' });
          }
        );
    });
  };

  return {
    connect: connect,
    getName: getName
  };
};
