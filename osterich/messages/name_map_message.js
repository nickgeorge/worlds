goog.provide('NameMapMessage');

NameMapMessage = {};

NameMapMessage.read = function(reader) {
  var nameMap = {};
  var nameMapSize = reader.readInt32();
  for (var i = 0; i < nameMapSize; i++) {
    var id = reader.readInt32();
    var name = reader.readString();
    nameMap[id] = name;
  }
  return nameMap;
};

