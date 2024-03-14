// Read the asset and performance collectiopnand show the records of an ass
import { Router } from "express";
import operationalStatusModel from "../../../models/statusModel.js";
const router = Router();
router.get("/api/show/asset-oprsts", async (req, res) => {
  try {
    const operationalSts = await operationalStatusModel.find({});
    res.status(200).json(operationalSts);
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
