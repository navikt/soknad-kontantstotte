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
        })
        .capture('mine-barn', function(actions) {
            actions.executeJS(function(window) {
                window.document.querySelectorAll('.inputPanel').forEach(e => e.click());
            });
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.stegindikator', 5000);
        })
        .capture('familieforhold', function(actions) {
            actions.executeJS(function(window) {
                window.document.querySelectorAll('[name="barn"]')[0].click();
            });
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.stegindikator', 5000);
        })
        .capture('barnehageplass', function(actions) {
            actions.executeJS(function(window) {
                window.document
                    .querySelectorAll('[name="borForeldreneSammenMedBarnet"]')[1]
                    .click();
                window.document.querySelectorAll('[name="erAvklartDeltBosted"]')[0].click();
            });
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.stegindikator', 5000);
        })
        .capture('arbeidsforhold', function(actions) {
            actions.executeJS(function(window) {
                window.document.querySelectorAll('[name="barnehageplass"]')[0].click();
            });
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.stegindikator', 5000);
            actions.click('body');
        })
        .capture('oppsummering', function(actions) {
            actions.executeJS(function(window) {
                window.document.querySelectorAll('[name="mottarYtelserFraUtlandet"]')[1].click();
                window.document
                    .querySelectorAll('[name="arbeiderIUtlandetEllerKontinentalsokkel"]')[1]
                    .click();
                window.document
                    .querySelectorAll('[name="mottarKontantstotteFraAnnetEOS"]')[1]
                    .click();
            });
            actions.click('.knapp.knapp--hoved');
            actions.waitForElementToShow('.stegindikator', 5000);
        })
        .capture('kvittering', function(actions) {
            actions.wait(1000);
            actions.waitForElementToShow('.stegindikator', 5000);
        });
});
