// Read the asset and performance collectiopnand show the records of an ass
import { Router } from "express";
import performanceModel from "../../models/performanceModel.js";
const router = Router();

const mean = (arr) => arr.reduce((acc, val) => acc + val, 0) / arr.length;

// Function to calculate the standard deviation of an array
const standardDeviation = (arr) => {
  const avg = mean(arr);
  const squareDiffs = arr.map((val) => (val - avg) ** 2);
  const avgSquareDiff = mean(squareDiffs);
  return Math.sqrt(avgSquareDiff);
};
router.get("/api/highFR", async (req, res) => {
  try {
    const failureRateList = await performanceModel.find(
      {},
      { _id: false, asset_id: true, failure_rate: true }
    );
    // The benchmark of the high failure rate can be set by the user. Here I have used the average + standered deviation as benchmark
    var avgFR = 0;
    var problematicAssets = [];
    const frs = failureRateList.map((rec) => {
      return rec.failure_rate;
    });
    const mu = mean(frs);
    const sigma = standardDeviation(frs);
    console.log(mu);
    console.log(sigma);
    const parameter = mu + sigma;
    failureRateList.forEach((rec) => {
      if (rec.failure_rate >= parameter) {
        problematicAssets.push(rec);
      }
    });
    // console.log(avg);
    // console.log(downtimeList);
    res.status(200).json({ high_fr_asset: problematicAssets });
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
