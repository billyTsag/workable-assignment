import { driverWrapper } from "../../helpers/DriverWrapper";

export default class Page {
    driverWrapper: typeof driverWrapper;

    constructor() {
        this.driverWrapper = driverWrapper;
    }

    async open(path = "/"): Promise<void> {
        return await this.driverWrapper.driver.get(`https://node-fs-app.herokuapp.com${path}`);
    }
}
