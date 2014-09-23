goog.provide('OsterichMessage');
OsterichMessage = {};
OsterichMessage.read = function(reader) {
  return {
    klass: Dongle,
    alive: reader.readInt8(),
    position: reader.readVec3(),
    velocity: reader.readVec3(),
  }
};

