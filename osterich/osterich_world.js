OsterichWorld = function() {
  goog.base(this);

  this.scoreMap = [];
  this.nameMap = {};
  this.hero = null;

  this.setBackgroundColor([0, 0, 0, 1]);

  this.inputAdapter = new WorldInputAdapter().
      setMouseMoveHandler(this.onMouseMove, this).
      setMouseButtonHandler(this.onMouseButton, this).
      setKeyHandler(this.onKey, this);

  this.freeCamera = null;
  this.fpsCamera = null;

};
goog.inherits(OsterichWorld, World);


OsterichWorld.prototype.populate = function() {
  goog.base(this, 'populate');

  var light = new Light({
    ambientColor: [.32, .32, .32],
    directionalColor: [.68, .68, .68],
    position: [0, 80, 176]
  });
  this.addLight(light);

  var orientation = quat.create();
  this.freeCamera = new FreeCamera({
    position: [0, 130, 175],
    pitch: .7,
    viewOrientation: quat.rotateY(orientation, orientation, 0),
  });

  this.fpsCamera = new FpsCamera();

  this.camera = this.freeCamera;

  this.addThing(new Box({color: [.7, .7, 1, 1], size: [200, 0, 200]}));
};


OsterichWorld.prototype.onKey = function(event) {
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

      case KeyCode.N:
        var name = prompt('What\'s your name?');
        if (name) Env.client.myNameIs(name);
        break;

      case KeyCode.I:
        if (this.camera == this.freeCamera) {
          this.goFps();
        } else {
          this.goFree();
        }
        break;

      case KeyCode.ESC:
        Animator.getInstance().togglePause();
        break
    }
  }
};


OsterichWorld.prototype.onMouseMove = function(event) {
  if (this.rotating) return;
  var movementX = this.inputAdapter.getMovementX(event);
  var movementY = this.inputAdapter.getMovementY(event);

  Env.client.sendMouseMoveEvent(movementX, movementY);

  // var rotY = this.objectCache.thing.rotY;
  // quat.setAxisAngle(rotY,
  //     vec3.transformQuat(vec3.temp, vec3.J, this.upOrientation),
  //     -movementX * this.sensitivityX);

  // quat.multiply(this.upOrientation,
  //     rotY,
  //     this.upOrientation);

  // if ((this.viewRotation[0] < 1/util.math.ROOT_2 || movementY > 0) &&
  //     (this.viewRotation[0] > -1/util.math.ROOT_2 || movementY < 0)) {
  //   quat.rotateX(this.viewRotation,
  //       this.viewRotation,
  //       -movementY * this.sensitivityY);
  // }
};


OsterichWorld.prototype.onMouseButton = function(event) {
  if (!this.inputAdapter.isPointerLocked()) {
    ContainerManager.getInstance().setPointerLock(true);
    Animator.getInstance().setPaused(false);
  }
};


OsterichWorld.prototype.goFps = function(anchor) {
  this.fpsCamera.anchor = this.hero;
  this.camera = this.fpsCamera;
};

OsterichWorld.prototype.goFree = function() {
  this.camera = this.freeCamera;
};
