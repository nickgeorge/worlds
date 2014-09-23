Client = function(world) {
  this.world = world;
  this.socket = new WebSocket('ws://' + window.location.host + ':8080/websock');

  this.socket.onmessage = util.bind(this.onMessage);
  this.socket.binaryType = 'arraybuffer';
  this.socket.onopen = util.bind(this.onOpen, this);
};

Client.prototype.onMessage = function(message) {
  reader = new Reader(message.data);

  var code = reader.readInt32();
  // console.log(code);
  switch(code) {
    // case MessageCode.SET_BOARD:
    //   this.world.board = Board.fromMessage(new BoardMessage(reader));
    //   reader.checkEOM();
    //   break;
    case MessageCode.SET_STATE:
      console.log('Update Rec\'d');
      this.world.setState(reader);
      // client.sendCode(MessageCode.JOIN);
      reader.checkEOM();
      this.world.stateSet = true;
      break;
    // case MessageCode.UPDATE_WORLD:
    //   if (this.world.stateSet) {
    //     this.world.updateWorld(reader);
    //     reader.checkEOM();
    //   }
    //   break;
    // case MessageCode.YOU_ARE:
    //   this.world.heroId = reader.readInt32();
    //   reader.checkEOM();
    //   break;
    // case MessageCode.SCORE:
    //   this.world.scoresMap = new ScoreMessage(reader).scoresMap;
    //   reader.checkEOM();
    //   break;
    // case MessageCode.NAME_MAP:
    //   this.world.nameMap = new NameMapMessage(reader).nameMap;
    //   reader.checkEOM();
    //   break;
  }
};

Client.prototype.send = function(msg) {
  this.socket.send(msg)
};

Client.prototype.sendCode = function(code) {
  this.send(new Uint8Array([code]));
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
  this.send(byteArray.byteView);
};

Client.prototype.onOpen = function() {
  console.log("Opened!");
  // this.sendCode(MessageCode.GET_BOARD);
  this.sendCode(MessageCode.GET_STATE);
};
