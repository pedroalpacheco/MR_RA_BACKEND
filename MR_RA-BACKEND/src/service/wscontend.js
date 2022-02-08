
const puppeteer = require('puppeteer');
const classoperationmongo = require('../models/classoprationmongo');

const wscontend = async (urls) =>{
    const browser = await puppeteer.launch({
        headless:false,
    });
    const page = await browser.newPage();
    for(let i = 0 ; i< urls.length; i += 1){
        const url = urls[i];
        await page.goto(`${url}`, {timeout:0});
        const link = url;
        console.log(`Pagina ${i} - Navegando em: ${url}`);
        const titulo = await page.$eval('.lzlu7c-3.berwWw',(el)=> el.textContent);
        const local = await page.$eval('.lzlu7c-6.lzlu7c-7.dLWUvV.erEgDU',(el)=> el.textContent);
        const data = await page.$eval('.lzlu7c-6.lzlu7c-8.dLWUvV.ePqLRr',(el)=> el.textContent);
        const id = await page.$eval('.lzlu7c-12.joySdk',(el)=> el.textContent);
        const reclamacao = await page.$eval('.lzlu7c-17.fXwQIB',(el)=> el.textContent);
    
        const dados ={
            link,
            titulo,
            local,
            data,
            id,
            reclamacao
        }
        // console.log(dados);
        await classoperationmongo.add(dados)
        await page.waitForTimeout(2000);
    };
    await browser.close();
    }


// wscontend(alllinks);
module.exports = wscontend;