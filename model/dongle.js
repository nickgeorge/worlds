Dongle = function(message) {
  goog.base(this, message);

  this.size = message.size || 5;

  this.uScale = 5;

  this.scale = vec3.fromValues(this.uScale, this.uScale, this.uScale);
  this.color = [0, 1, 0, 1];
  this.elementType = GL.TRIANGLES;
  this.finalize();
};
goog.inherits(Dongle, LeafThing);

Dongle.prototype.advance = function(dt) {
  this.advanceBasics(dt);

  // if (Math.random() < .1) {
  //   this.color = [
  //     Math.random(),
  //     Math.random(),
  //     Math.random(),
  //     1
  //   ];

  //   var speedX = Math.random() * 10;
  //   var speedY = Math.sqrt(100 - speedX*speedX);

  //   if (Math.random() < .5) speedX = -speedX;
  //   if (Math.random() < .5) speedY = -speedY;

  //   this.velocity[0] = speedX;
  //   this.velocity[1] = speedY;
  // }
};


Dongle.positionBuffer = null;
Dongle.prototype.getPositionBuffer = function() {
  if (!Dongle.positionBuffer) {
    Dongle.positionBuffer = Env.gl.generateBuffer(Data.vertexCoordinates, 3);
  }
  return Dongle.positionBuffer;
};


Dongle.normalBuffer = null;
Dongle.prototype.getNormalBuffer = function() {
  if (!Dongle.normalBuffer) {
    Dongle.normalBuffer = Env.gl.generateBuffer(Data.normalCoordinates, 3);
  }
  return Dongle.normalBuffer;
};

Dongle.textureBuffer = null;
Dongle.prototype.getTextureBuffer = function() {
  if (!Dongle.textureBuffer) {
    Dongle.textureBuffer = Env.gl.generateBuffer(Data.normalCoordinates, 3);
  }
  return Dongle.textureBuffer;
};

