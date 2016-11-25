module.exports = function() {
  return {
    template: require('../views/createGame.html'),
    controller: function ($scope, $state, $mdDialog, $mdToast, GamesRepository) {
      $scope.createGame = function() {
        var confirm = $mdDialog.prompt()
          .title('Create new game?')
          .textContent('Type the name of game.')
          .placeholder('Name')
          .ok('Okay!')
          .cancel('Nope');

        $mdDialog.show(confirm).then(function(gameName) {
          if (!gameName) {
            return;
          }

          //Step-2-A: Mock implementation
          GamesRepository.createGame({ name: gameName })
            .then(function () {
              $mdToast.show(
                $mdToast
                  .simple()
                  .highlightClass('md-accent')
                  .textContent('Game created! Now you can join game!')
                  .hideDelay(3000)
              );
            }, function() {
              $mdToast.show(
                $mdToast
                  .simple()
                  .highlightClass('md-accent')
                  .textContent('An error occurred when creating a game!')
                  .hideDelay(3000)
              );
            });
        });
      };
    }
  };
};
