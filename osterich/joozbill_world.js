JoozbillWorld = function() {
  goog.base(this);

  this.scoreMap = {};

  this.setBackgroundColor([0, 0, 0, 1]);

  this.inputAdapter = new WorldInputAdapter().
      setKeyHandler(this.onKey, this);
};
goog.inherits(JoozbillWorld, World);


JoozbillWorld.prototype.populate = function() {
  goog.base(this, 'populate');

  var light = new Light({
    ambientColor: [.32, .32, .32],
    directionalColor: [.68, .68, .68],
    position: [0, 80, 176]
  });
  this.addLight(light);

  var orientation = quat.create();
  this.camera = new FreeCamera({
    position: [0, 130, 175],
    pitch: .7,
    viewOrientation: quat.rotateY(orientation, orientation, 0),
  });

  this.addThing(new Box({color: [.7, .7, 1, 1], size: [200, 0, 200]}));
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

      case KeyCode.P:
        Env.client.sendCode(MessageCode.RESTART);
        break;

      case KeyCode.ESC:
        Animator.getInstance().togglePause();
        break
    }
  }
};
