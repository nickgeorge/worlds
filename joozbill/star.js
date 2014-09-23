Star = function(message) {
  util.base(this, message);

  this.size = message.size || 5;
  this.createBuffers();
};
goog.inherits(Star, EasyThing);

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

Star.prototype.getVertexCoordinates = function() {
  return [
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
  ];
};

Star.prototype.getVertexNormals = function() {
  return [
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
  ];
};
