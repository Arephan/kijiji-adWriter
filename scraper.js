const kijiji = require("kijiji-scraper");
const dbHelper = require("./dbHelper")


async function searchKijijiAndRecordUniqueAds(params, options, branchName) {

    // Scrape using returned promise
    await kijiji.search(params, options).then(function (ads) {
        // Use the ads array

        dbHelper.writeUniqueAdsToDB(ads, branchName)

    }).catch(console.error);

}

module.exports = { searchKijijiAndRecordUniqueAds: searchKijijiAndRecordUniqueAds }