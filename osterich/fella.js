Fella = function(message) {

  this.legAngle = (Math.random()*2 - 1) * Fella.MAX_LEG_ANGLE;
  this.stepDirection = 1;
  this.speed = message.speed || 5;

  message.uScale = 5;
  goog.base(this, message);

  this.velocity = vec3.fromValues(0, 0, this.speed);

  this.color = vec4.nullableClone(message.color);

  this.health = 100;

  this.head = null;
  this.torso = null;
  this.rightLeg = null;
  this.leftLeg = null;
  this.rightArm = null;
  this.leftArm = null;
  this.deathSpeed = 20;
  this.buildBody();
};
goog.inherits(Fella, Thing);
Types.registerType(Fella, OsterichTypes.FELLA);

Fella.MAX_LEG_ANGLE = Math.PI/8;


Fella.prototype.advance = function(dt) {
  this.advanceBasics(dt);
  if (!this.alive) return;
  this.legAngle += this.stepDirection * dt;

  if (this.legAngle >= Fella.MAX_LEG_ANGLE) {
    this.stepDirection = -1;
  }
  if (this.legAngle <= -Fella.MAX_LEG_ANGLE) {
    this.stepDirection = 1;
  }

  this.leftLeg.setPitchOnly(this.legAngle);
  this.rightLeg.setPitchOnly(-this.legAngle);
  this.rightArm.setPitchOnly(this.legAngle);
  this.leftArm.setPitchOnly(-this.legAngle);
};


Fella.prototype.getOuterRadius = function() {
  return 8;
};

Fella.prototype.die = function() {

  // Sounds.getAndPlay(SoundList.GLASS);
  this.alive = false;
  this.velocity = [0, 0, 0];
  this.rYaw = this.rPitch = this.rRoll = 0;
  this.eachPart(function(part) {
    this.alive = false;
    part.isStatic = false;
    var vTheta = Math.random()*2*Math.PI;
    vec3.random(part.velocity, this.deathSpeed);
  });
  Env.world.effects.remove(this.healthBar);
};


Fella.prototype.buildBody = function() {
  this.leftLeg = new OffsetBox({
    size: [.2, 1, .2],
    color: this.color,
    parentScale: this.scale,
    offset: [0, -.5, 0],
    name: "left leg",
    position: [.1875, 1.1, 0],
    isStatic: true,
  });

  this.rightLeg = new OffsetBox({
    size: [.2, 1, .2],
    color: this.color,
    parentScale: this.scale,
    offset: [0, -.5, 0],
    name: "left leg",
    position: [-.1875, 1.1, 0],
    isStatic: true,
  });

  this.leftArm = new OffsetBox({
    size: [.115, .9, .115],
    position: [.355, 1.95, 0],
    color: this.color,
    parentScale: this.scale,
    offset: [0, -.45, 0],
    roll: Math.PI/32,
    name: "left leg",
    isStatic: true,
    damageMultiplier: .85
  });
  this.rightArm = new OffsetBox({
    size: [.115, .9, .115],
    position: [-.355, 1.95, 0],
    color: this.color,
    parentScale: this.scale,
    offset: [0, -.45, 0],
    roll: -Math.PI/32,
    name: "right leg",
    isStatic: true,
    damageMultiplier: .85
  });

  this.head = new DataThing({
    data: HeadData,
    position: [0, 2.2, 0],
    name: "head",
    color: this.color,
    parentScale: this.scale,
    isStatic: true,
    damageMultiplier: 4,
    uScale: .012
  });

  this.torso = new OffsetBox({
    size: [.6, 1, .2],
    position: [0, 1.5, 0],
    color: this.color,
    parentScale: this.scale,
    name: "torso",
    textureCounts: [1, 1],
    isStatic: true,
    damageMultiplier: 1.7,
  });

  this.addParts([
    this.head,
    this.torso,
    this.rightLeg,
    this.leftLeg,
    this.rightArm,
    this.leftArm,
  ]);
};


Fella.prototype.update = function(message) {
  if  (this.alive && !message.alive) {
    this.die();
  }
  this.position = message.position;
  this.velocity = message.velocity;
  this.upOrientation = message.upOrientation;
  this.setColor(message.color);
};


Fella.readMessage = function(reader) {
  return {
    klass: Fella,
    alive: reader.readInt8(),
    position: reader.readVec3(),
    velocity: reader.readVec3(),
    upOrientation: reader.readVec4(),
    color: reader.readVec4(),
  }
};

