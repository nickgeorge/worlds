goog.provide('ScoreMessage');

ScoreMessage = {};

ScoreMessage.read = function(reader) {
  var scoreMap = {};
  var scoreMapSize = reader.readInt32();
  for (var i = 0; i < scoreMapSize; i++) {
    var id = reader.readInt32();
    var score = reader.readInt32();
    scoreMap[id] = score;
  }
  return scoreMap;
};

