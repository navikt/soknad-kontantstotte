gemini.suite('barnehageplass', suite => {
    suite
        .setUrl('/barnehageplass')
        .setCaptureElements('body')
        .before(function(actions) {
            actions.waitForElementToShow('.stegindikator', 5000);
        })
        .capture('', function(actions) {
            actions.focus('body');
        });
});
