JoozbillWorld = function() {
  goog.base(this);

  this.setBackgroundColor([0, 0, 0, 1]);

  this.thingsById = {};


  this.inputAdapter = new WorldInputAdapter().
      setKeyHandler(this.onKey, this);

};
goog.inherits(JoozbillWorld, World);


JoozbillWorld.prototype.addThing = function(thing) {
  goog.base(this, 'addThing', thing);
  this.thingsById[thing.id] = thing;

};


JoozbillWorld.prototype.populate = function() {
  goog.base(this, 'populate');

  var light = new Light({
    ambientColor: [.32, .32, .32],
    directionalColor: [.68, .68, .68],
    position: [0, 100, 0]
  });
  this.addLight(light);

  var orientation = quat.create();
  this.camera = new FreeCamera({
    position: [0, 100, 175],
    pitch: Math.PI/5,
    viewOrientation: quat.rotateY(orientation, orientation, 0),
  });
  this.addThing(this.camera);


  // for (var i = 0; i < 1; i++) {
  //   var star = new Dongle({
  //     position: [0, 0, 0],
  //     color: [1, 1, 1, 1],
  //     // velocity: [0, -10, 0],
  //     // upOrientation: vec4.random(quat.create()),
  //     rYaw: Math.PI/2,
  //     // rRoll: Math.random() < .5 ? -Math.PI : Math.PI
  //     // rYaw: Math.PI/4,
  //     // roll: Math.PI,
  //     // rPitch: Math.PI/4,
  //   });
  //   this.addThing(star);
  // }
};

JoozbillWorld.prototype.jerk = function(v) {
  for (var i = 0; i < this.things.size(); i++) {
    this.things.get(i).setVelocity(v);
  }
};

JoozbillWorld.prototype.onMouseButton = function(event) {
  if (event.type == 'mousedown') {
    Animator.getInstance().togglePause();
  }
};

JoozbillWorld.prototype.onKey = function(event) {
  if (Env.client.socket.readyState) {
    Env.client.sendKeyEvent(event.type == 'keydown', event.keyCode);
  }

  if (event.type == 'keydown') {
    switch (event.keyCode) {
      case KeyCode.F:
        ContainerManager.getInstance().setFullScreen(true);
        break;

      case KeyCode.M:
        this.setMusicPaused(!this.music.paused);
        break;

      case KeyCode.ESC:
        Animator.getInstance().setPaused(true);
        break
    }
  }
};


JoozbillWorld.prototype.setState = function(reader) {
  for (var i = 0; i < 1; i++) {
    AddRemoveMessage.read(reader, this.things);
    reader.checkSync();
    var writablesCount = reader.readInt32();
    // console.log('Count: ' + writablesCount);
    for (var j = 0; j < writablesCount; j++) {
      var id = reader.readInt32();
      this.addThing(reader.readThing().setId(id));
    }
    if (i < 2) reader.checkSync();
  }
  this.stateSet = true;
};

JoozbillWorld.prototype.updateWorld = function(reader) {
  for (var i = 0; i < 1; i++) {
    AddRemoveMessage.read(reader, this.things);
    reader.checkSync();
    var writablesCount = reader.readInt32();
    for (var j = 0; j < writablesCount; j++) {
      var id = reader.readInt32();
      var message = reader.readThingMessage();
      var thing = this.getThing(id);
      if (thing) thing.update(message);
      else {
      }
    }
    if (i < 1) reader.checkSync();
  }


  if (this.heroId && !hero) {
    hero = this.thingsById[this.heroId];
    if (hero) {
      camera.anchor = hero;
    }
  }
};

JoozbillWorld.prototype.getThing = function(id) {
  return this.thingsById[id];
}
