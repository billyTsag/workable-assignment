import Page from "./helpers/Page";

class SignUpPage extends Page {
    nameInput: string;
    emailInput: string;
    passwordInput: string;
    companyInput: string;
    addressInput: string;
    signUpButton: string;

    constructor() {
        super();
        this.nameInput = `//input[@id='fullName']`;
        this.emailInput = `//input[@id='email']`;
        this.passwordInput = `//input[@id='password']`;
        this.companyInput = `//input[@id='company']`;
        this.addressInput = `//input[@id='address']`;
        this.signUpButton = `//button[@name='action']`;
    }

    async setEmail(email: string): Promise<void> {
        await this.driverWrapper.setValue(this.emailInput, email);
    }

    async setCompany(company: string): Promise<void> {
        await this.driverWrapper.setValue(this.companyInput, company);
    }

    async setName(name: string): Promise<void> {
        await this.driverWrapper.setValue(this.nameInput, name);
    }

    async setPassword(password: string): Promise<void> {
        await this.driverWrapper.setValue(this.passwordInput, password);
    }

    async setAddress(address: string): Promise<void> {
        await this.driverWrapper.setValue(this.addressInput, address);
    }

    async submit(): Promise<void> {
        await this.driverWrapper.clickElement(this.signUpButton);
    }

    async open(): Promise<void> {
        return await super.open("/signup");
    }
}

const signUpPage = new SignUpPage();
export { signUpPage };
