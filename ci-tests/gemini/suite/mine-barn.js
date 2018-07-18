gemini.suite('mine-barn', suite => {
    suite
        .setUrl('/mine-barn')
        .setCaptureElements('body')
        .before(function(actions) {
            actions.waitForElementToShow('.stegindikator', 5000);
        })
        .capture('', function(actions) {
            actions.focus('body');
        });
});
