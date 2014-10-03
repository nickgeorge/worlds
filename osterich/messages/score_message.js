goog.provide('ScoreMessage');

ScoreMessage = {};

ScoreMessage.read = function(reader) {
  var scoreMap = [];
  var scoreMapSize = reader.readInt32();
  for (var i = 0; i < scoreMapSize; i++) {
    var id = reader.readInt32();
    var thingId = reader.readInt32();
    var score = reader.readInt32();
    scoreMap.push([id, thingId, score]);
  }
  return scoreMap;
};

