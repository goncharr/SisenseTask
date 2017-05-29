"use strict";
let EC = protractor.ExpectedConditions
let BasePage = require('../pageObjects/BasePage.js').BasePage;

class GoogleStartPage extends BasePage{

    constructor() {
        super()
        this.searchField = $('#lst-ib');
        this.checkFirstPage = $('.cur');
        this.resultItem = $$('.r > a');
        this.resultLink = $$('._Rm');
        this.extraItem = $$('.st');
        this.exctraText = "Business Intelligence software by Sisense, the industry leader in BI for complex data - easily prepare, analyze & explore growing data from multiple sources.";     
    }
    //Search item by google
    searchItem(value = '') {
        this.searchField.click();
        this.searchField.sendKeys(value);
        this.searchField.sendKeys(protractor.Key.ENTER);
        browser.wait(EC.and(EC.visibilityOf(this.checkFirstPage)), 3000,
         'Page is appear');   
    };
    //Get the first item from result
    getFirstResultItem() {
        return this.resultItem.first();
    };
    //Get the first link from result
    getFirstResultLink() {
        return this.resultLink.first();
    };
    //Get the first extra item from result
    getFirstExtraItem() {
        return this.extraItem.first();
    };
    //Click on the first link from the result page
    clickFirstLink() {
        return this.resultItem.first().click();
    }    
        
};

// Export this page object to use it in all other files
module.exports.GoogleStartPage = GoogleStartPage
