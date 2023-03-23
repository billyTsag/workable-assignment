// import { employees } from "../../../testingTools/apiCalls/Employees";
// import { employeeAssertor } from "../../../testingTools/assertors/EmployeeAssertor";
import crypto from "crypto";

import {
    createProjectPage,
    createTaskPage,
    dashboardPage,
    homePage,
    logInPage,
    projectsComponent,
    signUpPage,
} from "../../testingTools/pages/Index";

import { driverWrapper } from "../../helpers/DriverWrapper";

before("Starting Selenium", async (): Promise<void> => {
    await driverWrapper.init();
});

describe("Testing Suite: PMTool ", async (): Promise<void> => {
    const randomName = crypto.randomBytes(4).toString("hex");
    const randomEmail = crypto.randomBytes(5).toString("hex");
    const randomPassword = crypto.randomBytes(6).toString("hex");

    describe("Create User", async (): Promise<void> => {
        it("Create User 1 without optional fields ", async (): Promise<void> => {
            await homePage.open();
            await homePage.goToSignUpPage();
            await signUpPage.setName(randomName);
            await signUpPage.setEmail(`${randomEmail}@yahoo.com`);
            await signUpPage.setPassword(randomPassword);
            await signUpPage.submit();
        });
        it("Login User ", async (): Promise<void> => {
            await homePage.goToLoginPage();
            await logInPage.setEmail(randomName);
            await logInPage.setPassword(`${randomEmail}@yahoo.com`);
            await logInPage.submit();
        });
        it("Create Project ", async (): Promise<void> => {
            await dashboardPage.createNewProject();
            await createProjectPage.setName("ProjectName");
            await createProjectPage.setDescription("This is a description!");
            await createProjectPage.submit();
        });
        it("Edit Created Project ", async (): Promise<void> => {
            await projectsComponent.clickEditButton(1);
            await createProjectPage.setName("New ProjectName");
            await createProjectPage.setDescription("This is a new description!");
            await createProjectPage.submit();
        });
        // add view? project (assert it exists)
        it("Create Task ", async (): Promise<void> => {
            await projectsComponent.clickAddTaskButton(1);
            await createTaskPage.setSummary("TaskName");
            await createTaskPage.setDescription("TaskDescription");
            await createTaskPage.setStatus("IN PROGRESS");
            await createTaskPage.setLabel("performance");
            await createTaskPage.uploadFile("C:\\src\\caseStudy\\.gitignore");
            await createTaskPage.submit();
        });
        it("Delete Created Project ", async (): Promise<void> => {
            await dashboardPage.open();
            await projectsComponent.clickDeleteButton(1);
        });
    });
});
