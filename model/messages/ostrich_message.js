goog.provide('OsterichMessage');
OsterichMessage = {};
OsterichMessage.read = function(reader) {
  return {
    klass: Star,
    position: reader.readVec3(),
    velocity: reader.readVec3(),
  }
};

