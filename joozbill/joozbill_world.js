JoozbillWorld = function() {
  util.base(this);

  this.red = 0;
  this.increasing = true;

  this.width = 150;
  this.height = 150;

  this.color = 0;

};
util.inherits(JoozbillWorld, World);


JoozbillWorld.prototype.advance = function(dt) {
  util.base(this, 'advance', dt);
};


JoozbillWorld.prototype.populate = function() {
  util.base(this, 'populate');

  // var box = new Box({
  //   position: [0, 0, 0],
  //   color: [1, 0, 0, 1],
  //   size: [20, 4, 4],
  //   velocity: [3, 3, 0],
  //   // pitch: PI,
  //   rRoll: PI
  // });
  // this.addThing(box);

  var sphere = new HeroBall({
    position: [0, 0, 0],
    color: [0, 1, 0, 1],
    radius: 2.5,
    // velocity: [-10, 10, 0],
    // rYaw: PI/2,
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
      // rYaw: PI/2,
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