import Page from "./helpers/Page";

class CreateTaskPage extends Page {
    summaryInput: string;
    descriptionInput: string;
    statusDropdown: string;
    statusSelection: string;
    labelsDropdown: string;
    labelSelection: string;
    uploadFileButton: string;
    submitButton: string;

    constructor() {
        super();
        this.summaryInput = `//input[@id='summary']`;
        this.descriptionInput = `//textarea[@id='description']`;
        this.statusDropdown = `//input[@class='select-dropdown dropdown-trigger']`;
        this.statusSelection = `//span[normalize-space()='TO DO']`;
        this.labelsDropdown = `//input[@id='search_input']`;
        this.labelSelection = `//li[normalize-space()='techdept']`;
        this.uploadFileButton = `//input[@id='attachments']`;
        this.submitButton = `//button[@name='action']`;
    }

    async setSummary(name: string): Promise<void> {
        await this.driverWrapper.setValue(this.summaryInput, name);
    }

    async setDescription(description: string): Promise<void> {
        await this.driverWrapper.setValue(this.descriptionInput, description);
    }

    private selectStatus(status: string): string {
        // Below to not replace the actual value
        const statusString = this.statusSelection;
        return statusString.replace("TO DO", status);
    }

    async setStatus(status: string): Promise<void> {
        const statusIdentifier = this.selectStatus(status);
        await this.driverWrapper.clickElement(this.statusDropdown);
        await this.driverWrapper.clickElement(statusIdentifier);
    }

    private selectLabel(label: string): string {
        // Below to not replace the actual value
        const labelString = this.labelSelection;
        return labelString.replace("techdept", label);
    }

    async setLabel(label: string): Promise<void> {
        const labelIdentifier = this.selectLabel(label);
        await this.driverWrapper.clickElement(this.labelsDropdown);
        await this.driverWrapper.clickElement(labelIdentifier);
    }

    async uploadFile(filePath: string) {
        await this.driverWrapper.uploadFile(this.uploadFileButton, filePath);
    }

    async submit(): Promise<void> {
        await this.driverWrapper.clickElement(this.submitButton);
    }

    async open(): Promise<void> {
        return await super.open("/createProject");
    }
}

const createTaskPage = new CreateTaskPage();
export { createTaskPage };
