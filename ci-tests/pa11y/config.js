const pa11y = require('pa11y');
const html = require('pa11y-reporter-html');
var fs = require('fs');

runExample();

// Async function required for us to use await
async function runExample() {
    try {
        const result = await Promise.all([
            pa11y('http://visual-test-server:8000/', {
                actions: ['wait for element h1 to be added'],
            }),
            pa11y('http://visual-test-server:8000/start', {
                actions: ['wait for element .stegindikator to be added'],
            }),
            pa11y('http://visual-test-server:8000/mine-barn', {
                actions: ['wait for element .stegindikator to be added'],
            }),
            pa11y('http://visual-test-server:8000/familieforhold', {
                actions: ['wait for element .stegindikator to be added'],
            }),
            pa11y('http://visual-test-server:8000/barnehageplass', {
                actions: ['wait for element .stegindikator to be added'],
            }),
            pa11y('http://visual-test-server:8000/arbeidsforhold', {
                actions: ['wait for element .stegindikator to be added'],
            }),
            pa11y('http://visual-test-server:8000/oppsummering', {
                actions: ['wait for element .stegindikator to be added'],
            }),
            pa11y('http://visual-test-server:8000/kvittering', {
                actions: ['wait for element .stegindikator to be added'],
            }),
        ]);

        const htmlResults = await Promise.all(
            result.map(res => {
                return html.results(res);
            })
        );

        fs.writeFile('/reports/pa11y.html', htmlResults);
    } catch (error) {
        // Output an error if it occurred
        console.error(error.message);
    }
}
