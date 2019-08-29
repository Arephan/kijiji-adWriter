// This module writes a directory for each subsection of Kijiji area

const constants = require("./constants")
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
    "- 1.JPG"  + "\n" + 
    "- 2.JPG" + "\n" + 
    "- 3.JPG" + "\n"

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

// PART3 (MISC)
// topAdDuration: '7'
// submitType: saveAndCheckout
// categoryId: 15

// PART4 (USERNAME)
// username: hanilk2006@gmail.com
// password: '200639'

module.exports = { 
    partOne: partOne
}