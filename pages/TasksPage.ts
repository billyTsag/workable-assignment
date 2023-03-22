import Page from "./helpers/Page";

class TasksPage extends Page {
    editButton: string;
    deleteButton: string;
    constructor() {
        super();
        this.editButton = `(//i[@class='material-icons right'][normalize-space()='edit'])`;
        this.deleteButton = `(//i[@class='material-icons right'][normalize-space()='delete'])`;
    }
    async clickEditButton(index: number): Promise<void> {
        await this.driverWrapper.clickElement("(//a[@id='btn_update_task'])[3]");
    }

    async clickDeleteButton(index: number): Promise<void> {
        await this.driverWrapper.clickElement(`${this.deleteButton}[${index}]`);
        this.driverWrapper.acceptAlert();
    }
}

const tasksPage = new TasksPage();
export { tasksPage };
