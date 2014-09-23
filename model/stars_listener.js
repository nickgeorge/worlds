StarsListener = function(container, world) {
  goog.base(this, container, world);
};
goog.inherits(StarsListener, WorldListener);


StarsListener.prototype.onMouseDown = function(e) {
  Animator.getInstance().togglePause();
};

StarsListener.prototype.onMouseMove = function(event) {};

StarsListener.prototype.onPointerLockChange = function(event) {};

StarsListener.prototype.onKey = function(event) {
  var isKeydownEvent = event.type == 'keydown';
  var keyCode = event.keyCode;

  switch (keyCode) {
    case KeyCode.LEFT:
      if (isKeydownEvent) {
        this.world.jerk([-10, 0, 0])
      } else if (this.isKeyDown(KeyCode.RIGHT)) {
        this.world.jerk([10, 0, 0]);
      };
      break;
    case KeyCode.RIGHT:
      if (isKeydownEvent) {
        this.world.jerk([10, 0, 0])
      } else if (this.isKeyDown(KeyCode.LEFT)) {
        this.world.jerk([-10, 0, 0]);
      };
      break;
    case KeyCode.UP:
      if (isKeydownEvent) {
        this.world.jerk([0, 10, 0])
      } else if (this.isKeyDown(KeyCode.DOWN)) {
        this.world.jerk([0, -10, 0]);
      };
      break;
    case KeyCode.DOWN:
      if (isKeydownEvent) {
        this.world.jerk([0, -10, 0])
      } else if (this.isKeyDown(KeyCode.UP)) {
        this.world.jerk([0, 10, 0]);
      };
      break;
    case KeyCode.F:
      this.container.requestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      break;
    case KeyCode.ESC:
      Animator.getInstance().setPaused(true);
      return false;
    default:
      return false;
  }
  return true;
};
