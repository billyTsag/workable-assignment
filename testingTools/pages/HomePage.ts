import Page from "./helpers/Page";

class HomePage extends Page {
    loginPageButton: string;
    signUpPageButton: string;
    taskDBButton: string;
    logOutButton: string;
    settingsButton: string;

    constructor() {
        super();
        this.loginPageButton = `//a[@id='login']`;
        this.signUpPageButton = `//a[@id='signup']`;
        this.taskDBButton = `//a[@id='task_db']`;
        this.settingsButton = `//a[@id='settings']`;
        this.logOutButton = `//a[@id='logout']`;
    }

    async goToLoginPage(): Promise<void> {
        await this.driverWrapper.clickElement(this.loginPageButton);
    }

    async goToSignUpPage(): Promise<void> {
        await this.driverWrapper.clickElement(this.signUpPageButton);
    }

    async goToTaskDB(): Promise<void> {
        await this.driverWrapper.clickElement(this.taskDBButton);
    }

    async goToSettingsPage(): Promise<void> {
        await this.driverWrapper.clickElement(this.settingsButton);
    }

    async logOut(): Promise<void> {
        await this.driverWrapper.clickElement(this.logOutButton);
    }

    async open(): Promise<void> {
        return await super.open();
    }
}

const homePage = new HomePage();
export { homePage };
