const scraper = require("./scraper")
const dbHelper = require("./dbHelper")
const adWriter = require("./adWriter")
const kijiji = require("kijiji-scraper")
const constants = require("./constants")

// DB SETUP SWITCH
let defaultDB = 1 
if (defaultDB) {
    dbHelper.setDefaults()
}

// DEFUALT KIJIJI SEARCH SETTINGS
let options = {
    minResults: 20,
    scrapeResultDetails: true
};

let params = {
    locationId: 0,  // Same as kijiji.locations.ONTARIO.OTTAWA_GATINEAU_AREA.OTTAWA
    categoryId: 0,
    sortByName: "dateDesc",  // Show the cheapest listings first
    keywords: 'iphone'
};

let dbBranchName = "ads"

// TO MAKE CANADA WIDE ADS
// scraper.searchKijijiAndRecordUniqueAds(params, options, dbBranchName)
// adWriter.writeAds(dbBranchName)

// TO MAKE MONTREAL ADS
params.locationId = kijiji.locations.QUEBEC.GREATER_MONTREAL.CITY_OF_MONTREAL
dbBranchName = "montreal"
scraper.searchKijijiAndRecordUniqueAds(params, options, dbBranchName).then(() => {
adWriter.writeAds(dbBranchName)
})
