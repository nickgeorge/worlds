Client = function(world) {
  this.world = world;
  this.socket = new WebSocket('ws://' + window.location.host + ':8080/websock');

  this.socket.onmessage = util.bind(this.onMessage);
  this.socket.binaryType = 'arraybuffer';
  this.socket.onopen = util.bind(this.onOpen, this);


  window.onbeforeunload = util.bind(function() {
    this.socket.close()
  }, this);
};

Client.prototype.onMessage = function(message) {
  reader = new Reader(message.data);

  var checkEOM = true;

  var code = reader.readInt8();
  switch(code) {
    case MessageCode.SET_STATE:
      Env.world.setState(reader);
      Env.world.stateSet = true;
      break;
    case MessageCode.UPDATE_WORLD:
      if (Env.world.stateSet) {
        Env.world.updateWorld(reader);
      } else {
        checkEOM = false;
      }
      break;
    case MessageCode.SCORE:
      Env.world.scoreMap = ScoreMessage.read(reader);
      break;
    case MessageCode.NAME_MAP:
      Env.world.nameMap = NameMapMessage.read(reader);
      break;
    case MessageCode.YOU_ARE:
      Env.world.hero = Env.world.getThing(reader.readInt32());
      break;
    default:
      console.log('Unrecognized code: ' + code);
      checkEOM = false;
  }
  if (checkEOM) reader.checkEOM();
};

Client.prototype.send = function(msg) {
  this.socket.send(msg)
};

Client.prototype.sendCode = function(code) {
  this.send(new Uint8Array([code]));
};

Client.prototype.sendEOM = function() {
  this.sendCode(MessageCode.EOM);
};

Client.prototype.sendMode = function(mode) {
  console.log(mode);
  var ab = new ArrayBuffer(8);
  var dataView = new DataView(ab);
  dataView.setInt8(0, MessageCode.MODE);
  dataView.setInt32(1, mode);
  this.send(new Int8Array(ab));
  //TODO EOM
};

Client.prototype.sendKeyEvent = function(isKeyDown, keyCode) {
  this.send(new Uint8Array(
      [MessageCode.KEY_EVENT, isKeyDown ? 1 : 0, keyCode]));
};

Client.prototype.sendMouseMoveEvent = function(dX, dY) {
  var ab = new ArrayBuffer(9);
  var dataView = new DataView(ab);
  dataView.setInt8(0, MessageCode.MOUSE_MOVE_EVENT);
  dataView.setFloat32(1, dX);
  dataView.setFloat32(5, dY);
  this.send(new Int8Array(ab));
};

Client.prototype.sendMouseClickEvent = function(button) {
  var ab = new ArrayBuffer(9);
  var dataView = new DataView(ab);
  dataView.setInt8(0, MessageCode.MOUSE_CLICK_EVENT);
  dataView.setInt8(1, button);
  this.send(new Int8Array(ab));
};

Client.prototype.myNameIs = function(name) {
  var writer = new Writer(1 + name.length);
  writer.writeInt8(MessageCode.MY_NAME_IS);
  writer.writeString(name);
  this.send(new Int8Array(writer.buffer));
};

Client.prototype.onOpen = function() {
  this.sendCode(MessageCode.JOIN);
};
