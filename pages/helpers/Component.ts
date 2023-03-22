import { driverWrapper } from "../../helpers/DriverWrapper";

export default class Component {
    driverWrapper: typeof driverWrapper;

    constructor() {
        this.driverWrapper = driverWrapper;
    }
}
