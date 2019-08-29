const kijiji = require("kijiji-scraper");
const dbHelper = require("./dbHelper")


// DEFUALT SETTINGS
let options = {
    minResults: 20,
    scrapeResultDetails: true
};

let params = {
    locationId: kijiji.locations.QUEBEC.GREATER_MONTREAL.CITY_OF_MONTREAL,  // Same as kijiji.locations.ONTARIO.OTTAWA_GATINEAU_AREA.OTTAWA
    categoryId: kijiji.categories.BUY_AND_SELL.PHONES,
    sortByName: "dateDesc",  // Show the cheapest listings first
    keywords: 'iphone'
};

async function searchKijijiAndRecordUniqueAds(params, options) {

    // Scrape using returned promise
    await kijiji.search(params, options).then(function (ads) {
        // Use the ads array

        dbHelper.writeUniqueAdsToDB(ads)

    }).catch(console.error);

}

module.exports = { searchKijijiAndRecordUniqueAds: searchKijijiAndRecordUniqueAds }