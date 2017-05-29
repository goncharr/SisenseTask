let HtmlScreenshotReporter = require('protractor-jasmine2-screenshot-reporter');

let reporter = new HtmlScreenshotReporter({
    dest: 'target/screenshots',
    filename: 'report.html',
    showSummary: true,
    reportTitle: "Sisense report"
});

exports.config = {

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

        afterEach(function() {
        browser.executeScript('window.sessionStorage.clear();');
        browser.executeScript('window.localStorage.clear();');
    });

    },

    directConnect: true,


    capabilities: {
        'browserName': 'chrome',
        'ignoreSynchronization': true,
        'chromeOptions':{
            //disable "chrome is being controlled by automated software"
            'args': ['disable-infobars=true']
            
        }
    },

    framework: 'jasmine2',

    specs: ['./features/*.js'],

    jasmineNodeOpts: {
        defaultTimeoutInterval: 80000
    }
};