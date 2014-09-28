Osterich = function(message) {

  goog.base(this, message);

  this.elementType = GL.TRIANGLES;

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

  // this.addPart(new Sphere({
  //   radius: 1,
  //   position: [-4, 10, 10],
  //   color: [1, 0, 0, 1],
  // }));

  this.addPart(this.bird);
  this.addPart(this.sledgeContainer);
};
goog.inherits(Osterich, Thing);
Types.registerType(Osterich, OsterichTypes.OSTERICH);

Osterich.prototype.advance = function(dt) {
  this.advanceBasics(dt);
};

Osterich.prototype.update = function(message) {
  this.velocity = message.velocity;
  this.position = message.position;
  this.upOrientation = message.upOrientation;
  this.sledgeContainer.setPitchOnly(message.sledgeAngle);
};


Osterich.readMessage = function(reader) {
  return {
    klass: Osterich,
    alive: reader.readInt8(),
    position: reader.readVec3(),
    velocity: reader.readVec3(),
    upOrientation: reader.readVec4(),
    color: reader.readVec4(),
    sledgeAngle: reader.readFloat32(),
  }
};


