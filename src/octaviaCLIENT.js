const { OctaviaCode } = require("./codes")
const { Collection } = require("./collection")
const { Requestor } = require("./requestor")

class OctaviaClient extends Requestor {
    /**
    * Constructs an instance of OctaviaDB.
    * @param {Object} config - The configuration object.
    * @param {string} database - The name of the database.
    * @param {string} password - The password for the database.
    */
    constructor({ database, password, config }) {
        super({
            database,
            password,
            ...config
        })

        this.database = database
        this.password = password
        this.config = config
    }

    /**
    * Creates a new collection within the database.
    * @param {string} collectionName - The name of the collection.
    * @param {boolean} [encrypt=true] - Whether the collection should be encrypted.
    * @returns {Collection} The created collection.
    */
    Collection(collectionName, encrypt = true) {
        return new Collection(collectionName, encrypt, this)
    }

    /**
     * Retrieves information about the database.
     * @returns {Object} An object containing information about the database.
     */
    async info() {
        return await (await this.makeRequest(
            OctaviaCode.TAR_DATABASE,
            OctaviaCode.MET_INFO
        )).data
    }

    /**
     * Deletes the entire database.
     * @returns {Object} A response object indicating the success of the operation.
     */
    async delete() {
        return await (await this.makeRequest(
            OctaviaCode.TAR_DATABASE,
            OctaviaCode.MET_DELETE
        )).data
    }

    /**
     * Checks if a collection exists in the database.
     * @param {string} collectionName - The name of the collection.
     * @returns {object} A response object indicating the success of the operation.
     */
    async collectionExists(collectionName) {
        return await (await this.makeRequest(
            OctaviaCode.TAR_DATABASE,
            OctaviaCode.MET_COLLECTION_EXISTS,
            {
                collectionName
            }
        )).data
    }
}

function createConfig(options) {
    const config = {
        path: "/octavia-db"
    }

    if (typeof options === "object" && !Array.isArray(options)) {
        Object.assign(config, options)

        if (config.uri && config.uri.endsWith("/")) {
            config.uri = config.uri.slice(0, config.uri.length - 1)
        }

        if (config.path && !config.path.startsWith("/")) {
            config.path = `/${config.path}`
        }

        config.uri = `${config.uri}${config.path}`
        return config
    }
}

module.exports = { OctaviaClient, createConfig }