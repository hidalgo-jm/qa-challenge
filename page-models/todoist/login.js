import { Selector, t } from 'testcafe';

class Login {
    constructor () {
        this.loginForm = Selector('#login_form');
        this.emailTextbox  = Selector('#email');
        this.passwordTextbox  = Selector('#password');
        this.keepMeLoggedInCheckbox = Selector('#permanent_login');
        this.loginButton = Selector('button[onclick*="submit"]');
        this.errorMessageLabel = Selector('.error_msg');
    }

    async loginFlow (user, password) {
        await t
            .expect(Selector(this.loginForm).exists).ok();                              // Validate Login label is displayed
            
        if(user.length > 0) {
            await t
                .typeText(this.emailTextbox, user);                                     // Set email
        }

        if(password.length > 0) {
            await t
                .typeText(this.passwordTextbox, password);                              // Set password
        }

        await t
            .click(this.keepMeLoggedInCheckbox)                                         // Uncheck Keep Me Logged In checkbox (checked by default)
            .click(this.loginButton);                                                   // Click on Log In button
    }

    async validateErrorMessage (message) {
        await t
            .expect(Selector(this.errorMessageLabel.withText(message)).exists).ok();    // Validate Task was added correctly by checking given name
    }
}

export default new Login();