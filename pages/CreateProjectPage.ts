import Page from "./helpers/Page";

class CreateProjectPage extends Page {
    nameInput: string;
    descriptionInput: string;
    submitButton: string;

    constructor() {
        super();
        this.nameInput = `//input[@id='name']`;
        this.descriptionInput = `//input[@id='description']`;
        this.submitButton = `//i[@class='material-icons right']`;
    }

    async setName(name: string): Promise<void> {
        await this.driverWrapper.setValue(this.nameInput, name);
    }

    async setDescription(description: string): Promise<void> {
        await this.driverWrapper.setValue(this.descriptionInput, description);
    }

    async submit(): Promise<void> {
        await this.driverWrapper.clickElement(this.submitButton);
    }

    async open(): Promise<void> {
        return await super.open("/createProject");
    }
}

const createProjectPage = new CreateProjectPage();
export { createProjectPage };
