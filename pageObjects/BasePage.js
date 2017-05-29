'use strict';


class BasePage {

    constructor() {

    }

    //Get current URL
    getUrl(value) {
        browser.get(value);
        browser.waitForAngular();   
     };

};

// Exports this page object to use it in all other files
module.exports.BasePage = BasePage
