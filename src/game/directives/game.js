module.exports = function (GameDrawer, ExplosionDrawer) {
  return {
    restrict: 'E',
    template: require('../views/game-ui.html'),
    scope: {
      ships: '=',
      hits: '=',
      name: '=',
      onClick: '=',
      winner: '='
    },
    link: function ($scope, $el) {
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
      }

      function shouldPreventMouseEvent (mousePosition) {
        return !$scope.onClick || !GameDrawer.isMouseInCard(mousePosition);
      }

      function drawCard () {
        GameDrawer.drawBg(ctx);
        GameDrawer.drawShips(ctx, $scope.ships);
        GameDrawer.drawHits(ctx, $scope.hits);
      }

      $scope.handleHit = function (e) {
        var mousePosition = GameDrawer.getMousePos(canvas, e);
        var cardMeasurements = GameDrawer.getCardMeasurements(ctx);

        if ($scope.winner || shouldPreventMouseEvent(mousePosition)) {
          return;
        }

        var hit = $scope.onClick({
          x: Math.round(mousePosition.x / cardMeasurements.rectWidth),
          y: Math.round(mousePosition.y / cardMeasurements.rectHeight)
        });

        ExplosionDrawer.drawExplosion(ctx, hit, mousePosition, drawCard);
      }

      drawCard();
    }
  };
};
