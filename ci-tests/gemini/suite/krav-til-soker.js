gemini.suite('krav-til-soker', suite => {
    suite
        .setUrl('/start')
        .setCaptureElements('body')
        .before(function(actions) {
            actions.waitForElementToShow('.stegindikator', 5000);
        })
        .capture('', function(actions) {
            actions.focus('body');
        });
});
