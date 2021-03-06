HeroBall = function(message) {
  util.base(this, message);

  this.aMag = 20;
  this.moveKey = [0, 0];

  this.inputAdapter = new WorldInputAdapter().
      setKeyHandler(this.onKey, this);
};
goog.inherits(HeroBall, Sphere);


HeroBall.prototype.advance = function(dt) {
  this.velocity[0] += this.moveKey[0] * this.aMag*dt;
  this.velocity[1] += this.moveKey[1] * this.aMag*dt;

  this.advanceBasics(dt);

  if (this.position[0] < -Env.world.width / 2) {
    this.velocity[0] = Math.abs(this.velocity[0]);
    this.position[0] = -Env.world.width/2;
  }
  if (this.position[0] > Env.world.width / 2) {
    this.velocity[0] = -Math.abs(this.velocity[0]);
    this.position[0] = Env.world.width/2;
  }
  if (this.position[1] < -Env.world.height / 2) {
    this.velocity[1] = Math.abs(this.velocity[1]);
    this.position[1] = -Env.world.height/2;
  }
  if (this.position[1] > Env.world.height / 2) {
    this.velocity[1] = -Math.abs(this.velocity[1]);
    this.position[1] = Env.world.height/2;
  }
};


HeroBall.prototype.onKey = function(event) {
  var isKeydownEvent = event.type == 'keydown';
  var keyCode = event.keyCode;
  switch (keyCode) {
    case KeyCode.A:
      this.moveKey[0] = isKeydownEvent ? -1 :
          (this.inputAdapter.isKeyDown(KeyCode.D) ? 1 : 0);
      break;
    case KeyCode.D:
      this.moveKey[0] = isKeydownEvent ? 1 :
          (this.inputAdapter.isKeyDown(KeyCode.A) ? -1 : 0);
      break;
    case KeyCode.S:
      this.moveKey[1] = isKeydownEvent ? -1 :
          (this.inputAdapter.isKeyDown(KeyCode.W) ? 1 : 0);
      break;
    case KeyCode.W:
      this.moveKey[1] = isKeydownEvent ? 1 :
          (this.inputAdapter.isKeyDown(KeyCode.S) ? -1 : 0);
      break;
  }
};

