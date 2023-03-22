import Page from "./helpers/Page";

class TasksDBPage extends Page {
    sortTasksButton: string;
    constructor() {
        super();
        this.sortTasksButton = `//a[@id='sort_tasks']`;
    }
    async clickSortTasksButton(): Promise<void> {
        await this.driverWrapper.clickElement(this.sortTasksButton);
    }
}

const tasksDBPage = new TasksDBPage();
export { tasksDBPage };
