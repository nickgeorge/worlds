Star = function(message) {
  goog.base(this, message);

  this.size = message.size || 5;

  this.finalize();
};
goog.inherits(Star, LeafThing);

Star.prototype.advance = function(dt) {
  this.advanceBasics(dt);

  if (Math.random() < .1) {
    this.color = [
      Math.random(),
      Math.random(),
      Math.random(),
      1
    ];

    var speedX = Math.random() * 10;
    var speedY = Math.sqrt(100 - speedX*speedX);

    if (Math.random() < .5) speedX = -speedX;
    if (Math.random() < .5) speedY = -speedY;

    this.velocity[0] = speedX;
    this.velocity[1] = speedY;
  }
};


Star.positionBuffer = null;
Star.prototype.getPositionBuffer = function() {
  if (!Star.positionBuffer) {
    Star.positionBuffer = Env.gl.generateBuffer([
      0, 0, 5,
      this.size, 0, 0,
      this.size/4, this.size/4, 0,

      0, 0, 5,
      this.size/4, this.size/4, 0,
      0, this.size, 0,

      0, 0, 5,
      0, this.size, 0,
      -this.size/4, this.size/4, 0,

      0, 0, 5,
      -this.size/4, this.size/4, 0,
      -this.size, 0, 0,

      0, 0, 5,
      -this.size, 0, 0,
      -this.size/4, -this.size/4, 0,

      0, 0, 5,
      -this.size/4, -this.size/4, 0,
      0, -this.size, 0,

      0, 0, 5,
      0, -this.size, 0,
      this.size/4, -this.size/4, 0,

      0, 0, 5,
      this.size/4, -this.size/4, 0,
      this.size, 0, 0,
    ], 3);
  }
  return Star.positionBuffer;
};


Star.normalBuffer = null;
Star.prototype.getNormalBuffer = function() {
  if (!Star.normalBuffer) {
    Star.normalBuffer = Env.gl.generateBuffer([
      0, 0, 1,
      0.302,0.905,0.302,
      0.302,0.905,0.302,

      0, 0, 1,
      0.905,0.302,0.302,
      0.905,0.302,0.302,

      0, 0, 1,
      -0.905,0.302,0.302,
      -0.905,0.302,0.302,

      0, 0, 1,
      -0.302,0.905,0.302,
      -0.302,0.905,0.302,

      0, 0, 1,
      -0.302,-0.905,0.302,
      -0.302,-0.905,0.302,

      0, 0, 1,
      -0.905,-0.302,0.302,
      -0.905,-0.302,0.302,

      0, 0, 1,
      0.905,-0.302,0.302,
      0.905,-0.302,0.302,

      0, 0, 1,
      0.302,-0.905,0.302,
      0.302,-0.905,0.302,
    ], 3);
  }
  return Star.normalBuffer;
};


Star.textureBuffer = null;
Star.prototype.getTextureBuffer = function() {
  if (!Star.textureBuffer) {
    var textureCoords = [];
    for (var i = 0; i < this.vertexBuffer.numItems; i++) {
      textureCoords.push(0);
      textureCoords.push(0);
    };
    Star.textureBuffer = Env.gl.generateBuffer(textureCoords, 2);
  }
  return Star.textureBuffer;
};
