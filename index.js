const scraper = require("./scraper")
const dbHelper = require("./dbHelper")

let defaultDB = 1 
if (defaultDB) {
    dbHelper.setDefaults()
}

scraper.searchKijijiAndRecordUniqueAds()