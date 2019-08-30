// This module writes a directory for each subsection of Kijiji area

const constants = require("./constants")
const kijijiLocationTree = require("./kijijiLocationsTree")
const fs = require('fs')
const dbHelper = require('./dbHelper')
// example ad: 

// PART1 (ABOUT)
// =============
// postAdForm.priceAmount: '230'
// postAdForm.title: iPhone 6 64gb unlocked with 100% battery health
// postAdForm.phoneNumber: 438 793 1474
// postAdForm.adType: OFFER
// postAdForm.priceType: FIXED
// postAdForm.attributeMap[forsaleby_s]: ownr
// postAdForm.description: Text 438 793 1474
// image_paths:
// - 1.JPG
// - 2.JPG

function partOne(priceAmount, title, phoneNumber, description) {
    rStr =
        "postAdForm.priceAmount: " + priceAmount + "\n" +
        "postAdForm.title: " + title + " unlocked with 100% battery health" + "\n" +
        "postAdForm.phoneNumber: " + phoneNumber + "\n" +
        "postAdForm.adType: OFFER" + "\n" +
        "postAdForm.priceType: FIXED" + "\n" +
        "postAdForm.attributeMap[forsaleby_s]: ownr" + "\n" +
        "postAdForm.description: " + description + "\n" +
        "image_paths:" + "\n" +
        "- ../../iphonePics/1.JPG" + "\n" +
        "- ../../iphonePIcs/2.JPG" + "\n"


    return rStr
}

// PART2 (LOCATION)
// ================
// postAdForm.city: "Montr\xE9al"
// postAdForm.province: "Qu\xE9bec"
// postAdForm.postalCode: H2J1G2
// postAdForm.addressCity: "Montr\xE9al"
// postAdForm.addressProvince: "Qu\xE9bec"
// postAdForm.addressPostalCode: H2J1G2
// postAdForm.geocodeLat: '45.5300536'
// postAdForm.geocodeLng: '-73.5909143'
// postAdForm.locationId: 1700281
// PostalLat: '45.5300536'
// PostalLng: '-73.5909143'
// locationLevel0: 80002
function partTwo(city, province, postalCode, lat, long, locationId, locationlevel0) {
    rStr = "postAdForm.city: " + city + "\n" +
        "postAdForm.province: " + province + "\n" +
        "postAdForm.postalCode: " + postalCode + "\n" +
        "postAdForm.addressCity: " + city + "\n" +
        "postAdForm.addressProvince: " + province + "\n" +
        "postAdForm.addressPostalCode: " + postalCode + "\n" +
        "postAdForm.geocodeLat: " + lat + "\n" +
        "postAdForm.geocodeLng: " + long + "\n" +
        "postAdForm.locationId: " + locationId + "\n" +
        "PostalLat: " + lat + "\n" +
        "PostalLng: " + long + "\n" +
        "locationLevel0: " + locationlevel0 + "\n"

    return rStr
}

function partThree() {
    let Str = "topAdDuration: '7' \nsubmitType: saveAndCheckout\ncategoryId: 15"

    return rStr
}

function writeAds() {
    let ads = dbHelper.db.get('ads')
    for (ad of ads) {
        writeAd(ad, constants.forSale)
    }
}

function writeAd(ad, forSale) {

    for (color of forSale[0].colors) {
        for (type of forSale[0].types) {
            // PART ONE
            let title = "Get refurbished Unlocked " + type.name + " " + color + " at Hundoiphone.com"
            let priceAmount = type.price
            let phoneNumber = forSale[0].phoneNumber
            let description = "Buy now at hundoiphone.com"

            let one = partOne(priceAmount, title, phoneNumber, description)

            // PART TWO
            let city = ad.city
            let provinceName = ad.province
            let lat = ad.attributes.location.latitude
            let long = ad.attributes.location.longitude
            let postalCode = ad.postalCode
            let locationId = ad.locationId
            let locationlevel0 = ad.provinceLocationId

            let two = partTwo(city, provinceName, postalCode, lat, long, locationId, locationlevel0)

            // PART THREE
            let three = partThree()

            let data = one + two + three

            let path = './ads/' + city + '/' + type.name

            try {
                fs.mkdirSync(path, { recursive: true })
            } catch (err) {
                if (err.code !== 'EEXIST') throw err
            }

                fs.writeFile(path+"/item.txt", data, (err) => {
                    // In case of a error throw err. 
                    if (err) throw err;
                })
                console.log('Saved!');
        
        }
    }
    // PART ONE


    // city = {city : x.subCityName,
    //     locationId: x.locationId, 
    //     provinceName: x.provinceName,
    //     provinceLocationId: x.provinceLocationId, 
    //     ads: []}



}

module.exports = {
    partOne: partOne,
    partTwo: partTwo,
    writeAds: writeAds
}