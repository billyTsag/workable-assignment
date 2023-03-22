// import { employees } from "../../../testingTools/apiCalls/Employees";
// import { employeeAssertor } from "../../../testingTools/assertors/EmployeeAssertor";
import { createProjectPage, dashboardPage, homePage, logInPage, signUpPage } from "../../pages/Index";
import { driverWrapper } from "../../helpers/DriverWrapper";

before("Starting Selenium", async (): Promise<void> => {
    await driverWrapper.init();
});

describe("Testing Suite: PMTool ", async (): Promise<void> => {
    describe("Create User", async (): Promise<void> => {
        it("Create User without optional fields ", async (): Promise<void> => {
            await homePage.open();
            await homePage.goToSignUpPage();
            await signUpPage.setName("Name");
            await signUpPage.setEmail("Name");
            await signUpPage.setPassword("Name");
            await signUpPage.submit();
        });
        it("Create User with optional fields ", async (): Promise<void> => {
            await homePage.open();
            await homePage.goToSignUpPage();
            await signUpPage.setName("Name");
            await signUpPage.setAddress("Name");
            await signUpPage.setCompany("Name");
            await signUpPage.setEmail("Name");
            await signUpPage.setPassword("Name");
            await signUpPage.submit();
        });
        it("Login User ", async (): Promise<void> => {
            await homePage.open();
            await homePage.goToLoginPage();
            await logInPage.setEmail("rememberme@remember.com");
            await logInPage.setPassword("rememberme");
            await logInPage.submit();
        });
    });
});
