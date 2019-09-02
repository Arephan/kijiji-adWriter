const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const kijijiLocationsTree = require('./kijijiLocationsTree')
const constants = require('./constants')

const adapter = new FileSync('db.json')
const db = low(adapter)

function setDefaults() {
    db.defaults({ ads: [], montreal: [], locationsTree: kijijiLocationsTree.locationsTree, forSale: constants.forSale })
        .write()
}

function writeUniqueAdsToDB(ads, branchName) {
    for (i in ads) {
        let adExists = db.get(branchName)
            .find({ url: ads[i].url })
            .value()
        if (!adExists) {
            let city = ads[i].attributes.location.mapAddress.split(" ")[0].replace(",", "")
            let province = ads[i].attributes.location.province
            let postalCode = ads[i].attributes.location.mapAddress.split(" ")[2]

            // FIND KIJIJI AREA CODES
            let cityCodes = findCityCodes(city)

            if (cityCodes) {
                ads[i].city = city
                ads[i].postalCode = postalCode
                ads[i].province = cityCodes.provinceName
                ads[i].locationId = cityCodes.locationId
                ads[i].provinceLocationId = cityCodes.provinceLocationId
                db.get(branchName)
                    .push(ads[i])
                    .write()
            }
        } else {
            console.log("duplicate found")
        }
    }
}

function findCityCodes(city) {
    let allLocations = getAllLocations()
    for (location of allLocations) {
        if (location.subCityName.toUpperCase().includes(city.toUpperCase())) {
            return location
        }
    }
    return false
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
    getAllLocations: getAllLocations,
} 