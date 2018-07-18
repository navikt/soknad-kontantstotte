gemini.suite('kvittering', suite => {
    suite
        .setUrl('/kvittering')
        .setCaptureElements('body')
        .before(function(actions) {
            actions.waitForElementToShow('.stegindikator', 5000);
        })
        .capture('', function(actions) {
            actions.focus('body');
        });
});
