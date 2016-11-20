module.exports = function gameDrawer (COLORS, GRID_UNITS) {
  var canvasOffsetForNotation = 20;

  function drawGameBoard (ctx) {
    var gameBoardMeasurements = getGameBoardMeasurements(ctx);

    ctx.fillStyle = COLORS.water;
    ctx.fillRect(
      canvasOffsetForNotation,
      canvasOffsetForNotation,
      gameBoardMeasurements.width,
      gameBoardMeasurements.height
    );

    drawGrid(ctx);
    drawGridNotation(ctx);
  }

  function getGameBoardMeasurements (ctx) {
    return {
      width: ctx.canvas.width - canvasOffsetForNotation,
      height: ctx.canvas.height - canvasOffsetForNotation,
      gridWidth: (ctx.canvas.width - canvasOffsetForNotation) / GRID_UNITS,
      gridHeight: (ctx.canvas.height - canvasOffsetForNotation) / GRID_UNITS
    }
  }

  function drawGrid (ctx) {
    var gameBoardMeasurements = getGameBoardMeasurements(ctx);
    var pointY;
    var pointX;

    ctx.strokeStyle = COLORS.waterStroke
    ctx.strokeWidth = 1;
    ctx.beginPath();

    drawInLoopOverGrid(function (i) {
      pointY = i * gameBoardMeasurements.gridHeight + canvasOffsetForNotation;
      pointX = i * gameBoardMeasurements.gridWidth + canvasOffsetForNotation;

      ctx.moveTo(canvasOffsetForNotation, pointY);
      ctx.lineTo(gameBoardMeasurements.width + canvasOffsetForNotation, pointY);

      ctx.moveTo(pointX, canvasOffsetForNotation);
      ctx.lineTo(pointX, gameBoardMeasurements.height + canvasOffsetForNotation);
    })

    ctx.stroke();
  }

  function drawInLoopOverGrid (fn) {
    for (var i = 0; i < GRID_UNITS; i += 1) {
      fn(i);
    }
  }

  function drawGridNotation (ctx) {
    var gameBoardMeasurements = getGameBoardMeasurements(ctx);
    var scaleLetters = 'ABCDEFGHIJKLMNOPRSTU' // @ToDo fromChar?

    ctx.font = '12px "sans serif"';
    ctx.fillStyle = COLORS.font;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    drawInLoopOverGrid(function (i) {
      ctx.fillText(i + 1, (i * gameBoardMeasurements.gridWidth + gameBoardMeasurements.gridWidth / 2) + canvasOffsetForNotation, 0);
    });

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    drawInLoopOverGrid(function (i) {
      ctx.fillText(scaleLetters[i], 0, (i * gameBoardMeasurements.gridHeight + gameBoardMeasurements.gridHeight / 2) + canvasOffsetForNotation);
    });
  }

  function drawShips (ctx, ships) {
    ctx.fillStyle = COLORS.ship;

    angular.forEach(ships, function (points) {
      angular.forEach(points, function (point) {
        ctx.fillRect.apply(ctx, getRectByBoardCoordinates(ctx, point));
      });
    });
  }

  function drawHits (ctx, hits) {
    angular.forEach(hits, function (point) {
      ctx.fillStyle = COLORS[point.state.toLowerCase()];
      ctx.fillRect.apply(ctx, getRectByBoardCoordinates(ctx, point));
    });
  }

  function getRectByBoardCoordinates (ctx, coords) {
    var gameBoardMeasurements = getGameBoardMeasurements(ctx);

    return [
      (coords.x - 1) * gameBoardMeasurements.gridWidth + canvasOffsetForNotation,
      (coords.y - 1) * gameBoardMeasurements.gridHeight + canvasOffsetForNotation,
      gameBoardMeasurements.gridWidth,
      gameBoardMeasurements.gridHeight
    ]
  }

  function getMousePos(canvas, e) {
    var rect = canvas.getBoundingClientRect();

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  function getRectFromMousePos (ctx, mousePos) {
    var gameBoardMeasurements = getGameBoardMeasurements(ctx);

    return getRectByBoardCoordinates(ctx, {
      x: Math.round(mousePos.x / gameBoardMeasurements.gridWidth),
      y: Math.round(mousePos.y / gameBoardMeasurements.gridHeight)
    });
  }

  function clearCard (ctx) {
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
  }

  function isMouseInCard (mousePosition) {
    return (
        mousePosition.x >= canvasOffsetForNotation &&
        mousePosition.y >= canvasOffsetForNotation
    );
  }

  function highlightRect (ctx, mousePosition) {
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillRect.apply(ctx, getRectFromMousePos(ctx, mousePosition));
  }

  return {
    clearCard: clearCard,
    drawGameBoard: drawGameBoard,
    drawHits: drawHits,
    drawShips: drawShips,
    getMousePos: getMousePos,
    isMouseInCard: isMouseInCard,
    highlightRect: highlightRect,
    getGameBoardMeasurements: getGameBoardMeasurements,
    getRectFromMousePos: getRectFromMousePos
  };
};
