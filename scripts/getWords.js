const puppeteer = require("puppeteer");
const uniq = require("lodash.uniq")
const asyncFs = require("fs").promises;

// get words and save
(async () => {
  const words = [];

  try {
    const addresses = Array(9)
      .fill()
      .map((e, k) =>
        k == 0
          ? "https://pt.wikwik.org/palavras5letras.htm"
          : `https://pt.wikwik.org/palavras5letraspagina${k + 1}.htm`
      );
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    for (const address of addresses) {
      await page.goto(address);
      const wordsContainer = (await page.$$(".mm"))[0];
      const wordsElements = Array.from(await wordsContainer.$$("a"));
      for (const word of wordsElements) {
        const textElementHandle = await word.getProperty("innerText");
        const currentWord = await textElementHandle.jsonValue();
        words.push(currentWord.split(' '));
      }
    }

    await browser.close();
  } catch (e) {
    console.error("error on reading data from web: ", e);
  }

  try {
    const normalizedWords = uniq(
      words.flat()
        .map(w => w.toLowerCase())
        .filter(w => w && w.length && w.length <= 5)
    );
    const wordsAsJson = JSON.stringify(normalizedWords, null, "\t");
    await asyncFs.writeFile("data/words.json", wordsAsJson);
  } catch (e) {
    console.error("error on writing JSON to file: ", e);
  }
})();