goog.provide('StarMessage');
StarMessage = {};
StarMessage.read = function(reader) {
  return {
    klass: Star,
    alive: reader.readInt8(),
    position: reader.readVec3(),
    velocity: reader.readVec3(),
  }
};

