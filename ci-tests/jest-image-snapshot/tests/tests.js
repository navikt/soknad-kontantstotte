const puppeteer = require('puppeteer');
const utils = require('../utils');

const large = { width: 1600, height: 1 };
const medium = { width: 800, height: 1 };
const small = { width: 320, height: 1 };

describe('soknad-kontantstotte', () => {
    let browser;
    let page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ args: ['--no-sandbox'] });
        page = await browser.newPage();
        await page.goto('http://ci-test-server:8000');
    });

    test('veiledning', async () => {
        await page.waitFor('h1');
        await utils.takeSnapshot('veiledning-large', page, large);
        await utils.takeSnapshot('veiledning-medium', page, medium);
        await utils.takeSnapshot('veiledning-small', page, small);
    });

    test('krav-til-soker', async () => {
        await page.click('.knapp.knapp--hoved');
        await page.waitFor('.tilpasset-stegindikator');
        await utils.takeSnapshot('krav-til-soker-large', page, large);
        await utils.takeSnapshot('krav-til-soker-medium', page, medium);
        await utils.takeSnapshot('krav-til-soker-small', page, small);
    });

    afterAll(async () => {
        await browser.close();
    });
});
