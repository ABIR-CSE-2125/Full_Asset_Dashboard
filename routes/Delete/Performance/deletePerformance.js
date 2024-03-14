// Read the asset and performance collectiopnand show the records of an ass
import { Router, response } from "express";
import performanceModel from "../../../models/performanceModel.js";
const router = Router();
router.delete("/api/delete/performance/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`In Performance : ${id}`);
    const performance = await performanceModel.findOneAndDelete({
      asset_id: id,
    });
    if (!performance) {
      res.status(404).json({ response: "PERFORMANCE DOES NOT EXIST!" });
      return;
    }
    console.log(`PERFORMANCE OF ASSET ${id} DELETED SUCCESSFULLY`);
    res.status(200).json({ response: "ASSET DELETED SUCCESSFULLY" });
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
