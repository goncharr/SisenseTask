let GooglePage = require('../pageObjects/GoogleStartPage.js').GoogleStartPage;
let BasePage = require('../pageObjects/BasePage.js').BasePage;
let SisensePage = require('../pageObjects/SisensePage.js').SisensePage;



describe('Search a "Sisense" on a google page', () => {
    let EC = protractor.ExpectedConditions
    let googlePage = new GooglePage();
    let basePage = new BasePage();
    let sisensePage = new SisensePage()
   
    beforeEach(() => {
        basePage.getUrl('https://google.co.uk');
    });

   
    it('Should verify search and first caption', () => {
       googlePage.searchItem('Sisense Business Intelligence (BI) Software')
       expect(googlePage.getFirstResultItem().getText()).toContain('Sisense: Business Intelligence (BI) Software', 'Element should contain "Sisense: Business Intelligence (BI) Software" in it');
    });
    
    it('Should verify the first link at result', () => {
        googlePage.searchItem('Sisense Business Intelligence (BI) Software');
        expect(googlePage.getFirstResultLink().getText()).toContain('https://www.sisense.com/', 'Sisense link in search results is "https://www.sisense.com/"');
    });

    it('Should verify an extra text in the search result ', () => {
        googlePage.searchItem('Sisense Business Intelligence (BI) Software');
        expect(googlePage.getFirstExtraItem().getText()).toContain(googlePage.exctraText,'Should be extra text');
    });

    it('Should be redirect on Sisense after click on item from search result', () => {
        googlePage.searchItem('Sisense Business Intelligence (BI) Software');
        googlePage.clickFirstLink();
        expect(sisensePage.checkLogo.getText()).toContain('Sisense');
    });  
    
})

