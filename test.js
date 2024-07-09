const octaviaClient = require("octavia-client")

const octaviaConfig = octaviaClient.createConfig({
    uri: "https://brainy-dour-purchase.glitch.me",
    token: "token-123",
})

const DB = new octaviaClient.OctaviaClient({
    database: "ssd",
    password: "pass123",
    config: octaviaConfig
});

(async () => {
    const databaseInformation = await DB.info()
    console.log(databaseInformation)
})()