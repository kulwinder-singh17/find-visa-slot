const puppeteer = require('puppeteer');
const date = require("date-and-time");


const time=date.format(new Date(), "DD-MM-YYYY_HH_MM_ss");


(async () => {
  let pageActive = false;
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 768});
  page.setDefaultTimeout('30000');

  try {
    await page.goto(<Portal_URL>, { waitUntil: "load" });
    await page.waitForFunction(() => {
      return document.getElementById('signInName') !== null;
  });
    pageActive = await page.evaluate(() => {
      const error_1 = document.getElementById('cf-error-details');
      const error_2 = document.querySelector('img[src="/waiting_room_1x1.png"]');

      const login_page = document.getElementById('signInName');
      return error_1 === null && error_2 === null && login_page !==null;
    });
  } catch (error) {
    console.log('Not able to load page--', error);
    pageActive = false;
  }

  await page.screenshot({
    "type": "png",
    "path": `./screenshots/${time}.png`,
    "fullPage": true,
  })

  if (pageActive) {
    
    await require("./sendmessage.js").whatsapp('Page is active check your slots');
    await require("./sendmessage.js").telegram('Page is active check your slots');
  } else {
    // await require("./sendmessage.js").whatsapp('Page is not active');
  }
  await browser.close();
})();
