import { Selector, t } from 'testcafe';

class Landing {
    constructor () {
        this.logo                = Selector('nav a[aria-label*="Home"]');
        this.loginLink           = Selector('a[href*="login"]');
    }

    async validateHomePage () {
        await t
            .expect(Selector(this.logo).exists).ok()                                                 // Validate Todoist logo is displayed
    }

    async validateHomePageAndClickLogin () {
        await t
            .expect(Selector(this.logo).exists).ok()                                                 // Validate Todoist logo is displayed
            .click(this.loginLink);                                                                  // Click on Login link
    }
}

export default new Landing();