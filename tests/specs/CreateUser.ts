// import { employees } from "../../../testingTools/apiCalls/Employees";
// import { employeeAssertor } from "../../../testingTools/assertors/EmployeeAssertor";
import { homePage, logInPage, signUpPage, settingsPage } from "../../pages/Index";
import { driverWrapper } from "../../helpers/DriverWrapper";
import crypto from "crypto";

before("Starting Selenium", async (): Promise<void> => {
    await driverWrapper.init();
});

describe("Testing Suite: PMTool ", async (): Promise<void> => {
    const randomName1 = crypto.randomBytes(4).toString("hex");
    const randomEmail1 = crypto.randomBytes(5).toString("hex");
    const randomPassword1 = crypto.randomBytes(6).toString("hex");
    const randomName2 = crypto.randomBytes(4).toString("hex");
    const randomEmail2 = crypto.randomBytes(5).toString("hex");
    const randomPassword2 = crypto.randomBytes(6).toString("hex");

    describe("Create User", async (): Promise<void> => {
        it("Create User 1 without optional fields ", async (): Promise<void> => {
            await homePage.open();
            await homePage.goToSignUpPage();
            await signUpPage.setName(randomName1);
            await signUpPage.setEmail(`${randomEmail1}@yahoo.com`);
            await signUpPage.setPassword(randomPassword1);
            await signUpPage.submit();
        });
        it("Login User 1 ", async (): Promise<void> => {
            await homePage.open();
            await homePage.goToLoginPage();
            await logInPage.setEmail(`${randomEmail1}@yahoo.com`);
            await logInPage.setPassword(randomPassword1);
            await logInPage.submit();
        });
        it("LogOut User 1 ", async (): Promise<void> => {
            await homePage.logOut();
        });
        it("Create User 2 with optional fields ", async (): Promise<void> => {
            await homePage.open();
            await homePage.goToSignUpPage();
            await signUpPage.setName(randomName2);
            await signUpPage.setEmail(`${randomEmail2}@yahoo.com`);
            await signUpPage.setAddress("My Address");
            await signUpPage.setCompany("My Company");
            await signUpPage.setPassword(randomPassword2);
            await signUpPage.submit();
        });
        it("Login User 2 ", async (): Promise<void> => {
            await homePage.goToLoginPage();
            await logInPage.setEmail(`${randomEmail2}@yahoo.com`);
            await logInPage.setPassword(randomPassword2);
            await logInPage.submit();
        });
        it("LogOut User 2 ", async (): Promise<void> => {
            await homePage.logOut();
        });
        it("Login User 1 ", async (): Promise<void> => {
            await homePage.goToLoginPage();
            await logInPage.setEmail(`${randomEmail1}@yahoo.com`);
            await logInPage.setPassword(randomPassword1);
            await logInPage.submit();
        });
        it("Change Settings User 1 ", async (): Promise<void> => {
            await homePage.goToSettingsPage();
            await settingsPage.setAddress("My New Address");
            await settingsPage.setCompany("My New Company");
            await settingsPage.submit();
        });
    });
});
