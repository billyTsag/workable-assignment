import path from "path";
import fs from "fs";
import { homePage } from "../../testingTools/pages/Index";
import { userActions } from "../../testingTools/actions/Index";
import { testData } from "../data/TestData";
import { driverWrapper } from "../../helpers/DriverWrapper";

before("Starting Selenium", async (): Promise<void> => {
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

describe("Testing Suite: PMTool ", async (): Promise<void> => {
    describe("Create User", async (): Promise<void> => {
        let userEmail1 = "";
        let userEmail2 = "";
        it("Create User 1 without optional fields ", async (): Promise<void> => {
            const randomUser = userActions.getRandomUser();
            userEmail1 = randomUser.randomEmail;

            testData.data[userEmail1] = {
                name: randomUser.randomName,
                password: randomUser.randomPassword,
                projects: [],
            };

            await userActions.createUser(randomUser.randomEmail, testData.data[userEmail1]);
        });
        it("Login User 1", async (): Promise<void> => {
            await homePage.open();
            await userActions.login(userEmail1, testData.data[userEmail1].password);
        });
        it("LogOut User 1 ", async (): Promise<void> => {
            await userActions.logout();
        });
        it("Create User 2 ", async (): Promise<void> => {
            const randomUser = userActions.getRandomUser();
            userEmail2 = randomUser.randomEmail;

            testData.data[userEmail2] = {
                name: randomUser.randomName,
                address: "My Address",
                company: "My Company",
                password: randomUser.randomPassword,
                projects: [],
            };

            await userActions.createUser(randomUser.randomEmail, testData.data[userEmail2]);
        });
        it("Login User 2 ", async (): Promise<void> => {
            await homePage.open();
            await userActions.login(userEmail2, testData.data[userEmail2].password);
        });
        it("LogOut User 2 ", async (): Promise<void> => {
            await userActions.logout();
        });
        it("Login User 1", async (): Promise<void> => {
            await homePage.driverWrapper.driver.sleep(2000);
            await userActions.login(userEmail1, testData.data[userEmail1].password);
        });
        it("Change Settings User 1 ", async (): Promise<void> => {
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
});
