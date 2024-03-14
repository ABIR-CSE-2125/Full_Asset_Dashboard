// Read the asset and performance collectiopnand show the records of an ass
import { Router } from "express";
import assetTypeModel from "../../../models/typeModel.js";

const router = Router();
router.get("/api/show/asset-types", async (req, res) => {
  try {
    const assetTypes = await assetTypeModel.find({});
    res.status(200).json(assetTypes);
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
