import { Selector, t } from 'testcafe';

class Dashboard {
    constructor () {
        this.todoistApp = Selector('#todoist_app');
        this.addTaskButton = Selector('.plus_add_button');
        this.quickAddTask = Selector('button[aria-label="Quick Add"]');
        this.newTaskTextbox = Selector('div[role="textbox"]');
        this.addNewTaskButton = Selector('button[type="submit"]');
        this.cancelButton = Selector('.cancel');
        this.taskLabel = Selector('.markdown_content');
        this.deleteHighlightedTaskButton = Selector('li[data-action-hint="task-overflow-menu-delete"]');
        this.settingsButton = Selector('button[aria-label="Setting"]');
        this.settingsMenuOption = Selector('.usermenu__row-label');
    }

    async validateDashboard () {
        await t
            .expect(Selector(this.todoistApp).exists).ok()                                         // Validate Todoist App is loaded after login
    }

    async logout () {
        await t
            .click(this.settingsButton)                                                             // Click on Settings button
            .click(Selector(this.settingsMenuOption.withText('Log out')));                          // Click on Log out button
    }

    async clickAddTask () {
        await t
            .click(this.addTaskButton);                                                             // Click on Add Task button
    }

    async setNewTaskNameAndAdd (taskName) {
        await t
            .click(this.newTaskTextbox)                                                             // Click on New Task name textbox
            .typeText(this.newTaskTextbox, taskName)                                                // Type New Task name
            .click(this.addNewTaskButton);                                                          // Click on Add Task button to submit new task name
    }

    async clickCancelAddTask () {
        await t
            .click(this.cancelButton);                                                              // Click on Cancel button
    }

    async validateTaskExists (taskName) {
        await t
            .expect(Selector(this.taskLabel.withText(taskName)).exists).ok();                       // Validate Task was added correctly by checking given name
    }
    
}

export default new Dashboard();