import { Builder, Browser, By, WebDriver, WebElementPromise, WebElement, until } from "selenium-webdriver";
// import { setDefaultTimeout } from "@cucumber/cucumber";

// // For some reason FIREFOX & EDGE crash if I dont increase the defaultTimeout
// setDefaultTimeout(60 * 1000);

class DriverWrapper {
    driver: WebDriver;

    private selectBrowser = () => {
        let browser = "";
        switch (process.env.BROWSER) {
            case "CHROME": {
                browser = Browser.CHROME;
                break;
            }
            case "FIREFOX": {
                browser = Browser.FIREFOX;
                break;
            }
            case "EDGE": {
                browser = Browser.EDGE;
                break;
            }
            default: {
                throw new Error(`Browser: ${process.env.BROWSER} is not supported!`);
            }
        }
        return browser;
    };

    init = async () => {
        if (process.env.RUNTIME_TESTS == "DOCKER" && process.env.RUNTIME_HUB == "DOCKER") {
            this.driver = await new Builder()
                .forBrowser(this.selectBrowser())
                .usingServer("http://selenium-hub:4444/wd/hub/")
                .build();
        } else if (process.env.RUNTIME_TESTS == "LOCAL" && process.env.RUNTIME_HUB == "DOCKER") {
            this.driver = await new Builder()
                .forBrowser(this.selectBrowser())
                .usingServer("http://localhost:4444/")
                .build();
        } else {
            this.driver = await new Builder().forBrowser(Browser.CHROME).build();
            // Remove this from here
            this.driver.manage().window().maximize();
        }
    };

    getElement = async (identifier: string): Promise<WebElementPromise> => {
        return await this.driver.wait(until.elementLocated(By.xpath(identifier)), 10000);
    };

    clickElement = async (identifier: string): Promise<void> => {
        const element = await this.getElement(identifier);
        return await element.click();
    };

    setValue = async (identifier: string, value: string): Promise<void> => {
        return await (await this.getElement(identifier)).sendKeys(value);
    };

    acceptAlert = async (): Promise<void> => {
        await this.driver.wait(until.alertIsPresent());
        const alert = await this.driver.switchTo().alert();
        await alert.accept();
    };

    uploadFile = async (identifier: string, filePath: string): Promise<void> => {
        await (await this.getElement(identifier)).sendKeys(filePath);
    };

    tearDown = async (): Promise<void> => {
        await this.driver.quit();
    };

    // Had to create below because the error of findElement cannot be suppressed
    doesElementExist = async (identifier: string): Promise<Array<WebElement>> => {
        let element: Array<WebElement>;
        try {
            element = await this.driver.findElements(By.xpath(identifier));
        } catch (error) {
            console.log(error);
        } finally {
            return element;
        }
    };
}

const driverWrapper = new DriverWrapper();

export { driverWrapper };
