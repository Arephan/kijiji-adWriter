const dbHelper = require("./dbHelper")

test("dbHelperGets right number of locations", () => {
    let allLocationsArr = dbHelper.getAllLocations()

    expect(allLocationsArr.length).toEqual(83)

})
