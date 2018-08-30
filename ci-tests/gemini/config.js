module.exports = {
    rootUrl: 'http://ci-test-server:8000',
    screenshotsDir: './baseline',

    browsers: {
        chrome_large: {
            gridUrl: 'http://selenium-hub:4444/wd/hub',
            desiredCapabilities: {
                browserName: 'chrome',
            },
            windowSize: '1600x10000',
        },
        chrome_medium: {
            gridUrl: 'http://selenium-hub:4444/wd/hub',
            desiredCapabilities: {
                browserName: 'chrome',
            },
            windowSize: '800x10000',
        },
        chrome_small: {
            gridUrl: 'http://selenium-hub:4444/wd/hub',
            desiredCapabilities: {
                browserName: 'chrome',
            },
            windowSize: '436x10000',
        },
    },

    system: {
        plugins: {
            'html-reporter/gemini': {
                enabled: false,
                path: '/reports/gemini',
                defaultView: 'all',
            },
        },
    },
};
