const puppeteer = require("puppeteer");
const path = require("puppeteer");
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
        words.push(currentWord);
      }
    }

    await browser.close();
  } catch (e) {
    console.error("error on reading data from web: ", e);
  }

  try {
    const wordsAsJson = JSON.stringify(words, null, "\t");
    console.log(wordsAsJson);
    await asyncFs.writeFile("data/words.json", wordsAsJson);
  } catch (e) {
    console.error("error on writing JSON to file: ", e);
  }
})();

// data clean
// (async () => {
//     const words = JSON.parse((await asyncFs.readFile("../data/words.json")));

//     console.log(words)
// })()
