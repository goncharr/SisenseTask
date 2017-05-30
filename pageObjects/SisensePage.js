'use strict';
let EC = protractor.ExpectedConditions
let BasePage = require('../pageObjects/BasePage.js').BasePage;

class SisensePage extends BasePage{

    constructor() {
        super()
        this.checkLogo = $('#logo');
        this.demoButton = element(by.xpath('//a[text()="Demo"]'));
        this.linkSisenseDashboard = element(by.xpath('//a[text()="Sisense Dashboard"]'));
        this.dashboardButton = $('[href="//dashdemo.sisense.com/api/demoSession/start/582a26af0ff585080700002c?r=false"]');
        this.dashboardFrame = $('.fancybox-skin');
        this.closeDashboard = $('[title="Close"]');
        this.fullScreenMarketingButton = $$('.widget-toolbar-icons').get(10);
        this.marketingWidget = $('.prism-widget-preview')        
        
    }
    //Button on the demo tab which should open dashboard
    checkDashboardButton() {
        this.linkSisenseDashboard.click();
        browser.wait(EC.visibilityOf(this.dashboardButton), 3000,
        'Open dashboard button should be available');
    };
    /**
     * @param promise Which switch to Iframe
     */
    switchToIframe(promise) {
        return browser.switchTo().frame(element(by.css(promise)).getWebElement());
    };
    //
    openDasboard() {
        this.dashboardButton.click();
        browser.wait(EC.visibilityOf(this.dashboardFrame), 5000,
        'Open dashboard button should be available');
    };
    openFullScreenMarketingChart() {
        this.fullScreenMarketingButton.click();
        browser.wait(EC.visibilityOf(this.marketingWidget), 7000,
        'Marketing widget is available');
    };
    /**
     * @param promise Should verify that element is visble
     */
    checkStakeBarChart(promise) {
        return promise.map(function (item) {
            return browser.wait(EC.and(
                EC.visibilityOf(element(by.cssContainingText('tspan', item)))
            ), 30000, 'Shoulв wait a names of column in the Marketing breakdown chart');
        })
    };
    /**
     * @param promise Should verify item of stake bar
     */
    checkCountrysNameInStakeBar(promise) {
        promise.map(function (item) {
            let selector = element(by.cssContainingText('tspan', item)).getText();
            selector.then(function (promiseValue) {
                expect(promiseValue).toEqual(item);
            })
        });
    }   
        
};

// Export this page object to use it in all other files
module.exports.SisensePage = SisensePage
