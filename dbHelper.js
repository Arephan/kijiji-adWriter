const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const kijijiLocationsTree = require('./kijijiLocationsTree')

const adapter = new FileSync('db.json')
const db = low(adapter)

function setDefaults() {
    db.defaults({ ads: [], locationsTree: kijijiLocationsTree.locationsTree})
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

function getAllLocations() {
    rArr = []
    for (x of db.get('locationsTree').value().children) {
        for (y of x.children) {
            for (z of y.children) {
                rArr.push({
                    provinceLocationId: y.id,
                    provinceName: y.regionLabel,
                    locationId: z.id,
                    subCityName: z.nameEn
                })
            }
        }
    }
    return rArr
}

module.exports = {
    setDefaults: setDefaults,
    writeUniqueAdsToDB: writeUniqueAdsToDB,
    db: db,
    getAllLocations: getAllLocations
} 