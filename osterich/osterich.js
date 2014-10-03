Osterich = function(message) {

  goog.base(this, message);

  this.elementType = GL.TRIANGLES;

  this.bird = new DataThing({
    position: [0, 0, 0],
    data: OsterichData,
    uScale: 5,
    color: this.color,
    // texture: Math.random() > .5 ? null : Textures.get(TextureList.OSTRICH),
  });


  this.sledge = new DataThing({
    data: SledgeData,
    color: this.color,
    yaw: Math.PI/2,
    uScale: 1.4,
    position: [0, -13, 0]
  });

  this.sledgeContainer = new OffsetContainer({
    position: [-4, 15, 0],
    thing: this.sledge,
    pitch: 5*Math.PI/4,
  });

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
  this.setColor(message.color);
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


Osterich.prototype.getEyePosition = function(out) {
  return vec3.copy(out, this.position);
};

