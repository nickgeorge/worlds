AddRemoveMessage = {
  read: function(reader) {

    var addListCount = reader.readInt32();
    for (var i = 0; i < addListCount; i++) {
      var id = reader.readInt32();
      Env.world.addThing(reader.readThing().setId(id));
      // debugger;
    }
    reader.checkSync();

    var removeListCount = reader.readInt32();
    for (var i = 0; i < removeListCount; i++) {
      var id = reader.readInt32();
      Env.world.removeThing(reader.readThing().setId(id));
    }
  }
};
