module.exports = function ($q, $timeout, $mdDialog, GameAccessCheck, GamesRepository) {
  var joinGame = function (game, name) {
    game.players = game.players.map(function (player) {
      if (player.name === name) {
        player.missing = false;
      }

      return player;
    });

    return GamesRepository.updatePlayer(game.$id, name).then(function () {
      return game;
    });
  };

  var connect = function(game, name) {
    return $q(function(resolve, reject) {
      var access = GameAccessCheck.canUserJoin(game, name);
      if (access.error) {
        reject({ error: access.error });
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
        .textContent('All of the banks have agreed to forgive you your debts.')
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
