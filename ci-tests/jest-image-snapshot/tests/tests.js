// @ts-nocheck

const puppeteer = require('puppeteer');

const large = { width: 1600, height: 450 };
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

        test('veiledning-feilmelding', async () => {
            await page.waitFor('.typo-sidetittel');
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.skjemaelement__feilmelding');
            await takeSnapshot(`veiledning-feilmelding-${name}`, page);
        });

        test('veiledning-utfylt', async () => {
            await page.click('.skjemaelement__input.checkboks');
            await page.click('.typo-sidetittel');
            await page.waitFor(2000);
            await takeSnapshot(`veiledning-utfylt-${name}`, page);
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
            await page.click('.typo-undertittel');
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
            await page.click('.typo-undertittel');
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
            if ((await page.$('.inputPanelGruppe')) !== null) {
                await page.evaluate(() =>
                    document.querySelector('[name="mine-barn__sporsmal"][value="2"]').click()
                );
            } else {
                await page.type('.mine-barn__navn-input > input', 'NAVNESEN JENTEBARN');
                await page.type('.mine-barn__fodselsdato-input > input', '01.01.2018');
            }
            await page.click('.typo-undertittel');
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
            await page.click('.lukknapp.lukknapp--overstHjorne');
            await page.waitFor('.barnehage');
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.skjemaelement__feilmelding');
            await takeSnapshot(`barnehageplass-feilmelding-${name}`, page);
        });

        test('barnehageplass-utfylt', async () => {
            await page.evaluate(() =>
                document.querySelector('[name="harBarnehageplass"][value="JA"]').click()
            );
            await page.evaluate(() =>
                document
                    .querySelector('[name="barnBarnehageplassStatus"][value="harBarnehageplass"]')
                    .click()
            );

            await page.type('.barnehageplass__dato-input input', '20.12.2018');
            await page.type('.barnehageplass__kommune-input input', 'Oslo');
            await page.type('.barnehageplass__antallTimer-input input', '50');

            await page.click('.typo-undertittel');
            await takeSnapshot(`barnehageplass-utfylt-${name}`, page);
        });

        test('familieforhold-plain', async () => {
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.familieforhold');
            await takeSnapshot(`familieforhold-plain-${name}`, page);
        });

        test('familieforhold-feilmelding', async () => {
            await page.evaluate(() =>
                document.querySelector('[name="borForeldreneSammenMedBarnet"][value="JA"]').click()
            );
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.skjemaelement__feilmelding');
            await takeSnapshot(`familieforhold-feilmelding-${name}`, page);
        });

        test('familieforhold-utfylt', async () => {
            await page.type('[name="annenForelder.navn"]', 'Mockman McMockface');
            await page.type('[name="annenforelder.fodselsnummer"]', '00000000000');
            await page.click('.typo-undertittel');
            await takeSnapshot(`familieforhold-utfylt-${name}`, page);
        });

        test('tilknytning-til-utland-plain', async () => {
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.tilknytning-til-utland');
            await takeSnapshot(`tilknytning-til-utland-plain-${name}`, page);
        });

        test('arbeid-i-utlandet-plain', async () => {
            await page.evaluate(() =>
                document
                    .querySelector('[name="boddEllerJobbetINorgeMinstFemAar"][value="jaINorge"]')
                    .click()
            );
            await page.evaluate(() =>
                document
                    .querySelector(
                        '[name="annenForelderBoddEllerJobbetINorgeMinstFemAar"][value="jaINorge"]'
                    )
                    .click()
            );
            await page.click('.knapp.knapp--hoved');
            await takeSnapshot(`arbeid-i-utlandet-plain-${name}`, page);
        });

        test('utenlandske-ytelser-plain', async () => {
            await page.evaluate(() =>
                document
                    .querySelector('[name="arbeiderIUtlandetEllerKontinentalsokkel"][value="NEI"]')
                    .click()
            );
            await page.evaluate(() =>
                document
                    .querySelector('[name="arbeiderAnnenForelderIUtlandet"][value="NEI"]')
                    .click()
            );
            await page.click('.knapp.knapp--hoved');
            await takeSnapshot(`utenlandske-ytelser-plain-${name}`, page);
        });

        test('utenlandske-kontantstotte-plain', async () => {
            await page.evaluate(() =>
                document.querySelector('[name="mottarYtelserFraUtland"][value="NEI"]').click()
            );
            await page.evaluate(() =>
                document
                    .querySelector('[name="mottarAnnenForelderYtelserFraUtland"][value="NEI"]')
                    .click()
            );
            await page.click('.knapp.knapp--hoved');
            await takeSnapshot(`utenlandske-kontantstotte-plain-${name}`, page);
        });

        test('oppsummering-plain', async () => {
            await page.evaluate(() =>
                document
                    .querySelector('[name="mottarKontantstotteFraUtlandet"][value="NEI"]')
                    .click()
            );
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.oppsummering');
            await takeSnapshot(`oppsummering-plain-${name}`, page);
        });

        test('oppsummering-feilmelding', async () => {
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.skjemaelement__feilmelding');
            await takeSnapshot(`oppsummering-feilmelding-${name}`, page);
        });

        test('oppsummering-utfylt', async () => {
            await page.click('.skjemaelement__input.checkboks');
            await page.click('.typo-undertittel');
            await page.waitFor(2000);
            await takeSnapshot(`oppsummering-utfylt-${name}`, page);
        });

        test('kvittering', async () => {
            await page.click('.knapp.knapp--hoved');
            await page.waitFor('.kvittering__tittel');
            await takeSnapshot(`kvittering-${name}`, page);
        });

        test('sprak-tekster', async () => {
            await page.goto('http://ci-test-server:8000');
            await page.waitFor('.typo-sidetittel');
            await page.select('select', 'nn');
            await page.waitFor(1000);
            await takeSnapshot(`sprak-tekster-${name}`, page);
        }, 8000);

        test('sprak-land', async () => {
            veiledningTilOppsummering(page);
            await page.waitFor('.oppsummering');
            await takeSnapshot(`sprak-land-${name}`, page);
        });
    });

    afterAll(async () => {
        await browser.close();
    });
});

async function veiledningTilOppsummering(page) {
    // Veiledning
    await page.click('.skjemaelement__input.checkboks');
    await page.click('.knapp.knapp--hoved');

    // Krav til søker
    const inputPanels = await page.$$('.inputPanel');
    for (const inputPanel of inputPanels) {
        await inputPanel.click();
    }
    await page.click('.knapp.knapp--hoved');

    // Mine barn
    if ((await page.$('.inputPanelGruppe')) !== null) {
        await page.evaluate(() =>
            document.querySelector('[name="mine-barn__sporsmal"][value="0"]').click()
        );
    } else {
        await page.type('.mine-barn__navn-input > input', 'NAVNESEN JENTEBARN');
        await page.type('.mine-barn__fodselsdato-input > input', '01.01.2018');
    }
    await page.click('.knapp.knapp--hoved');

    // Barnehageplass
    await page.evaluate(() =>
        document.querySelector('[name="harBarnehageplass"][value="NEI"]').click()
    );
    await page.evaluate(() =>
        document
            .querySelector('[name="barnBarnehageplassStatus"][value="garIkkeIBarnehage"]')
            .click()
    );
    await page.click('.knapp.knapp--hoved');

    // Familieforhold
    await page.evaluate(() =>
        document.querySelector('[name="borForeldreneSammenMedBarnet"][value="NEI"]').click()
    );
    await page.click('.knapp.knapp--hoved');

    // Tilknytning til utland
    await page.evaluate(() =>
        document
            .querySelector('[name="boddEllerJobbetINorgeMinstFemAar"][value="jaINorge"]')
            .click()
    );
    await page.click('.knapp.knapp--hoved');

    // Arbeid i utlandet
    await page.evaluate(() =>
        document
            .querySelector('[name="arbeiderIUtlandetEllerKontinentalsokkel"][value="NEI"]')
            .click()
    );
    await page.click('.knapp.knapp--hoved');

    // Utenlandske ytelser
    await page.evaluate(() =>
        document.querySelector('[name="mottarYtelserFraUtland"][value="NEI"]').click()
    );
    await page.click('.knapp.knapp--hoved');

    // Kontantstøtte utlandet
    await page.evaluate(() =>
        document.querySelector('[name="mottarKontantstotteFraUtlandet"][value="NEI"]').click()
    );
    await page.click('.knapp.knapp--hoved');
}
