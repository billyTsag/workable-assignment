import Page from "./helpers/Page";

class SettingsPage extends Page {
    nameInput: string;
    emailInput: string;
    passwordInput: string;
    companyInput: string;
    addressInput: string;
    updateButton: string;

    constructor() {
        super();
        this.nameInput = `//input[@id='fullName']`;
        this.emailInput = `//input[@id='email']`;
        this.passwordInput = `//input[@id='password']`;
        this.companyInput = `//input[@id='company']`;
        this.addressInput = `//input[@id='address']`;
        this.updateButton = `//button[@id='update_info']`;
    }

    async setEmail(email: string): Promise<void> {
        // Had to add sleeps below because there were numerous bugs without them
        await this.driverWrapper.driver.sleep(1000);
        await (await this.driverWrapper.getElement(this.emailInput)).clear();
        await this.driverWrapper.driver.sleep(1000);
        await this.driverWrapper.setValue(this.emailInput, email);
    }

    async setCompany(company: string): Promise<void> {
        await this.driverWrapper.driver.sleep(1000);
        await (await this.driverWrapper.getElement(this.companyInput)).clear();
        await this.driverWrapper.driver.sleep(1000);
        await this.driverWrapper.setValue(this.companyInput, company);
    }

    async setName(name: string): Promise<void> {
        await this.driverWrapper.driver.sleep(1000);
        await (await this.driverWrapper.getElement(this.nameInput)).clear();
        await this.driverWrapper.driver.sleep(1000);
        await this.driverWrapper.setValue(this.nameInput, name);
    }

    async setPassword(password: string): Promise<void> {
        await this.driverWrapper.setValue(this.passwordInput, password);
    }

    async setAddress(address: string): Promise<void> {
        await this.driverWrapper.driver.sleep(1000);
        await (await this.driverWrapper.getElement(this.addressInput)).clear();
        await this.driverWrapper.driver.sleep(1000);
        await this.driverWrapper.setValue(this.addressInput, address);
    }

    async submit(): Promise<void> {
        await this.driverWrapper.clickElement(this.updateButton);
    }

    async open(): Promise<void> {
        return await super.open("/settings");
    }
}

const settingsPage = new SettingsPage();
export { settingsPage };
