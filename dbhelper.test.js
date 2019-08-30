const dbHelper = require("./dbHelper")

test("function getAllLocations() return 83 array size", () => {
    let allLocationsArr = dbHelper.getAllLocations()

    expect(allLocationsArr.length).toEqual(83)

})

test("function getAdsByLocations() returns 83 array size", () => {
    let adsByLocations = dbHelper.getAdsByLocations()
    expect(adsByLocations.length).toEqual(83)
})