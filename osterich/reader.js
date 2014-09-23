

Reader = function(arrayBuffer) {
  this.position = 0;
  this.buffer = arrayBuffer;
  this.view = new DataView(this.buffer);
};

Reader.prototype.readFloat32 = function() {
  var value = this.view.getFloat32(this.position);
  this.position += 4;
  return value;
};

Reader.prototype.readInt32 = function() {
  var value = this.view.getInt32(this.position);
  this.position += 4;
  return value;
};

Reader.prototype.readInt16 = function() {
  var value = this.view.getInt16(this.position);
  this.position += 2;
  return value;
};

Reader.prototype.readInt8 = function() {
  var value = this.view.getInt8(this.position);
  this.position++;
  return value;
};

Reader.prototype.readString = function() {
  var length = this.readInt32();
  var str = String.fromCharCode.apply(
      null, new Uint8Array(this.buffer, this.position, length));
  this.position += length;
  return str;
};

Reader.prototype.checkSync = function() {
  this.checkCode(MessageCode.SYNC, 'Sync');
};

Reader.prototype.checkEOM = function() {
  this.checkCode(MessageCode.EOM, 'EOM');
};

Reader.prototype.checkCode = function(code, opt_name) {
  var actual = this.readInt8();
  var name = opt_name || code;
  if (actual != code) {
    throw new Error("checkCode failled on " + name + '. Got ' + actual);
  }
};

Reader.prototype.checkIntCode = function(code, opt_name) {
  var actual = this.readInt32();
  var name = opt_name || code;
  if (actual != code) {
    throw new Error("checkCode failled on " + name + '. Got ' + actual);
  }
};

Reader.prototype.readThingMessage = function() {
  var type = this.readInt32();
  switch (type) {
    case 47:
      return OsterichMessage.read(reader);
    case 48:
      return StarMessage.read(reader);
    default:
      throw new Error("Don't recognize " + type);
  }
};

Reader.prototype.readThing = function() {
  var message = this.readThingMessage();
  return new message.klass(message);
};

Reader.prototype.readVec3 = function() {
  return [
    reader.readFloat32(),
    reader.readFloat32(),
    reader.readFloat32(),
  ];
};
