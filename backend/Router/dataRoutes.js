import express from "express";

import { saveData } from "../controller/saveData.js";
import { showData } from "../controller/showData.js";
const router = express.Router();


router.post('/save-data', saveData);
router.post('/show-data', showData);
export default router;