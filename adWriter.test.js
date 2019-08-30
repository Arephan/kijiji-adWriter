const adWriter = require("./adWriter")

const exampleAd = {
    "title": "iphone 7 plus 32GB matte black ",
    "description": "unlocked iphone 7 plus 32GB matte black . Posted in phones, cell phones in Mississauga / Peel Region. August 29, 2019",
    "date": "2019-08-29T14:40:58.000Z",
    "image": null,
    "images": [],
    "attributes": {
      "phonebrand": "apple",
      "phonecarrier": "unlck",
      "forsaleby": "ownr",
      "price": 450,
      "location": {
        "latitude": 43.58996670000001,
        "longitude": -79.6784509,
        "mapAddress": "Mississauga, ON L5V1R2",
        "province": "ontario",
        "mapRadius": 0
      },
      "type": "OFFER"
    },
    "url": "https://www.kijiji.ca/v-cell-phone/mississauga-peel-region/iphone-7-plus-32gb-matte-black/1456404488"
  }

test("partOne function spits right amount of characters", () => {
    let str = adWriter.partOne(200, 
        "iphone 6s 16gb silver", 
        "123 123 1231", 
        "call 123 123 1231")

    expect(str.length).toEqual(314)
    })

// test("partTwo function spits right amount of characters", () => {
//     adWriter.partTwo(exampleAd.attributes.location.mapAddress.slice(0,1),
//     exampleAd.attributes.location.province,
//     exampleAd.attributes.location.mapAddress.slice(-1,0),
//     exampleAd.attributes.location.latitude,
//     exampleAd.attributes.location.longitude,
//     )
// })