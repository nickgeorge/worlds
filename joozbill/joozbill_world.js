JoozbillWorld = function() {
  util.base(this);

  this.width = 150;
  this.height = 150;

  this.color = 0;

  this.setBackgroundColor([0, 0, 0, 1]);

  this.inputAdapter = new WorldInputAdapter().
      setKeyHandler(this.onKey, this);

};
goog.inherits(JoozbillWorld, World);


JoozbillWorld.prototype.advance = function(dt) {
  util.base(this, 'advance', dt);
};


JoozbillWorld.prototype.populate = function() {
  util.base(this, 'populate');

  var sphere = new HeroBall({
    position: [0, 0, 0],
    color: [0, 1, 0, 1],
    radius: 2.5,
    rRoll: PI
  });
  this.addThing(sphere);


  var border = new Border({
    position: [0, 0, 0],
    color: [1, 1, 1, 1],
    bottomLeft: [-this.width/2, -this.height/2],
    topRight: [this.width/2, this.height/2],
  });
  this.addThing(border);


  for (var i = 0; i < 4; i++) {
    var star = new Star({
      position: [
        Math.random()*20 - 10,
        Math.random()*20 - 20,
        Math.random()*20 - 20
      ],
      color: [0, 1, 0, 1],
      velocity: [0, -10, 0],
      rRoll: Math.random() < .5 ? -PI : PI
    });
    this.addThing(star);
  }
};


JoozbillWorld.prototype.jerk = function(v) {
  for (var i = 0; i < this.things.size(); i++) {
    this.things.get(i).setVelocity(v);
  }
};


JoozbillWorld.prototype.onKey = function(event) {
  var isKeydownEvent = event.type == 'keydown';
  var keyCode = event.keyCode;

  switch (keyCode) {
    case KeyCode.F:
      ContainerManager.getInstance().setFullScreen(true);
      break;
    case KeyCode.ESC:
      Animator.getInstance().setPaused(true);
      return false;
    default:
      return false;
  }
  return true;
};
