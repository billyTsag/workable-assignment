import Page from "./helpers/Page";
import { By, until } from "selenium-webdriver";

class TasksPage extends Page {
    editButton: string;
    deleteButton: string;
    constructor() {
        super();
        this.editButton = `//div[@id='641b8635ad3ae4001f7e521e']//a[@id='btn_update_task']`;
        this.deleteButton = `//div[@id='641b8635ad3ae4001f7e521e']//div//a[@id='btn_delete_task']`;
    }

    async getProjectId(): Promise<string> {
        const currentUrl = await this.driverWrapper.driver.getCurrentUrl();
        const s1 = currentUrl.split(`https://node-fs-app.herokuapp.com/projects/`);
        const s2 = s1[1].split("/createTask");
        return s2[0];
    }

    async clickEditButton(id: string): Promise<void> {
        const editButton = this.editButton.replace("641b8635ad3ae4001f7e521e", id);
        await this.driverWrapper.clickElement(editButton);
    }

    async clickDeleteButton(id: string): Promise<void> {
        const deleteButton = this.deleteButton.replace("641b8635ad3ae4001f7e521e", id);
        await this.driverWrapper.clickElement(deleteButton);
        await this.driverWrapper.acceptAlert();
    }

    private getElement2 = async (identifier: string): Promise<string[]> => {
        const ids = [];
        const elements = await this.driverWrapper.driver.wait(until.elementLocated(By.xpath(identifier)), 10000);
        const divElements = await elements.findElements(By.css("div"));
        for (let i = 0; i < divElements.length; i++) {
            if (
                (await divElements[i].getAttribute("draggable")) &&
                (await divElements[i].getAttribute("id")) != "card_label" &&
                (await divElements[i].getAttribute("id")) != ""
            ) {
                ids.push(await divElements[i].getAttribute("id"));
            }
        }
        return ids;
    };

    async getTaskId(status = "IN PROGRESS"): Promise<string[]> {
        await this.driverWrapper.driver.sleep(1000);
        const e = await this.getElement2(`//div[@status='${status}']`);
        return e;
    }
}

const tasksPage = new TasksPage();
export { tasksPage };
