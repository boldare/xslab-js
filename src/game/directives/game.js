module.exports = function ($mdToast, GameDrawer, ExplosionDrawer, GamesRepository, HIT_STATUSES) {
  return {
    restrict: 'E',
    template: require('../views/game-board.html'),
    scope: {
      you: '=',
      opponent: '=',
      ships: '=',
      hits: '=',
      name: '=',
      onClick: '=',
      winner: '='
    },
    link: function ($scope, $el) {
      $scope.$watchCollection('hits', function (newV, oldV) {
        GameDrawer.clearCard(ctx);
        drawCard();
      });

      var canvas = $el.find('canvas')[0];
      var ctx = canvas.getContext('2d');

      canvas.width = 400;
      canvas.height = 400;

      $scope.highlight = function (e) {
        var mousePosition = GameDrawer.getMousePos(canvas, e);

        if (shouldPreventMouseEvent(mousePosition)) {
          return;
        }

        GameDrawer.clearCard(ctx);
        drawCard();
        GameDrawer.highlightRect(ctx, mousePosition);
      };

      function shouldPreventMouseEvent (mousePosition) {
        return !$scope.onClick || !GameDrawer.isMouseInCard(mousePosition);
      }

      function drawCard () {
        GameDrawer.drawGameBoard(ctx);
        GameDrawer.drawShips(ctx, $scope.ships);
        GameDrawer.drawHits(ctx, $scope.hits);
      }

      $scope.handleHit = function (e) {
        if ($scope.winner) {
          $mdToast.show(
            $mdToast
              .simple()
              .highlightClass('md-accent')
              .textContent('Game finished! You cannot make moves!')
              .hideDelay(3000)
          );

          return;
        }

        if (!GamesRepository.areTwoPlayers($scope.$parent.game.$id)) {
          $mdToast.show(
            $mdToast
              .simple()
              .highlightClass('md-accent')
              .textContent('You cannot make a move! Wait for second player!')
              .hideDelay(3000)
          );

          return;
        }

        GamesRepository
          .whoseTurn($scope.$parent.game.$id, $scope.you.name)
          .then(function (result){
            if (result) {
              $mdToast.show(
                $mdToast
                  .simple()
                  .highlightClass('md-accent')
                  .textContent('Wait for a opponent move!')
                  .hideDelay(3000)
              );

              return;
            }


            var mousePosition = GameDrawer.getMousePos(canvas, e);
            var boardMeasurements = GameDrawer.getGameBoardMeasurements(ctx);

            if ($scope.winner || shouldPreventMouseEvent(mousePosition)) {
              return;
            }

            var hit = $scope.onClick({
              x: Math.round(mousePosition.x / boardMeasurements.gridWidth),
              y: Math.round(mousePosition.y / boardMeasurements.gridHeight)
            });

            GamesRepository.updateGame($scope.$parent.game.$id, {hit: hit});

            // @ToDo show explosion on own board also
            ExplosionDrawer.drawExplosion(ctx, hit, mousePosition, drawCard);
          });
      };

      drawCard();
    }
  };
};
