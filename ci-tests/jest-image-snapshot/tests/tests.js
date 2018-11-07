const puppeteer = require('puppeteer');

const large = { width: 1600, height: 500 };
const medium = { width: 800, height: 500 };
const small = { width: 320, height: 500 };

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
            await takeSnapshot(`veiledning-${name}`, page);
        });

        test('avbrytmodal', async () => {
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.krav');
            await page.click('.knapp.knapp--flat');
            await takeSnapshot(`avbrytmodal-${name}`, page);
        });

        test('krav-til-soker-plain', async () => {
            await page.click('.knapp.avbrytmodal__fortsettknapp.knapp--standard');
            await page.waitFor('.krav');
            await takeSnapshot(`krav-til-soker-plain-${name}`, page);
        });

        test('krav-til-soker-feilmelding', async () => {
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.skjemaelement__feilmelding');
            await takeSnapshot(`krav-til-soker-feilmelding-${name}`, page);
        });

        test('krav-til-soker-utfylt', async () => {
            const inputPanels = await page.$$('.inputPanel');
            for (const inputPanel of inputPanels) {
                await inputPanel.click();
            }
            await page.click('h1');
            await takeSnapshot(`krav-til-soker-utfylt-${name}`, page);
        });

        test('mine-barn-plain', async () => {
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.mine-barn');
            await takeSnapshot(`mine-barn-plain-${name}`, page);
        });

        test('mine-barn-feilmelding', async () => {
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.skjemaelement__feilmelding');
            await takeSnapshot(`mine-barn-feilmelding-${name}`, page);
        });

        test('mine-barn-utfylt', async () => {
            await page.type('.mine-barn__navn-input > input', 'Mock McMockface');
            await page.type('.mine-barn__fodselsdato-input > input', '01.01.2018');
            await page.click('h1');
            await takeSnapshot(`mine-barn-utfylt-${name}`, page);
        });

        test('barnehageplass-plain', async () => {
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.barnehage');
            await takeSnapshot(`barnehageplass-plain-${name}`, page);
        });

        test('barnehageplass-hjelpetekst', async () => {
            await page.click('.hjelpetekst__apneknapp');
            await page.waitFor('.modal-tekst-container');
            await takeSnapshot(`barnehageplass-hjelpetekst-${name}`, page);
        });

        test('barnehageplass-feilmelding', async () => {
            await page.click('.knapp.knapp--flat');
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.skjemaelement__feilmelding');
            await takeSnapshot(`barnehageplass-feilmelding-${name}`, page);
        });

        test('barnehageplass-utfylt', async () => {
            await page.click('[name="harBarnehageplass"][value="JA"]');
            await page.click('[name="barnBarnehageplassStatus"][value="harBarnehageplass"]');

            await page.type('.barnehageplass__dato-input input', '20.12.2018');
            await page.type('.barnehageplass__kommune-input input', 'Oslo');
            await page.type('.barnehageplass__antallTimer-input input', '50');

            await page.click('h1');
            await takeSnapshot(`barnehageplass-utfylt-${name}`, page);
        });

        test('familieforhold-plain', async () => {
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.familieforhold');
            await takeSnapshot(`familieforhold-plain-${name}`, page);
        });

        test('familieforhold-feilmelding', async () => {
            await page.click('[name="borForeldreneSammenMedBarnet"][value="JA"]');
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.skjemaelement__feilmelding');
            await takeSnapshot(`familieforhold-feilmelding-${name}`, page);
        });

        test('familieforhold-utfylt', async () => {
            await page.type('[name="annenForelder.navn"]', 'Mockman McMockface');
            await page.type('[name="annenforelder.fodselsnummer"]', '00000000000');
            await page.click('h1');
            await takeSnapshot(`familieforhold-utfylt-${name}`, page);
        });

        test('tilknytning-til-utland-plain', async () => {
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.tilknytning-til-utland');
            await takeSnapshot(`tilknytning-til-utland-plain-${name}`, page);
        });

        test('arbeid-i-utlandet-plain', async () => {
            await page.click('[name="boddEllerJobbetINorgeMinstFemAar"][value="jaINorge"]');
            await page.click(
                '[name="annenForelderBoddEllerJobbetINorgeMinstFemAar"][value="jaINorge"]'
            );
            await page.click('.knapp.knapp--hoved');
            await takeSnapshot(`arbeid-i-utlandet-plain-${name}`, page);
        });

        test('utenlandske-ytelser-plain', async () => {
            await page.click('[name="arbeiderIUtlandetEllerKontinentalsokkel"][value="NEI"]');
            await page.click('[name="arbeiderAnnenForelderIUtlandet"][value="NEI"]');
            await page.click('.knapp.knapp--hoved');
            await takeSnapshot(`utenlandske-ytelser-plain-${name}`, page);
        });

        test('utenlandske-kontantstotte-plain', async () => {
            await page.click('[name="mottarYtelserFraUtland"][value="NEI"]');
            await page.click('[name="mottarAnnenForelderYtelserFraUtland"][value="NEI"]');
            await page.click('.knapp.knapp--hoved');
            await takeSnapshot(`utenlandske-kontantstotte-plain-${name}`, page);
        });

        test('oppsummering', async () => {
            await page.click('[name="mottarKontantstotteFraUtlandet"][value="NEI"]');
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.oppsummering');
            await takeSnapshot(`oppsummering-${name}`, page);
        });

        test('kvittering', async () => {
            await page.click('.oppsummering__bekreftelse');
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.kvittering__tittel');
            await takeSnapshot(`kvittering-${name}`, page);
        });
    });

    afterAll(async () => {
        await browser.close();
    });
});
