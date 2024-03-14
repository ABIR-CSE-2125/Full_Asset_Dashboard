// Read the asset and performance collectiopnand show the records of an ass
import { Router, response } from "express";
import assetTypeModel from "../../../models/typeModel.js";
const router = Router();
router.put("/api/update/asset-type/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const assetType = await assetTypeModel.findOneAndUpdate(
      { type_id: id },
      req.body
    );
    if (!assetType) {
      res.status(404).json({ response: "ASSET TYPE DOES NOT EXIST!" });
      return;
    }
    // cross check
    const updatedAssetType = await assetTypeModel.findOne({ type_id: id });
    console.log(`ASSET ${id} UPDATED SUCCESSFULLY`);

    res.status(200).json(updatedAssetType);
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
