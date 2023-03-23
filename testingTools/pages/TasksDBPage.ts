import Page from "./helpers/Page";

class TasksDBPage extends Page {
    sortTasksButton: string;
    searchInput: string;
    constructor() {
        super();
        this.sortTasksButton = `//a[@id='sort_tasks']`;
        this.searchInput = `//input[@id='search']`;
    }
    async clickSortTasksButton(): Promise<void> {
        await this.driverWrapper.clickElement(this.sortTasksButton);
    }

    async search(searchValue: string): Promise<void> {
        await this.driverWrapper.setValue(this.searchInput, searchValue);
    }
}

const tasksDBPage = new TasksDBPage();
export { tasksDBPage };
