 // Config for https://www.npmjs.com/package/protractor-jasmine2-screenshot-reporter
let HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

let reporter = new HtmlScreenshotReporter({
    dest: 'HTMLreport/screenshots',
    filename: 'report.html',
    showSummary: true,
    reportTitle: "Title report"
});

module.exports.config = {
    directConnect: true,
    framework: 'jasmine2',
    specs: ['./features/*.js'],
    jasmineNodeOpts: {
        defaultTimeoutInterval: 90000
    },

    capabilities: {
        'browserName': 'chrome',
        'ignoreSynchronization': true,
        'chromeOptions':{
            //disable "chrome is being controlled by automated software"
            'args': ['disable-infobars=true']
        },
    },

    
    beforeLaunch: function() {
        return new Promise(function(resolve){
            reporter.beforeLaunch(resolve);
        });
    },

    afterLaunch: function(exitCode) {
        return new Promise(function(resolve){
            reporter.afterLaunch(resolve.bind(this, exitCode));
        });
    },

    onPrepare: function () {
        global.EC = protractor.ExpectedConditions;
        jasmine.getEnv().addReporter(reporter);
        browser.driver.manage().window().maximize();
        
        beforeEach(function() {
        browser.ignoreSynchronization = true;
    });

        // This function will be executed after each IT block in this DESCRIBE block
        afterEach(function () {
            // Wiping cookie files ONLY for current domain
            browser.manage().deleteAllCookies()
            // Wiping local and session storage
            browser.executeScript('window.sessionStorage.clear(); window.localStorage.clear();')
                    .then(undefined,
                function (err) {
                // Errors will be thrown when browser is on default data URL.
                // Session and Local storage is disabled for data URLs
                })
            // Wiping indexedDB
            browser.executeScript(`
            indexedDB.webkitGetDatabaseNames().onsuccess = function(sender,args){
                for (let dbname of sender.target.result) {
                    indexedDB.deleteDatabase(dbname)
                }
            };
            `).then(undefined,
                function (err) {
                // Errors will be thrown when browser is on default data URL.
                // indexedDB storage is disabled for data URLs
                })
        })

    },
    
};
