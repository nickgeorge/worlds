Osterich = function(message) {
  goog.base(this, message);

  this.elementType = GL.TRIANGLES;

  // this.viewOrientation = quat.rotateY(quat.create(),
  //     quat.create(), Math.PI);

  this.viewOrientation = quat.create();

  this.bird = new DataThing({
    position: [0, 0, 0],
    data: OsterichData,
    uScale: 5,
    color: this.color,
    yaw: Math.PI,
    // texture: Math.random() > .5 ? null : Textures.get(TextureList.OSTRICH),
  });

  this.eyeOffset = [0, 13, 2];


  this.sledge = new DataThing({
    data: SledgeData,
    color: this.color,
    uScale: 1.4,
    position: [0, -13, 0],
    yaw: Math.PI/2,
  });

  this.sledgeContainer = new OffsetContainer({
    position: [4, 13, 0],
    thing: this.sledge,
  });

  this.addPart(this.bird);
  this.addPart(this.sledgeContainer);
};
goog.inherits(Osterich, Thing);
Types.registerType(Osterich, OsterichTypes.OSTERICH);

Osterich.prototype.advance = function(dt) {
  this.advanceBasics(dt);
  // this.sledgeContainer.advance(dt);
};

Osterich.prototype.update = function(message) {
  this.velocity = message.velocity;
  this.position = message.position;
  this.upOrientation = message.upOrientation;
  this.viewOrientation = message.viewOrientation;
  this.sledgeContainer.setPitchOnly(message.sledgeAngle);
  // this.setColor(message.color);
};


Osterich.readMessage = function(reader) {
  return {
    klass: Osterich,
    alive: reader.readInt8(),
    position: reader.readVec3(),
    velocity: reader.readVec3(),
    upOrientation: reader.readVec4(),
    color: reader.readVec4(),
    viewOrientation: reader.readVec4(),
    sledgeAngle: reader.readFloat32(),
  }
};


Osterich.prototype.getEyePosition = function(out) {
  return vec3.add(out, this.position,
      vec3.transformQuat([], this.eyeOffset, this.upOrientation));
};




Osterich.prototype.getViewOrientation = function() {
  var result = quat.create();
  return function() {
    return quat.multiply(result, this.upOrientation,
        this.viewOrientation);
  };
}();
