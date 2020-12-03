import landing from '../page-models/todoist/landing';
import login from '../page-models/todoist/login';
import dashboard from '../page-models/todoist/dashboard';

// Data set
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

fixture `Todoist tests`
    .page (process.env.TODOIST_URL);

// Test(s)
test('Login into Todoist, add 1 task and validate it is successfully added', async t => {
    // Todoist Home Page
    await landing.validateHomePageAndClickLogin ();
    
    // Login Page
    await login.loginFlow (process.env.TODOIST_USERNAME, process.env.TODOIST_PASSWORD);

    // Todoist App
    await dashboard.validateDashboard ();
    await dashboard.clickAddTask ();
    await dashboard.setNewTaskNameAndAdd ('Task_1');
    await dashboard.clickCancelAddTask ();
    await dashboard.validateTaskExists ('Task_1');
});

test('Login into Todoist, add 10 tasks with dynamic names and validate tasks are properly added with corresponding names', async t => {
    // Todoist Home Page
    await landing.validateHomePageAndClickLogin ();
        
    // Login Page
    await login.loginFlow (process.env.TODOIST_USERNAME, process.env.TODOIST_PASSWORD);

    // Todoist App
    await dashboard.validateDashboard ();
    await dashboard.clickAddTask ();

    // Add tasks
    var ar = [];                                                                            // Initialize Tasks array

    for (var i = 0; i < 10; i++){
        ar.push('Task_' + Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)); // Generate dynamic Task name
        await dashboard.setNewTaskNameAndAdd (ar[i]);
    }

    await dashboard.clickCancelAddTask ();
    
    for (var j = 0; i < ar.length; j++){
        await dashboard.validateTaskExists (ar[j]);
    }                                   
    
});