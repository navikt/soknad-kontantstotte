const puppeteer = require('puppeteer');

const large = { width: 1600, height: 1 };
const medium = { width: 800, height: 1 };
const small = { width: 320, height: 1 };

const config = [['large', large], ['medium', medium], ['small', small]];

describe('soknad-kontantstotte', () => {
    let browser;
    beforeAll(async () => {
        browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    });

    describe.each(config)('%s', (name, size) => {
        let page;

        beforeAll(async () => {
            page = await browser.newPage();
            page.setViewport(size);
            await page.goto('http://ci-test-server:8000');
        });

        test('veiledning', async () => {
            await page.waitFor('h1');
            await page.waitFor(30000);
            await takeSnapshot(`veiledning-${name}`, page);
        });

        test('krav-til-soker', async () => {
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.tilpasset-stegindikator');
            await takeSnapshot(`krav-til-soker-${name}`, page);
        });
    });

    afterAll(async () => {
        await browser.close();
    });
});
