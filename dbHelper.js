const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

function setDefaults() {
    db.defaults({ ads: [] })
        .write()
}

function writeUniqueAdsToDB(ads) {
    for (i in ads) {
        let adExists = db.get('ads')
            .find({ url: ads[i].url })
            .value()
        if (!adExists) {
            db.get('ads')
                .push(ads[i])
                .write()
        } else {
            console.log("duplicate found")
        }
    }
}

module.exports = {
    setDefaults: setDefaults,
    writeUniqueAdsToDB: writeUniqueAdsToDB,
    db: db
} 