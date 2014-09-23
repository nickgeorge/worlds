VectorMessage = function(reader) {

  this.x = reader.readFloat32();
  this.y = reader.readFloat32();
  this.z = reader.readFloat32();
};

VectorMessage.prototype.getVector = function() {
  return [this.x, this.y, this.z];
};
