// This module writes a directory for each subsection of Kijiji area

const constants = require("./constants")
const kijijiLocationTree = require("./kijijiLocationsTree")
const fs = require('fs')
const dbHelper = require('./dbHelper')
const writeYamlFile = require('write-yaml-file')
var mergeJSON = require("merge-json") ;
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
    rObj = {
        "postAdForm.priceAmount": priceAmount,
        "postAdForm.title": title,
        "postAdForm.phoneNumber": phoneNumber,
        "postAdForm.adType": "OFFER",
        "postAdForm.priceType": "FIXED",
        "postAdForm.attributeMap[forsaleby_s]": "ownr",
        "postAdForm.description": description,
        "image_paths": ["../../../iphonePics/1.JPG", "../../../iphonePics/2.JPG"]
    }

    return rObj
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
    rObj = {
        "postAdForm.city": city,
        "postAdForm.province": province,
        "postAdForm.postalCode": postalCode,
        "postAdForm.addressCity": city,
        "postAdForm.addressProvince": province,
        "postAdForm.addressPostalCode": postalCode,
        "postAdForm.geocodeLat": lat,
        "postAdForm.geocodeLng": long,
        "postAdForm.locationId": locationId,
        "PostalLat": lat,
        "PostalLng": long,
        "locationLevel0": locationlevel0
    }
    return rObj
}

function partThree() {
    let rObj =
    {
        "topAdDuration": 7,
        "submitType": "saveAndCheckout",
        "categoryId": 15
    }

    return rObj
}

function partFour(username, password) {
    let rObj = {
        "username": username,
        "password": password
    }

    return rObj
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

            // PART FOUR
            function getRandomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
             }

            randomAccount = getRandomArbitrary(1, 5) + "@hundoiphone.com"
            
            let four = partFour(randomAccount, "Kijijiforlife123*")

            let adObj = mergeJSON.merge(one, two)
            adObj = mergeJSON.merge(adObj, three)
            adObj = mergeJSON.merge(adObj, four)

            let path = './ads/' + city + '/' + type.dirName

            try {
                fs.mkdirSync(path, { recursive: true })
            } catch (err) {
                if (err.code !== 'EEXIST') throw err
            }

            path = path + '/item.yaml'

            writeYamlFile(path, adObj).then(() => {
                console.log('done')
            })

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