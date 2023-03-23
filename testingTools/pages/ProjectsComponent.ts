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

    async clickAddTaskButton(projectIndex: number): Promise<void> {
        await this.driverWrapper.clickElement(`${this.addTaskButton}[${projectIndex}]`);
    }

    async clickViewTasksButton(projectIndex: number): Promise<void> {
        await this.driverWrapper.clickElement(`${this.viewTasksButton}[${projectIndex}]`);
    }

    async clickEditButton(projectIndex: number): Promise<void> {
        await this.driverWrapper.clickElement(`${this.editButton}[${projectIndex}]`);
    }

    async clickDeleteButton(projectIndex: number): Promise<void> {
        await this.driverWrapper.clickElement(`${this.deleteButton}[${projectIndex}]`);
        await this.driverWrapper.acceptAlert();
    }
}

const projectsComponent = new ProjectsComponent();
export { projectsComponent };
