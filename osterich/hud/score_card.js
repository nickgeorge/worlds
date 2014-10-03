
/**
 * @constructor
 * @extends {Widget}
 */
ScoreCard = function(x, y) {
  goog.base(this, x, y);
};
goog.inherits(ScoreCard, Widget);


ScoreCard.prototype.render = function() {
  this.setFont('bold 28px courier');

  Env.world.scoreMap.sort(function(a, b) {
    return a[2] < b[2];
  });

  for (var i = 0; i < Env.world.scoreMap.length; i++) {
    var id = Env.world.scoreMap[i][0];
    var thingId = Env.world.scoreMap[i][1];
    var value = Env.world.scoreMap[i][2];
    var name = Env.world.nameMap[id] || ('Player ' + id);
    var thing = Env.world.getThing(thingId);
    this.setFillStyle('rgb(' +
        Math.floor(thing.color[0] * 256) + ',' +
        Math.floor(thing.color[1] * 256) + ',' +
        Math.floor(thing.color[2] * 256) + ')');
    this.context.fillText(name + " : " + value,
        this.position[0], this.position[1] + i*25);
  }
};

