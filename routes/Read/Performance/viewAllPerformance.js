// Read the asset and performance collectiopnand show the records of an ass
import { Router } from "express";
import performanceModel from "../../../models/performanceModel.js";
const router = Router();
router.get("/api/show/performances", async (req, res) => {
  try {
    const performances = await performanceModel.find({});
    res.status(200).json(performances);
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
