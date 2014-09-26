AddRemoveMessage = {
  read: function(reader) {

    var addListCount = reader.readInt32();
    for (var i = 0; i < addListCount; i++) {
      var id = reader.readInt32();
      var thing = reader.readThing().setId(id);
      if (!Env.world.thingsById[id]) {
        Env.world.addThing(thing);
      }
    }
    reader.checkSync();

    var removeListCount = reader.readInt32();
    for (var i = 0; i < removeListCount; i++) {
      var id = reader.readInt32();
      Env.world.removeThing(reader.readThing().setId(id));
    }
  }
};
