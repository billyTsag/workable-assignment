import Page from "./helpers/Page";

class EditProjectPage extends Page {
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
        // Had to add sleeps below because there were numerous bugs without them
        await this.driverWrapper.driver.sleep(1000);
        await (await this.driverWrapper.getElement(this.nameInput)).clear();
        await this.driverWrapper.driver.sleep(1000);
        await this.driverWrapper.setValue(this.nameInput, name);
    }

    async setDescription(description: string): Promise<void> {
        // Had to add sleeps below because there were numerous bugs without them

        await (await this.driverWrapper.getElement(this.descriptionInput)).clear();
        await this.driverWrapper.driver.sleep(1000);
        await this.driverWrapper.setValue(this.descriptionInput, description);
    }

    async submit(): Promise<void> {
        await this.driverWrapper.clickElement(this.submitButton);
    }

    async open(): Promise<void> {
        return await super.open("/createProject");
    }
}

const editProjectPage = new EditProjectPage();
export { editProjectPage };
