import { TestRunner } from "../../tests/TestRunner";

export async function runTests(req, res): Promise<void> {
    try {
        const testRunner = new TestRunner();
        const testRun = await testRunner.runTests();
        res.json(testRun);
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Something went wrong!" });
    }
}
