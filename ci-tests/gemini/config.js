module.exports = {
    rootUrl: 'http://visual-test-server:8000',
    gridUrl: 'http://hub:4444/wd/hub',
    screenshotsDir: './baseline',
    desiredCapabilities: {
        browserName: 'chrome',
    },

    browsers: {
        chrome_large: {
            windowSize: '1600x10000',
        },
        chrome_medium: {
            windowSize: '800x10000',
        },
        chrome_small: {
            windowSize: '430x10000',
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
