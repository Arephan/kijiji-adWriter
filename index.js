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

// TO SCRAPE UNCOMMENT
scraper.searchKijijiAndRecordUniqueAds(params, options)

// TO MAKE ADS
adWriter.writeAds()
