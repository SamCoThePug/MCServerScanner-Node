const child_process = require('child_process');
const { join } = require('path')

for(let i = 0; i < 30; i++) {
    console.log("Launching cluster #"+i)
    const child = child_process.fork(join(__dirname, "scan.js"), {silent:true});
    child.stdout.on("data", async data => {
        let str = "Cluster #"+i+": "+data
        console.log(str.trim())
    })
}
