const { default: axios } = require("axios")

class Requestor {
    constructor({ uri, token, database, password, newHeaders = {} }) {
        this.uri = uri
        this.token = token
        this.database = database
        this.password = password

        const headers = {
            "Content-Type": "application/json",
            token
        }

        if (newHeaders) {
            Object.assign(headers, newHeaders)
        }

        this.headers = headers
    }

    async makeRequest(target, method, request = {}) {
        const data = {
            database: this.database,
            password: this.password,
            target,
            method,
            request
        }

        try {
            return await axios.post(this.uri, data, {
                headers: this.headers,
            })
        } catch (error) {
            const data = {
                ack: false,
                code: error.code,
                msg: `Request failed. ${error.message}`
            }

            if (error.response.data) {
                Object.assign(data, error.response.data)
            }

            return { data }
        }
    }
}

module.exports = { Requestor }