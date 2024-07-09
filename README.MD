# octavia-client
octavia-client is a client for an octavia-api.

# Installation
To install the Octavia-Client module, run the following command in your terminal:
```bash
npm install octavia-client
```

# Getting Started.

use with octavia-api. [octavia-api](https://www.npmjs.com/package/octavia-api)

```js
const octaviaClient = require("octavia-client")

const octaviaConfig = octaviaClient.createConfig({
    uri: "<OCTAVIA_API_URL>",
    token: "<OCTAVIA_API_TOKEN>",
})

const DB = new octaviaClient.OctaviaClient({
    database: "databaseName",
    password: "databasePassword",
    config: octaviaConfig
});

(async () => {
    const databaseInformation = await DB.info()
    console.log(databaseInformation)

    // use as a normal octavia-db methods
    // https://www.npmjs.com/package/octavia-db
})()
```
#### Options
```js
const octaviaConfig = octaviaClient.createConfig({
    uri: "<OCTAVIA_API_URL>",
    token: "<OCTAVIA_API_TOKEN>",
    path: "/octavia-db",
    headers: {
        // your http headers
    }
})
```