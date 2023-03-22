import Page from "./helpers/Page";

class LogInPage extends Page {
    emailInput: string;
    passwordInput: string;
    logInButton: string;

    constructor() {
        super();
        this.emailInput = `//input[@id='email']`;
        this.passwordInput = `//input[@id='password']`;
        this.logInButton = `//button[@name='action']`;
    }

    async setEmail(email: string): Promise<void> {
        await this.driverWrapper.setValue(this.emailInput, email);
    }

    async setPassword(password: string): Promise<void> {
        await this.driverWrapper.setValue(this.passwordInput, password);
    }

    async submit(): Promise<void> {
        await this.driverWrapper.clickElement(this.logInButton);
    }

    async open(): Promise<void> {
        return await super.open("/login");
    }
}

const logInPage = new LogInPage();
export { logInPage };
