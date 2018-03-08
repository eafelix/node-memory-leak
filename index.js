if (process.env.MEM_WATCH === "true") {
  var heapdump = require("heapdump");
  var memwatch = require("memwatch-next");

  console.log("starting memwatch and heapdump");

  const createSnapshot = dir => {
    heapdump.writeSnapshot(dir, function(err, filename) {
      console.log("dump written to", filename);
    });
  };

  setInterval(function() {
    createsSnapshot("./analytics/" + Date.now() + ".heapsnapshot");
  }, process.env.MEM_WATCH_INTERVAL);

  memwatch.on("leak", info => {
    console.error("Memory leak detected:\n", info);
    createsSnapshot("./analytics/" + Date.now() + "-leaked" + ".heapsnapshot");
  });
}
