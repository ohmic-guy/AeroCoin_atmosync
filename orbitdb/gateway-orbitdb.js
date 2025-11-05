
require('dotenv').config();
const IPFS = require('ipfs-core');
const OrbitDB = require('orbit-db');
const fs = require('fs');

async function startOrbitGateway() {
  console.log("Starting IPFS node...");
  const ipfs = await IPFS.create({ repo: "./ipfs-repo" });

  console.log("Creating OrbitDB instance...");
  const orbitdb = await OrbitDB.createInstance(ipfs);

  
  const logDb = await orbitdb.log("aero.raw.readings");
  await logDb.load();

  
  const kvDb = await orbitdb.kvstore("aero.summary");
  await kvDb.load();

  console.log("OrbitDB ready.");
  console.log("DB address (log):", logDb.address.toString());
  console.log("DB address (kv):", kvDb.address.toString());

  
  const simulateReading = async (nodeId, reading) => {
    
    const entry = {
      nodeId,
      reading,
      ts: new Date().toISOString()
    };
    const hash = await logDb.add(entry);
    console.log("Stored raw reading in OrbitDB. Hash:", hash);

    
    
    const currentCount = kvDb.get(nodeId) || 0;
    kvDb.put(nodeId, currentCount + 1);

    
    const count = kvDb.get(nodeId);
    if (count % 10 === 0) {
      const milestone = {
        nodeId,
        count,
        timestamp: new Date().toISOString(),
        message: `Milestone of ${count} readings`
      };
      
      const filename = `./orbitdb_milestone_${nodeId}_${Date.now()}.json`;
      fs.writeFileSync(filename, JSON.stringify(milestone, null, 2));
      console.log("Milestone written to file:", filename);
      
    }
  };

  
  let counter = 0;
  setInterval(async () => {
    counter++;
    const reading = {
      AQI: Math.floor(50 + Math.random() * 50),
      PM25: +(10 + Math.random() * 30).toFixed(2),
      temp: +(24 + Math.random() * 6).toFixed(2),
      hum: +(40 + Math.random() * 30).toFixed(2)
    };
    await simulateReading("node-01", reading);

    if (counter > 50) {
      console.log("Simulation complete. Stop after 50 iterations.");
      process.exit(0);
    }
  }, 2000);
}

startOrbitGateway().catch((err) => {
  console.error("OrbitDB gateway error:", err);
  process.exit(1);
});
