const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://pt.wikwik.org/palavras5letras.htm');
    const wordsContainer = (await page.$$('.mm'))[0]
    const wordsElements = Array.from(await wordsContainer.$$('a'))
    const words = []
    for (const word of wordsElements) {
        const w = await (await word.getProperty('innerText')).jsonValue()
        words.push(w)
    }
    console.log(words)
    await browser.close();
  })();