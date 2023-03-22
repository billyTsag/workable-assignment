import Component from "./helpers/Component";

class ProjectsComponent extends Component {
    addTaskButton: string;
    viewTasksButton: string;
    editButton: string;
    deleteButton: string;
    constructor() {
        super();
        this.addTaskButton = `(//a[@id='btn_add_task'])`;
        this.viewTasksButton = `(//a[@id='btn_view_tasks'])`;
        this.editButton = `(//a[@id='btn_update_project'])`;
        this.deleteButton = `(//i[@class='material-icons right'][normalize-space()='delete'])`;
    }

    async clickAddTaskButton(index: number): Promise<void> {
        await this.driverWrapper.clickElement(`${this.addTaskButton}[${index}]`);
    }

    async clickViewTasksButton(index: number): Promise<void> {
        await this.driverWrapper.clickElement(`${this.viewTasksButton}[${index}]`);
    }

    async clickEditButton(index: number): Promise<void> {
        await this.driverWrapper.clickElement(`${this.editButton}[${index}]`);
    }

    async clickDeleteButton(index: number): Promise<void> {
        await this.driverWrapper.clickElement(`${this.deleteButton}[${index}]`);
        this.driverWrapper.acceptAlert();
    }
}

const projectsComponent = new ProjectsComponent();
export { projectsComponent };
