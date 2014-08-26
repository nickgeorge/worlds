Border = function(message) {
  message.elementType = GL.LINE_LOOP;
  util.base(this, message);

  this.bottomLeft = message.bottomLeft;
  this.topRight = message.topRight;

  this.createBuffers();
};
util.inherits(Border, EasyThing);

Border.prototype.getVertexCoordinates = function() {
  return [
    this.bottomLeft[0], this.bottomLeft[1], 0,
    this.bottomLeft[0], this.topRight[1], 0,
    this.topRight[0], this.topRight[1], 0,
    this.topRight[0], this.bottomLeft[1], 0,
    this.bottomLeft[0], this.bottomLeft[1], 0,
  ];
};
