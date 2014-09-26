Dongle = function(message) {

  goog.base(this, message);

  this.elementType = GL.TRIANGLES;

  this.color = [
    Math.random(),
    Math.random(),
    Math.random(),
    1
  ]

  this.bird = new DataThing({
    position: [0, 0, 0],
    data: OsterichData,
    uScale: 5,
    color: this.color,

  });
  var uScale = 5;
  var scale = vec3.fromValues(uScale, uScale, uScale);
  this.bird.scale = scale;


  this.sledge = new DataThing({
    data: SledgeData,
    color: this.color,
    yaw: Math.PI/2,
    position: [0, -13, 0]

  });

  this.sledgeContainer = new OffsetContainer({
    position: [-4, 15, 0],
    thing: this.sledge,
    pitch: 5*Math.PI/4,
    // rPitch: Math.PI,
  });
  var uScale = 1.4;
  var scale = vec3.fromValues(uScale, uScale, uScale);
  this.sledge.scale = scale;


  this.addPart(this.bird);
  this.addPart(this.sledgeContainer);
};
goog.inherits(Dongle, Thing);

Dongle.prototype.advance = function(dt) {
  this.advanceBasics(dt);
  if (this.velocity[0] || this.velocity[1] || this.velocity[2]) {
    quat.rotationTo(this.upOrientation,
        [0, 0, 1],
        vec3.normalize([], this.velocity));
  }
};

Dongle.prototype.update = function(message) {
  this.velocity = message.velocity;
  this.position = message.position;
  this.sledgeContainer.setPitchOnly(message.sledgeAngle);
};

