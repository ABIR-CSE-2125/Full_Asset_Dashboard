// Read the asset and performance collectiopnand show the records of an ass
import { Router } from "express";
import performanceModel from "../../../models/performanceModel.js";
const router = Router();
router.put("/api/update/performance/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const performance = await performanceModel.findOneAndUpdate(
      { asset_id: id },
      req.body
    );
    if (!performance) {
      res.status(404).send("ASSET DOES NOT EXIST!");
      return;
    }
    // cross check
    const updatedPerformance = await performanceModel.findOne({ asset_id: id });
    console.log(`PERFORMANCE METRICS OF ASSET ${id} UPDATED SUCCESSFULLY`);

    res.status(200).json(updatedPerformance);
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
