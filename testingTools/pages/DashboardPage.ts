import Page from "./helpers/Page";

class DashboardPage extends Page {
    createNewButton: string;

    constructor() {
        super();
        this.createNewButton = `//a[@href='/createProject']`;
    }

    async createNewProject(): Promise<void> {
        await this.driverWrapper.clickElement(this.createNewButton);
    }

    async open(): Promise<void> {
        return await super.open("/dashboard");
    }
}

const dashboardPage = new DashboardPage();
export { dashboardPage };
