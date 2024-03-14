// Read the asset and performance collectiopnand show the records of an ass
import { Router } from "express";
import assetTypeModel from "../../../models/typeModel.js";
import assetModel from "../../../models/assetModel.js";
const router = Router();
router.delete("/api/delete/asset-type/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const assetType = await assetTypeModel.findOneAndDelete({ type_id: id });
    const update = {
      asset_type: null,
    };
    const assetListWithId = await assetModel.updateMany(
      { asset_type: id },
      update
    );
    if (!assetType) {
      res.status(404).json({ response: "ASSET TYPE DOES NOT EXIST!" });
      return;
    }
    console.log(`ASSET TYPE ${id} DELETED SUCCESSFULLY`);
    res.status(200).json({ response: "ASSET TYPE DELETED SUCCESSFULLY" });
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
