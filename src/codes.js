// Define constant codes for target and method identification

class OctaviaCode {

    // taregt codes
    static TAR_DATABASE = "TAR_DATABASE"
    static TAR_COLLECTION = "TAR_COLLECTION"

    // method codes
    static MET_INFO = "MET_INFO"
    static MET_DELETE = "MET_DELETE"
    static MET_COLLECTION_EXISTS = "MET_COLLECTION_EXISTS"

    static MET_INSERT = "MET_INSERT"
    static MET_INSERT_MANY = "MET_INSERT_MANY"
    static MET_FIND = "MET_FIND"
    static MET_FIND_MANY = "MET_FIND_MANY"
    static MET_UPDATE = "MET_UPDATE"
    static MET_UPDATE_MANY = "MET_UPDATE_MANY"
    static MET_REMOVE = "MET_REMOVE"
    static MET_REMOVE_MANY = "MET_REMOVE_MANY"
}

module.exports = { OctaviaCode }