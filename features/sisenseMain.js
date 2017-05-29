let GooglePage = require('../pageObjects/GoogleStartPage.js').GoogleStartPage;
let BasePage = require('../pageObjects/BasePage.js').BasePage;
let SisensePage = require('../pageObjects/SisensePage.js').SisensePage;



describe('Should verify actions on the Sisense main page', () => {
    let EC = protractor.ExpectedConditions;
    let basePage = new BasePage();
    let sisensePage = new SisensePage();
    
   
    it('Should verify that Dasboard Button is available', () => {
       basePage.getUrl('https://www.sisense.com'); 
       expect(sisensePage.checkLogo.getText()).toContain('Sisense');
       browser.wait(EC.visibilityOf(sisensePage.demoButton), 5000,
            'Demo buttons should be available');
       sisensePage.checkDashboardButton();
    });
    
    it('Should verify opening a Dashboard', () => {
       basePage.getUrl('https://www.sisense.com/demo'); 
       sisensePage.openDasboard();
       sisensePage.switchToIframe('.fancybox-iframe');
       sisensePage.checkStakeBarChart(['Bangalore','Berlin','Cape Town','London','Paris']);
    });

    it('Should verify full screen for stake bar chart', () => {
       basePage.getUrl('https://www.sisense.com/demo'); 
       sisensePage.openDasboard();
       sisensePage.switchToIframe('.fancybox-iframe');
       sisensePage.checkStakeBarChart(['Bangalore','Berlin','Cape Town','London','Paris']);
       sisensePage.openFullScreenMarketingChart();
       sisensePage.checkCountrysNameInStakeBar(['Bangalore','Berlin','Cape Town','London','Paris']);
    });
     
    
})

