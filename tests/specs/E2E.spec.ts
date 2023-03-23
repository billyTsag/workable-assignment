import path from "path";
import fs from "fs";
import { projectActions, taskActions, userActions } from "../../testingTools/actions/Index";
import { dashboardPage, homePage, tasksPage, projectsComponent } from "../../testingTools/pages/Index";
import { testData } from "../data/TestData";
import { driverWrapper } from "../../helpers/DriverWrapper";

before("Starting Selenium ", async (): Promise<void> => {
    await driverWrapper.init();
});

after("Tearing Down Selenium and saving testData ", async (): Promise<void> => {
    await driverWrapper.tearDown();
    const testDataFile = path.join(process.cwd(), "/reports/testData.json");
    if (fs.existsSync(testDataFile)) {
        fs.rmdirSync(testDataFile);
    }
    fs.writeFileSync(testDataFile, JSON.stringify(testData.data));
});

describe("Testing Suite: E2E ", async (): Promise<void> => {
    let userEmail1 = "";
    describe("User ", async (): Promise<void> => {
        it("Creation ", async (): Promise<void> => {
            const randomUser = userActions.getRandomUser();
            userEmail1 = randomUser.randomEmail;

            testData.data[userEmail1] = {
                name: randomUser.randomName,
                address: "My Address",
                company: "My Company",
                password: randomUser.randomPassword,
                projects: [],
            };

            await userActions.createUser(randomUser.randomEmail, testData.data[userEmail1]);
        });
        it("Login ", async (): Promise<void> => {
            await homePage.open();
            await userActions.login(userEmail1, testData.data[userEmail1].password);
        });
        it("Change Settings ", async (): Promise<void> => {
            testData.data[userEmail1].address = "My New Address";
            testData.data[userEmail1].company = "My New Company";

            // TODO: make below code better with empty strings
            await userActions.changeSettings({
                address: "My New Address",
                company: "My New Company",
                name: "",
                password: "",
                email: "",
            });
        });
    });
    describe("Projects & Tasks", async (): Promise<void> => {
        it("Project 1 Create ", async (): Promise<void> => {
            testData.data[userEmail1].projects.push({
                id: 0,
                name: "Project 1",
                description: "Project 1 description!",
                deleted: false,
                tasks: [],
            });
            await projectActions.createProject(
                testData.data[userEmail1].projects[0].name,
                testData.data[userEmail1].projects[0].description,
            );
        });
        it("Project 1 Edit ", async (): Promise<void> => {
            testData.data[userEmail1].projects[0].name = "Project 1.1";
            testData.data[userEmail1].projects[0].description = "Project 1.1 updated description!";

            await projectActions.editProject(
                1,
                testData.data[userEmail1].projects[0].name,
                testData.data[userEmail1].projects[0].description,
            );
        });
        it("Project 2 Create ", async (): Promise<void> => {
            testData.data[userEmail1].projects.push({
                name: "Project 2",
                description: "Project 2 description!",
                deleted: false,
                tasks: [],
            });
            await projectActions.createProject(
                testData.data[userEmail1].projects[1].name,
                testData.data[userEmail1].projects[1].description,
            );
        });
        // // TODO: add view? project (assert it exists)
        it("Task 1 of Project 1 Create ", async (): Promise<void> => {
            testData.data[userEmail1].projects[0].tasks.push({
                id: 0,
                summary: "Task Summary",
                description: "This is a description!",
                status: "IN PROGRESS",
                labels: ["performance"],
                filePaths: [`${path.join(process.cwd(), "Dockerfile")}`],
                deleted: false,
            });

            await taskActions.createTask(
                1,
                testData.data[userEmail1].projects[0].tasks[0].summary,
                testData.data[userEmail1].projects[0].tasks[0].description,
                testData.data[userEmail1].projects[0].tasks[0].status,
                testData.data[userEmail1].projects[0].tasks[0].labels,
                testData.data[userEmail1].projects[0].tasks[0].filePaths,
            );

            testData.data[userEmail1].projects[0].id = tasksPage.getProjectId();

            testData.data[userEmail1].projects[0].tasks[0].id = (await tasksPage.getTaskId("IN PROGRESS"))[0];
        });
        it("Task 2 of Project 1 Create ", async (): Promise<void> => {
            await dashboardPage.open();
            testData.data[userEmail1].projects[0].tasks.push({
                id: 0,
                summary: "Another Task Summary",
                description: "This is another description!",
                status: "TO DO",
                labels: ["backend"],
                filePaths: [`${path.join(process.cwd(), "Dockerfile")}`],
                deleted: false,
            });

            await taskActions.createTask(
                1,
                testData.data[userEmail1].projects[0].tasks[1].summary,
                testData.data[userEmail1].projects[0].tasks[1].description,
                testData.data[userEmail1].projects[0].tasks[1].status,
                testData.data[userEmail1].projects[0].tasks[1].labels,
                testData.data[userEmail1].projects[0].tasks[1].filePaths,
            );

            testData.data[userEmail1].projects[0].tasks[0].id = (await tasksPage.getTaskId("TO DO"))[0];
        });
        it("Task 1 of Project 1 Edit ", async (): Promise<void> => {
            testData.data[userEmail1].projects[0].tasks[0] = {
                id: testData.data[userEmail1].projects[0].tasks[0].id,
                summary: "New Summary",
                description: "New Description",
                status: "IN REVIEW",
                // TODO: fix state below - the already existing ones are not stored in state
                labels: ["jenkins"],
                filePaths: [`${path.join(process.cwd(), "Dockerfile")}`],
                deleted: false,
            };

            await taskActions.editTask(
                testData.data[userEmail1].projects[0].tasks[0].id,
                testData.data[userEmail1].projects[0].tasks[0].summary,
                testData.data[userEmail1].projects[0].tasks[0].description,
                testData.data[userEmail1].projects[0].tasks[0].status,
                testData.data[userEmail1].projects[0].tasks[0].labels,
                testData.data[userEmail1].projects[0].tasks[0].filePaths,
            );
        });
        it("Project 3 Create ", async (): Promise<void> => {
            await dashboardPage.driverWrapper.driver.sleep(1000);
            await dashboardPage.open();
            await dashboardPage.driverWrapper.driver.sleep(1000);

            testData.data[userEmail1].projects.push({
                name: "Project 3",
                description: "Project 3 description!",
                deleted: false,
                tasks: [],
            });
            await projectActions.createProject(
                testData.data[userEmail1].projects[2].name,
                testData.data[userEmail1].projects[2].description,
            );
        });
        it("Task 1 of Project 3 Create ", async (): Promise<void> => {
            testData.data[userEmail1].projects[2].tasks.push({
                id: 0,
                summary: "New 3.0 Task Summary",
                description: "This is a new 3.0 description!",
                status: "TO DO",
                labels: ["jenkins"],
                filePaths: [`${path.join(process.cwd(), "Dockerfile")}`],
                deleted: false,
            });

            await taskActions.createTask(
                3,
                testData.data[userEmail1].projects[2].tasks[0].summary,
                testData.data[userEmail1].projects[2].tasks[0].description,
                testData.data[userEmail1].projects[2].tasks[0].status,
                testData.data[userEmail1].projects[2].tasks[0].labels,
                testData.data[userEmail1].projects[2].tasks[0].filePaths,
            );

            testData.data[userEmail1].projects[2].id = tasksPage.getProjectId();

            testData.data[userEmail1].projects[2].tasks[0].id = (await tasksPage.getTaskId("IN PROGRESS"))[0];
        });
    });
    describe("TaskDB ", async (): Promise<void> => {
        it("Sort Tasks ", async (): Promise<void> => {
            await homePage.open();
            await homePage.goToTaskDB();
            await taskActions.sortTasks();
        });
        it("Search Task", async (): Promise<void> => {
            await taskActions.searchTaskDB("3.0");
        });
    });
    describe("Deleting Tasks & Projects ", async (): Promise<void> => {
        it("Task 1 of Project 1 Delete ", async (): Promise<void> => {
            await dashboardPage.open();
            await projectsComponent.clickViewTasksButton(1);
            await taskActions.deleteTask(testData.data[userEmail1].projects[0].tasks[0].id);
            testData.data[userEmail1].projects[0].tasks[0].deleted = true;
        });
        it("Project 2 Delete ", async (): Promise<void> => {
            await dashboardPage.open();
            await projectActions.deleteProject(2);
            testData.data[userEmail1].projects[2].deleted = true;
        });
    });
});
