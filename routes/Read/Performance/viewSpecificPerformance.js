// Read the asset and performance collectiopnand show the records of an ass
import { Router } from "express";
import performanceModel from "../../../models/performanceModel.js";
const router = Router();
router.get("/api/show/performance/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const performance = await performanceModel.findOne({ asset_id: id });
    if (!performance) {
      res.status(404).send("ASSET DOES NOT EXIST!");
      return;
    }
    res.status(200).json(performance);
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
