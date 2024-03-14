// Read the asset and performance collectiopnand show the records of an ass
import { Router } from "express";
import assetModel from "../../../models/assetModel.js";

const router = Router();
router.get("/api/show/asset/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await assetModel.findOne({ asset_id: id });
    if (!asset) {
      res.status(404).send("ASSET DOES NOT EXIST!");
      return;
    }
    res.status(200).json(asset);
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
