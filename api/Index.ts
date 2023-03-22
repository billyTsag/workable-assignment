import express from "express";
import * as testRoutes from "./routes/TestRoutes";
import config from "./config/config.json";

const app = express();

app.use(testRoutes.default);
app.listen(config.api.port, (): void => {
    console.log(`Server running on port ${config.api.port}`);
});

export default app;
