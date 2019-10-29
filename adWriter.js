// This module writes a directory for each subsection of Kijiji area

const constants = require("./constants")
const kijijiLocationTree = require("./kijijiLocationsTree")
const fs = require('fs')
const dbHelper = require('./dbHelper')
const writeYamlFile = require('write-yaml-file')
var mergeJSON = require("merge-json");
const random = require('random')
const seedrandom = require('seedrandom')

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

function partOne(priceAmount, title, phoneNumber, description, color) {
    rObj = {
        "postAdForm.priceAmount": priceAmount,
        "postAdForm.title": title,
        "postAdForm.phoneNumber": phoneNumber,
        "postAdForm.adType": "OFFER",
        "postAdForm.priceType": "FIXED",
        "postAdForm.attributeMap[forsaleby_s]": "ownr",
        "postAdForm.description": description,
        "image_paths": ["../../../../iphonePics/" + color + "/1.JPG", "../../../../iphonePics/" + color + "/2.JPG"]
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

function writeAds(dbBranchName, kijijiAccounts) {
    let ads = dbHelper.db.get(dbBranchName)
    for (ad of ads) {
        writeAd(ad, constants.forSale, dbBranchName, kijijiAccounts)
    }
}

function writeAd(ad, forSale, dbBranchName, kijijiAccounts) {

    // PART ONE

    random.use(seedrandom(ad.url)) // seed random with url string

    let randomColorIndex = random.int(min = 0, max = forSale[0].colors.length - 1)
    let randomTypeIndex = random.int(min = 0, max = forSale[0].types.length - 1)
    let randomConditionIndex = random.int(min = 0, max = forSale[0].condition.length - 1)

    let color = forSale[0].colors[randomColorIndex]
    let type = forSale[0].types[randomTypeIndex]
    let condition = forSale[0].condition[randomConditionIndex]
    let title = "Unlocked " + type.name + " " + color + " " + condition + " condition"
    let priceAmount = type.price
    let phoneNumber = forSale[0].phoneNumber
    let description = "call (438) 793-1474"

    let one = partOne(priceAmount, title, phoneNumber, description,color)

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


    randomAccountIndex = random.int(min = 0, max = kijijiAccounts.length-1)
    let randomAccount = kijijiAccounts[randomAccountIndex]

    let four = partFour(randomAccount.email, randomAccount.password)

    let adObj = mergeJSON.merge(one, two)
    adObj = mergeJSON.merge(adObj, three)
    adObj = mergeJSON.merge(adObj, four)

    let path = './' + dbBranchName + '/' + city + '/' + type.dirName + '/' + postalCode

    try {
        fs.mkdirSync(path, { recursive: true })
    } catch (err) {
        if (err.code !== 'EEXIST') throw err
    }

    path = path + '/item.yaml'

    writeYamlFile(path, adObj).then(() => {
        console.log('done')
    })

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