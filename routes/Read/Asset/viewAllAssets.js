// Read the asset and performance collectiopnand show the records of an ass
import { Router } from "express";
import assetModel from "../../../models/assetModel.js";

const router = Router();
router.get("/api/show/assets", async (req, res) => {
  try {
    const assets = await assetModel.find({});
    res.status(200).json(assets);
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
