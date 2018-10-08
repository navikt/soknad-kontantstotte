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
        .capture('krav-til-soker-plain', function(actions) {
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.tilpasset-stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('krav-til-soker-feilet', function(actions) {
            actions.executeJS(enableHover);
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.tilpasset-stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('krav-til-soker-utfylt', function(actions) {
            actions.executeJS(enableHover);
            actions.executeJS(function(window) {
                window.document.querySelectorAll('.inputPanel').forEach(e => e.click());
            });
            actions.waitForElementToShow('.tilpasset-stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('mine-barn-plain', function(actions) {
            actions.executeJS(enableHover);
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.tilpasset-stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('mine-barn-feilet', function(actions) {
            actions.executeJS(enableHover);
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.tilpasset-stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('mine-barn-utfylt', function(actions, find) {
            actions.executeJS(enableHover);
            actions.sendKeys(find('.mine-barn__navn-input > input'), 'Mock McMockface');
            actions.sendKeys(find('.mine-barn__fodselsdato-input > input'), '01.01.2018');
            actions.waitForElementToShow('.tilpasset-stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('barnehageplass_plain', function(actions) {
            actions.executeJS(enableHover);
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.tilpasset-stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('barnehageplass_feilet', function(actions) {
            actions.executeJS(enableHover);
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.tilpasset-stegindikator', 5000);
            actions.click('h1');
            actions.waitForElementToShow('.skjemaelement__feilmelding', 5000);
            actions.executeJS(disableHover);
        })
        .capture('barnehageplass_advarsel', function(actions, find) {
            actions.executeJS(enableHover);
            actions.executeJS(function(window) {
                window.document.querySelectorAll('[name="harBarnehageplass"]')[1].click();
                window.document.querySelectorAll('[name="barnBarnehageplassStatus"]')[0].click();
            });
            actions.sendKeys(find('.barnehageplass__antallTimer-input input'), '50');
            actions.click('h1');
            actions.waitForElementToShow('.barnehageplass__antallTimer--advarsel', 5000);
            actions.executeJS(disableHover);
        })
        .capture('barnehageplass_utfylt', function(actions, find) {
            actions.executeJS(enableHover);
            actions.executeJS(function(window) {
                window.document.querySelectorAll('[name="harBarnehageplass"]')[1].click();
                window.document.querySelectorAll('[name="barnBarnehageplassStatus"]')[0].click();
            });
            actions.sendKeys(find('.barnehageplass__dato-input input'), '20.12.2018');
            actions.sendKeys(find('.barnehageplass__kommune-input input'), 'Oslo');
            actions.sendKeys(find('.barnehageplass__antallTimer-input input'), '\b\b');
            actions.sendKeys(find('.barnehageplass__antallTimer-input input'), '20');
            actions.waitForElementToShow('.tilpasset-stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('familieforhold-plain', function(actions) {
            actions.executeJS(enableHover);
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.tilpasset-stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('familieforhold-feilmelding', function(actions) {
            actions.executeJS(enableHover);
            actions.executeJS(function(window) {
                window.document
                    .querySelectorAll('[name="borForeldreneSammenMedBarnet"]')[1]
                    .click();
            });
            actions.click('.knapp.knapp--hoved');
            actions.executeJS(disableHover);
        })
        .capture('familieforhold-utfylt', function(actions, find) {
            actions.executeJS(enableHover);
            actions.sendKeys(find('[name="annenForelder.navn"]'), 'Mockman McMockface');
            actions.sendKeys(find('[name="annenforelder.fodselsnummer"]'), '00000000000');
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('tilknytningTilUtland', function(actions) {
            actions.executeJS(enableHover);
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.tilpasset-stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('arbeidIUtlandet', function(actions) {
            actions.executeJS(enableHover);
            actions.executeJS(function(window) {
                window.document
                    .querySelectorAll('[name="boddEllerJobbetINorgeMinstFemAar"]')[0]
                    .click();
                window.document
                    .querySelectorAll('[name="annenForelderBoddEllerJobbetINorgeMinstFemAar"]')[0]
                    .click();
            });
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.tilpasset-stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('utenlandske-ytelser', function(actions) {
            actions.executeJS(enableHover);
            actions.executeJS(function(window) {
                window.document
                    .querySelectorAll('[name="arbeiderIUtlandetEllerKontinentalsokkel"]')[0]
                    .click();
                window.document
                    .querySelectorAll('[name="arbeiderAnnenForelderIUtlandet"]')[0]
                    .click();
            });
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.tilpasset-stegindikator', 5000);
            actions.click('h1');
            actions.executeJS(disableHover);
        })
        .capture('utenlandsk-kontantstotte', function(actions) {
            actions.executeJS(enableHover);
            actions.executeJS(function(window) {
                window.document.querySelectorAll('[name="mottarYtelserFraUtland"]')[0].click();
                window.document
                    .querySelectorAll('[name="mottarAnnenForelderYtelserFraUtland"]')[0]
                    .click();
            });
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.tilpasset-stegindikator', 5000);
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
            actions.waitForElementToShow('.tilpasset-stegindikator', 5000);
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
