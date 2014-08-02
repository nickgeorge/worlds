JoozbillListener = function(container, animator, world) {
  util.base(this, container, animator, world);
};
util.inherits(JoozbillListener, WorldListener);


JoozbillListener.prototype.onMouseDown = function(e) {
  this.animator.togglePause();
};

JoozbillListener.prototype.onMouseMove = function(event) {};

JoozbillListener.prototype.onPointerLockChange = function(event) {};

JoozbillListener.prototype.onKey = function(event) {
  var isKeydownEvent = event.type == 'keydown';
  var keyCode = event.keyCode;

  switch (keyCode) {
    case KeyCode.F:
      this.container.requestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      break;
    case KeyCode.ESC:
      this.animator.setPaused(true);
      return false;
    default:
      util.log('Unrecognized key: ' + event.keyCode);
      return false;
  }
  return true;
};
