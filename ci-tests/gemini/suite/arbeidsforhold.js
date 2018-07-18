gemini.suite('arbeidsforhold', suite => {
    suite
        .setUrl('/arbeidsforhold')
        .setCaptureElements('body')
        .before(function(actions) {
            actions.waitForElementToShow('.stegindikator', 5000);
        })
        .capture('', function(actions) {
            actions.focus('body');
        });
});
