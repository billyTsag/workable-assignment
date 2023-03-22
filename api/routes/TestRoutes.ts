import express from "express";
import { runTests } from "../controllers/TestController";

const router = express.Router();

router.route("/api/tests/runTests").get(runTests);

export default router;
