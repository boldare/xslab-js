module.exports = function (COLORS) {
  var particles = [];

  function drawExplosion (ctx, hit, mousePosition, drawCardFn) {
    var frame = 0;

    if (!hit) {
      return;
    }

    createExplosion(mousePosition, COLORS.ship);
    createExplosion(mousePosition, COLORS[hit.state.toLowerCase()]);

    function renderExplosion () {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      drawCardFn();

      for (var i=0; i < particles.length; i++) {
        particles[i].draw(ctx);
      }

      (frame += 1) < 40 ? requestAnimationFrame(renderExplosion) : cancelAnimationFrame(renderExplosion);
    }

    requestAnimationFrame(renderExplosion);
  }

  function createExplosion (mousePosition, color) {
    var minSize = 10;
    var maxSize = 30;
    var count = 10;
    var minSpeed = 60.0;
    var maxSpeed = 200.0;
    var minScaleSpeed = 1.0;
    var maxScaleSpeed = 4.0;

    for (var angle=0; angle < 360; angle += Math.round(360 / count)) {
      var particle = new Particle();
      var speed = randomFloat(minSpeed, maxSpeed);

      particle.x = mousePosition.x;
      particle.y = mousePosition.y;
      particle.color = color;
      particle.radius = randomFloat(minSize, maxSize);
      particle.scaleSpeed = randomFloat(minScaleSpeed, maxScaleSpeed);
      particle.velocityX = speed * Math.cos(angle * Math.PI / 180.0);
      particle.velocityY = speed * Math.sin(angle * Math.PI / 180.0);

      particles.push(particle);
    }

    function randomFloat (min, max)
    {
      return min + Math.random()*(max-min);
    }
  }

  function Particle () {
    this.scale = 1.0;
    this.x = 0;
    this.y = 0;
    this.radius = 20;
    this.color = "#000";
    this.velocityX = 0;
    this.velocityY = 0;
    this.scaleSpeed = 0.5;
    this.updateTimeInSeconds = 24 / 1000;

    this.update = function() {
      // shrinking
      this.scale -= this.scaleSpeed * this.updateTimeInSeconds;

      if (this.scale <= 0) {
        this.scale = 0;
      }

      // moving away from explosion center
      this.x += this.velocityX * this.updateTimeInSeconds;
      this.y += this.velocityY * this.updateTimeInSeconds;
    };

    this.draw = function(ctx) {
      this.update();

      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.scale, this.scale);

      // drawing a filled circle in the particle's local space
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI*2, true);
      ctx.closePath();

      ctx.fillStyle = this.color;
      ctx.fill();

      ctx.restore();
    };
  }

  return {
    drawExplosion: drawExplosion
  }
};
