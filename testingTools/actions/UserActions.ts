import { homePage, signUpPage, logInPage, settingsPage } from "../pages/Index";
import crypto from "crypto";

class UserActions {
    getRandomUser() {
        const randomName = crypto.randomBytes(4).toString("hex");
        const randomEmail = `${crypto.randomBytes(5).toString("hex")}@yahoo.com`;
        const randomPassword = crypto.randomBytes(6).toString("hex");
        return { randomName, randomEmail, randomPassword };
    }

    async createUser(email: string, userData: any): Promise<void> {
        await homePage.open();
        await homePage.goToSignUpPage();
        await signUpPage.setName(userData.name);
        await signUpPage.setEmail(email);
        if (userData.address) await signUpPage.setAddress(userData.address);
        if (userData.company) await signUpPage.setCompany(userData.company);
        await signUpPage.setPassword(userData.password);
        await signUpPage.submit();
    }

    async login(email: string, password: string): Promise<void> {
        await homePage.goToLoginPage();
        await logInPage.setEmail(email);
        await logInPage.setPassword(password);
        await logInPage.submit();
    }

    async logout(): Promise<void> {
        await homePage.logOut();
    }

    async changeSettings({ name, email, password, company, address }): Promise<void> {
        await homePage.goToSettingsPage();
        if (name) await settingsPage.setName(name);
        if (email) await settingsPage.setEmail(email);
        if (password) await settingsPage.setPassword(password);
        if (company) await settingsPage.setCompany(company);
        if (address) await settingsPage.setAddress(address);
        await settingsPage.submit();
    }
}

const userActions = new UserActions();
export { userActions };
