module.exports = {
    rootUrl: 'http://ci-test-server:8000',
    screenshotsDir: './baseline',

    browsers: {
        chrome_large: {
            gridUrl: 'http://chrome:4444/wd/hub',
            desiredCapabilities: {
                browserName: 'chrome',
            },
            windowSize: '1600x10000',
        },
        chrome_medium: {
            gridUrl: 'http://chrome:4444/wd/hub',
            desiredCapabilities: {
                browserName: 'chrome',
            },
            windowSize: '800x10000',
        },
        chrome_small: {
            gridUrl: 'http://chrome:4444/wd/hub',
            desiredCapabilities: {
                browserName: 'chrome',
                chromeOptions: {
                    mobileEmulation: {
                        deviceMetrics: {
                            width: 320,
                            height: 10000,
                        },
                    },
                },
            },
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
