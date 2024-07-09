const { OctaviaCode } = require("./codes")
const { Requestor } = require("./requestor")

function modifyDataScheme(dataScheme) {
    const modifiedDataScheme = {}

    for (const key in dataScheme) {
        if (dataScheme.hasOwnProperty(key)) {
            const value = dataScheme[key]

            if (typeof value === "function") {
                modifiedDataScheme[key] = value.name
            } else if (typeof value === 'object' && value !== null) {
                modifiedDataScheme[key] = modifyDataScheme(value) // Recursively modify nested objects
            } else {
                modifiedDataScheme[key] = value // Handle other cases if needed
            }
        }
    }

    return modifiedDataScheme
}

class Collection extends Requestor {
    /**
     * @constructor
     * @param {string} collectionName - The name of the collection.
     * @param {boolean} encrypt - Whether to encrypt the collection data.
     * @param {object} DB - The OctaviaClient instance.
     */
    constructor(collectionName, encrypt, DB) {
        super({
            database: DB.database,
            password: DB.password,
            ...DB.config
        })

        this.collectionName = collectionName
        this.encrypt = encrypt
    }

    /**
     * Inserts a single data object into the collection.
     * @param {object} data - The data to insert.
     * @param {object} dataScheme - The schema of the data.
     * @returns {object} - Response object indicating success or failure.
     */
    async insert(data, dataScheme) {
        return await (await this.makeRequest(
            OctaviaCode.TAR_COLLECTION,
            OctaviaCode.MET_INSERT,
            {
                collectionName: this.collectionName,
                encrypt: this.encrypt,
                data,
                dataScheme: modifyDataScheme(dataScheme)
            }
        )).data
    }

    /**
    * Inserts multiple data objects into the collection.
    * @param {Array} data - Array of data objects to insert.
    * @param {object} dataScheme - The schema of the data.
    * @returns {object} - Response object indicating success or failure.
    */
    async insertMany(data, dataScheme) {
        return await (await this.makeRequest(
            OctaviaCode.TAR_COLLECTION,
            OctaviaCode.MET_INSERT_MANY,
            {
                collectionName: this.collectionName,
                encrypt: this.encrypt,
                data,
                dataScheme: modifyDataScheme(dataScheme)
            }
        )).data
    }

    /**
     * Finds a single data object in the collection that matches the query.
     * @param {object} query - The query to match against.
     * @returns {object|undefined} - The matching data object, or undefined if no match is found.
     */
    async find(query) {
        return await (await this.makeRequest(
            OctaviaCode.TAR_COLLECTION,
            OctaviaCode.MET_FIND,
            {
                collectionName: this.collectionName,
                encrypt: this.encrypt,
                data: query
            }
        )).data
    }

    /**
     * Finds all data objects in the collection that match the query.
     * @param {object} query - The query to match against.
     * @returns {Array} - Array of matching data objects.
     */
    async findMany(query) {
        return await (await this.makeRequest(
            OctaviaCode.TAR_COLLECTION,
            OctaviaCode.MET_FIND_MANY,
            {
                collectionName: this.collectionName,
                encrypt: this.encrypt,
                data: query
            }
        )).data
    }

    /**
    * Updates a single data object in the collection that matches the query.
    * @param {object} query - The query to match against.
    * @param {object} newData - The new data to update.
    * @param {object} dataScheme - The schema of the data.
    * @returns {object} - Response object indicating success or failure.
    */
    async update(query, newData, dataScheme) {
        return await (await this.makeRequest(
            OctaviaCode.TAR_COLLECTION,
            OctaviaCode.MET_UPDATE,
            {
                collectionName: this.collectionName,
                encrypt: this.encrypt,
                data: query,
                newData,
                dataScheme: modifyDataScheme(dataScheme)
            }
        )).data
    }

    /**
     * Updates multiple data objects in the collection that match the query.
     * @param {object} query - The query to match against.
     * @param {object} newData - The new data to update.
     * @param {object} dataScheme - The schema of the data.
     * @returns {object} - Response object indicating success or failure.
     */
    async updateMany(query, newData, dataScheme) {
        return await (await this.makeRequest(
            OctaviaCode.TAR_COLLECTION,
            OctaviaCode.MET_UPDATE_MANY,
            {
                collectionName: this.collectionName,
                encrypt: this.encrypt,
                data: query,
                newData,
                dataScheme: modifyDataScheme(dataScheme)
            }
        )).data
    }

    /**
     * Removes a single data object in the collection that matches the query.
     * @param {object} query - The query to match against.
     * @returns {object} - Response object indicating success or failure.
     */
    async remove(query) {
        return await (await this.makeRequest(
            OctaviaCode.TAR_COLLECTION,
            OctaviaCode.MET_REMOVE,
            {
                collectionName: this.collectionName,
                encrypt: this.encrypt,
                data: query
            }
        )).data
    }

    /**
    * Removes all data objects in the collection that match the query.
    * @param {object} query - The query to match against.
    * @returns {object} - Response object indicating success or failure.
    */
    async removeMany(query) {
        return await (await this.makeRequest(
            OctaviaCode.TAR_COLLECTION,
            OctaviaCode.MET_REMOVE_MANY,
            {
                collectionName: this.collectionName,
                encrypt: this.encrypt,
                data: query
            }
        )).data
    }

    /**
    * Retrieves information about the collection.
    * @returns {object} - An object containing information about the collection.
    */
    async info() {
        return await (await this.makeRequest(
            OctaviaCode.TAR_COLLECTION,
            OctaviaCode.MET_INFO,
            {
                collectionName: this.collectionName,
                encrypt: this.encrypt
            }
        )).data
    }

    /**
    * Deletes the collection.
    * @returns {object} - Response object indicating success or failure.
    */
    async delete() {
        return await (await this.makeRequest(
            OctaviaCode.TAR_COLLECTION,
            OctaviaCode.MET_DELETE,
            {
                collectionName: this.collectionName,
                encrypt: this.encrypt
            }
        )).data
    }
}

module.exports = { Collection }