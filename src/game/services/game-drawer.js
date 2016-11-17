var canvasMargin = 20
var gridUnits = 10

module.exports = function gameDrawer (COLORS) {
  function drawBg (ctx) {
    var cardMeasurements = getCardMeasurements(ctx);

    ctx.fillStyle = COLORS.water;
    ctx.fillRect(
      canvasMargin,
      canvasMargin,
      cardMeasurements.width,
      cardMeasurements.height
    );

    drawGrid(ctx);
    drawGridUnits(ctx);
  }

  function getCardMeasurements (ctx) {
    return {
      width: ctx.canvas.width - canvasMargin,
      height: ctx.canvas.height - canvasMargin,
      rectWidth: (ctx.canvas.width - canvasMargin) / gridUnits,
      rectHeight: (ctx.canvas.height - canvasMargin) / gridUnits
    }
  }

  function drawGrid (ctx) {
    var cardMeasurements = getCardMeasurements(ctx);
    var pointY;
    var pointX;

    ctx.strokeStyle = COLORS.waterStroke
    ctx.strokeWidth = 1;
    ctx.beginPath();

    drawInLoopOverGrid(function (i) {
      pointY = i * cardMeasurements.rectHeight + canvasMargin;
      pointX = i * cardMeasurements.rectWidth + canvasMargin;

      ctx.moveTo(canvasMargin, pointY);
      ctx.lineTo(cardMeasurements.width + canvasMargin, pointY);

      ctx.moveTo(pointX, canvasMargin);
      ctx.lineTo(pointX, cardMeasurements.height + canvasMargin);
    })

    ctx.stroke();
  }

  function drawInLoopOverGrid (fn) {
    for (var i = 0; i < gridUnits; i += 1) {
      fn(i);
    }
  }

  function drawGridUnits (ctx) {
    var cardMeasurements = getCardMeasurements(ctx);
    var scaleLetters = 'ABCDEFGHIJKLMNOPRSTU' // @ToDo fromChar?

    ctx.font = '12px "sans serif"';
    ctx.fillStyle = COLORS.font;

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    drawInLoopOverGrid(function (i) {
      ctx.fillText(i + 1, (i * cardMeasurements.rectWidth + cardMeasurements.rectWidth / 2) + canvasMargin, 0);
    });

    ctx.textBaseline = 'middle';
    ctx.textAlign = 'left';
    drawInLoopOverGrid(function (i) {
      ctx.fillText(scaleLetters[i], 0, (i * cardMeasurements.rectHeight + cardMeasurements.rectHeight / 2) + canvasMargin);
    });
  }

  function drawShips (ctx, ships) {
    ctx.fillStyle = COLORS.ship;

    angular.forEach(ships, function (points) {
      angular.forEach(points, function (point) {
        ctx.fillRect.apply(ctx, getRectByCardCoordinate(ctx, point));
      })
    })
  }

  function drawHits (ctx, hits) {
    angular.forEach(hits, function (point) {
      ctx.fillStyle = COLORS[point.state.toLowerCase()];
      ctx.fillRect.apply(ctx, getRectByCardCoordinate(ctx, point));
    })
  }

  function getRectByCardCoordinate (ctx, coords) {
    var cardMeasurements = getCardMeasurements(ctx);

    return [
      (coords.x - 1) * cardMeasurements.rectWidth + canvasMargin,
      (coords.y - 1) * cardMeasurements.rectHeight + canvasMargin,
      cardMeasurements.rectWidth,
      cardMeasurements.rectHeight
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
    var cardMeasurements = getCardMeasurements(ctx);

    return getRectByCardCoordinate(ctx, {
      x: Math.round(mousePos.x / cardMeasurements.rectWidth),
      y: Math.round(mousePos.y / cardMeasurements.rectHeight),
    });
  }

  function clearCard (ctx) {
    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height)
  }

  function isMouseInCard (mousePosition) {
    return (
        mousePosition.x >= canvasMargin &&
        mousePosition.y >= canvasMargin
    );
  }

  function highlightRect (ctx, mousePosition) {
    ctx.fillStyle = 'rgba(255,255,255,0.8)';
    ctx.fillRect.apply(ctx, getRectFromMousePos(ctx, mousePosition));
  }

  return {
    clearCard: clearCard,
    drawBg: drawBg,
    drawHits: drawHits,
    drawShips: drawShips,
    getMousePos: getMousePos,
    isMouseInCard: isMouseInCard,
    highlightRect: highlightRect,
    getCardMeasurements: getCardMeasurements,
    getRectFromMousePos: getRectFromMousePos
  };
};
