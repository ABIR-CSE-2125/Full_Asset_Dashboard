// Read the asset and performance collectiopnand show the records of an ass
import { Router } from "express";
import performanceModel from "../../models/performanceModel.js";

const router = Router();
router.get("/api/totalmaintainancecost", async (req, res) => {
  try {
    const maintenanceCostList = await performanceModel.find(
      {},
      { _id: false, maintenance_cost: true }
    );
    var total = 0;
    maintenanceCostList.forEach((rec) => {
      total += rec.maintenance_cost;
    });
    // console.log(avg);
    // console.log(downtimeList);
    res.status(200).json({ total_maintenance_cost: total });
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
