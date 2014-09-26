OffsetContainer = function(message) {
  goog.base(this, message);
  this.thing = message.thing;

  this.addPart(this.thing);
};
goog.inherits(OffsetContainer, Thing);
