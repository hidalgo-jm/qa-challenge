import landing from '../page-models/todoist/landing';
import login from '../page-models/todoist/login';
import dashboard from '../page-models/todoist/dashboard';

// Data set
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

fixture `Todoist login tests`
    .page (process.env.TODOIST_URL);

// Test(s)
test('Successful login and logout', async t => {
    // Todoist Home Page
    await landing.validateHomePageAndClickLogin ();
    
    // Login Page
    await login.loginFlow (process.env.TODOIST_USERNAME, process.env.TODOIST_PASSWORD);

    // Todoist App
    await dashboard.validateDashboard ();
    await dashboard.logout ();

    // Todoist Home Page
    await landing.validateHomePage ();
});

test('Set no credentials and validate error message', async t => {
    // Todoist Home Page
    await landing.validateHomePageAndClickLogin();
    
    // Login Page
    await login.loginFlow(process.env.BLANK_VALUE, process.env.BLANK_VALUE);                              
    await login.validateErrorMessage('Invalid email address.');
});

test('Set an invalid email address and validate error message', async t => {
    // Todoist Home Page
    await landing.validateHomePageAndClickLogin();
    
    // Login Page
    await login.loginFlow(process.env.TODOIST_INVALID_USERNAME, process.env.BLANK_VALUE);                              
    await login.validateErrorMessage('Invalid email address.');
});

test('Set valid email, blank password and validate error message', async t => {
    // Todoist Home Page
    await landing.validateHomePageAndClickLogin();
    
    // Login Page
    await login.loginFlow(process.env.TODOIST_USERNAME, process.env.BLANK_VALUE);                              
    await login.validateErrorMessage('Blank password.');
});

test('Set wrong credentials and validate error message', async t => {
    // Todoist Home Page
    await landing.validateHomePageAndClickLogin();
    
    // Login Page
    await login.loginFlow(process.env.TODOIST_USERNAME, process.env.TODOIST_INVALID_PASSWORD);                              
    await login.validateErrorMessage('Wrong email or password.');
});