// Read the asset and performance collectiopnand show the records of an ass
import { Router } from "express";
import performanceModel from "../../models/performanceModel.js";

const router = Router();
router.get("/api/avgdowntime", async (req, res) => {
  try {
    const downtimeList = await performanceModel.find(
      {},
      { _id: false, downtime: true }
    );
    var avg = 0;
    downtimeList.forEach((dt) => {
      avg = avg + dt.downtime;
    });
    avg = avg / downtimeList.length;
    // console.log(avg);
    // console.log(downtimeList);
    res.status(200).json({ average_downtime: avg });
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
