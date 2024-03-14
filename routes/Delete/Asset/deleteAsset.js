// Read the asset and performance collectiopnand show the records of an ass
import { Router } from "express";
import assetModel from "../../../models/assetModel.js";
const router = Router();
router.delete("/api/delete/asset/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await assetModel.findOneAndDelete({ asset_id: id });
    if (!asset) {
      res.status(404).json({ response: "ASSET DOES NOT EXIST!" });
      return;
    }
    console.log(`ASSET ${id} DELETED SUCCESSFULLY`);
    res.status(200).json({ response: "ASSET DELETED SUCCESSFULLY" });
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
