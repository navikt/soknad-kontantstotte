gemini.suite('veiledningsside', suite => {
    suite
        .setUrl('/')
        .setCaptureElements('body')
        .before(function(actions) {
            actions.waitForElementToShow('h1', 5000);
        })
        .capture('', function(actions) {
            actions.focus('body');
        });
});
