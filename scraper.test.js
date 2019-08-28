const searchKijiji = require("./scraper")

test('there are 20 ads', async () => {
    let data = await searchKijiji()
    expect(data.length).toBe(20);
  });
