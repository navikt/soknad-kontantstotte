function disableHover(window) {
    const styleEl = window.document.createElement('style');
    styleEl.setAttribute('id', 'disable-hover');
    document.head.appendChild(styleEl);
    const styleSheet = styleEl.sheet;
    styleSheet.insertRule('* { pointer-events: none }', 0);
}

function enableHover(window) {
    window.document.querySelector('#disable-hover').outerHTML = '';
}

gemini.suite('soknad-kontantstotte', suite => {
    suite
        .setUrl('/')
        .setCaptureElements('body')
        .capture('veiledningsside', function(actions) {
            actions.waitForElementToShow('h1', 5000);
        })
        .capture('krav-til-soker', function(actions) {
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('mine-barn', function(actions) {
            actions.executeJS(enableHover);
            actions.executeJS(function(window) {
                window.document.querySelectorAll('.inputPanel').forEach(e => e.click());
            });
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('familieforhold', function(actions, find) {
            actions.executeJS(enableHover);
            actions.sendKeys(find('.mine-barn__navn-input > input'), 'Mock McMockface');
            actions.sendKeys(find('.mine-barn__fodselsdato-input > input'), '01.01.2018');
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('barnehageplass', function(actions) {
            actions.executeJS(enableHover);
            actions.executeJS(function(window) {
                window.document
                    .querySelectorAll('[name="borForeldreneSammenMedBarnet"]')[0]
                    .click();
            });
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('arbeidIUtlandet', function(actions) {
            actions.executeJS(enableHover);
            actions.executeJS(function(window) {
                window.document.querySelectorAll('[name="harBarnehageplass"]')[0].click();
                window.document.querySelectorAll('[name="barnBarnehageplassStatus"]')[0].click();
            });
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('utenlandske-ytelser', function(actions) {
            actions.executeJS(enableHover);
            actions.executeJS(function(window) {
                window.document
                    .querySelectorAll('[name="arbeiderIUtlandetEllerKontinentalsokkel"]')[0]
                    .click();
            });
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('utenlandsk-kontantstotte', function(actions) {
            actions.executeJS(enableHover);
            actions.executeJS(function(window) {
                window.document.querySelectorAll('[name="mottarYtelserFraUtland"]')[0].click();
            });
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('oppsummering', function(actions) {
            actions.executeJS(enableHover);
            actions.executeJS(function(window) {
                window.document
                    .querySelectorAll('[name="mottarKontantstotteFraUtlandet"]')[0]
                    .click();
            });
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('kvittering', function(actions) {
            actions.executeJS(enableHover);
            actions.executeJS(function(window) {
                window.document
                    .querySelectorAll('.oppsummering__bekreftelse .inputPanel__field')[0]
                    .click();
            });
            actions.click('.knapp.knapp--hoved');
            actions.wait(2000);
            actions.waitForElementToShow('.kvittering__tittel', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        });

    gemini.suite('innsending-feilet', function(suite) {
        suite
            .setUrl('/innsending-feilet')
            .setCaptureElements('body')
            .capture('', function(actions) {
                actions.waitForElementToShow('.innsending-feilet', 5000);
            });
    });
});
