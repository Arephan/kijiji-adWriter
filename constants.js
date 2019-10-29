const forSale = [{
    name: "iphone",
    phoneNumber: "438 793 1474‬",

    types: [
        // { name: "iphone 6 16gb", price: 185, dirName: "iphone-6-16gb" },
        // { name: "iphone 6 32gb", price: 195, dirName: "iphone-6-32gb" },
        // { name: "iphone 6 64gb", price: 215, dirName: "iphone-6-64gb" },
        { name: "iphone 6s 16gb", price: 180, dirName: "iphone-6s-16gb" },
        { name: "iphone 6s 32gb", price: 200, dirName: "iphone-6s-32gb" }
        // { name: "iphone 6s 64gb", price: 255, dirName: "iphone-6s-64gb" },
    ],
    colors: ["grey", "rose", "silver", "gold"],
    condition: ["mint", "excellent", "10/10", "amazing", "awesome", "great"]

}]

const personalKijijiAccounts = [
    {email : "example@gmail.com", password: "examplepass"},
    {email : "example2@gmail.com", password: "example2pass"}
]


module.exports = {
    forSale: forSale,
    personalKijijiAccounts
}