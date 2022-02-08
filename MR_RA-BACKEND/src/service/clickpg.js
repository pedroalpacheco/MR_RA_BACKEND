const puppeteer = require('puppeteer');
const classoprationmongourl = require('../models/classoprationmongourl');
const wscontend = require('./wscontend');

const urlalvo = 'https://www.reclameaqui.com.br/busca/?q=itau';

const clickpg = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: false,
  });
  const page = await browser.newPage();
  await page.goto(urlalvo, { timeout: 0 });
  await page.waitForSelector('#onetrust-accept-btn-container');
  await page.click('#onetrust-accept-btn-container');

  let nextBtn = true;
  let npg = 0;

  await console.log(' ');
  await console.log('>>>INICIANDO ANALISE<<<');
  await console.log('_______________________');
  await console.log(' ');

  while (nextBtn) {
    try {
      await page.waitForTimeout(10000);
      await page.waitForSelector('li.pagination-next.ng-scope > a');
    } catch (error) {
      nextBtn = false;
    }
    if (nextBtn) {
      npg += 1;
      console.log(`ANALIZANDO ➡ Pagina: ${+npg}`);
      const links = await page.$$eval('.complain-status-top > a[title]', (options) => options.map(
        (option) => `https://www.reclameaqui.com.br${option.getAttribute('href')}`,
      ));
      let n = 0;
      const nrlinks = links.length;

      while (n < nrlinks) {
        const link = links[n];
        // await console.log(link);
        await classoprationmongourl.add({link});
        n += 1;
      }
      await page.click('li.pagination-next.ng-scope > a');
    } else {
      console.log('ANALIZE encerrada!');
    }
  }
  await page.close();
  await browser.close();

  const urlsnews = await classoprationmongourl.mostra();

  await console.log(' ');
  await console.log('>>>INICIANDO A VERIFICAÇÃO E EXTRAÇÃO<<<');
  await console.log('_______________________');
  await console.log(' ');

  await wscontend(urlsnews);
  await classoprationmongourl.close();

};

clickpg();