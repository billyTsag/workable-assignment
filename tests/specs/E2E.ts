// import { employees } from "../../../testingTools/apiCalls/Employees";
// import { employeeAssertor } from "../../../testingTools/assertors/EmployeeAssertor";
import {
    createProjectPage,
    createTaskPage,
    dashboardPage,
    homePage,
    logInPage,
    projectsComponent,
    settingsPage,
    signUpPage,
    tasksPage,
    tasksDBPage,
} from "../../pages/Index";

import { driverWrapper } from "../../helpers/DriverWrapper";

before("Starting Selenium", async (): Promise<void> => {
    await driverWrapper.init();
});

describe("Testing Suite: PMTool ", async (): Promise<void> => {
    describe("Create User", async (): Promise<void> => {
        it("Login User ", async (): Promise<void> => {
            await homePage.open();
            await homePage.goToLoginPage();
            await logInPage.setEmail("rememberme@remember.com");
            await logInPage.setPassword("rememberme");
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
            await createTaskPage.setName("TaskName");
            await createTaskPage.setDescription("TaskDescription");
            await createTaskPage.setStatus("IN PROGRESS");
            await createTaskPage.setLabel("performance");
            await createTaskPage.uploadFile("C:\\src\\caseStudy\\.gitignore");
            await createTaskPage.submit();
        });
        // it("Edit Task ", async (): Promise<void> => {
        //     await projectsComponent.clickViewTasksButton(1);
        //     await tasksPage.clickDeleteButton(1);
        // });
        it("Change User Settings ", async (): Promise<void> => {
            await homePage.open();
            await homePage.goToSettingsPage();
            await settingsPage.setAddress("MyAddress");
            await settingsPage.setCompany("MyCompany");
            await settingsPage.submit();
        });
        it("TasksDB ", async (): Promise<void> => {
            await homePage.open();
            await homePage.goToTaskDB();
            await tasksDBPage.clickSortTasksButton();
        });
        it("Delete Created Project ", async (): Promise<void> => {
            await dashboardPage.open();
            await projectsComponent.clickDeleteButton(1);
        });
    });
});
