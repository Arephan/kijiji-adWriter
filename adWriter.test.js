const adWriter = require("./adWriter")

test("partOne function spits right amount of characters", () => {
    let str = adWriter.partOne(200, 
        "iphone 6s 16gb silver", 
        "123 123 1231", 
        "call 123 123 1231")

    expect(str.length).toEqual(314)
    })