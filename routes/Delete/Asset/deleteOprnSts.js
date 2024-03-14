// Read the asset and performance collectiopnand show the records of an ass
import { Router } from "express";
import operationalStatusModel from "../../../models/statusModel.js";
import assetModel from "../../../models/assetModel.js";
const router = Router();
router.delete("/api/delete/asset-oprsts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oprSts = await operationalStatusModel.findOneAndDelete({
      sts_id: id,
    });
    const update = {
      operational_status: null,
    };
    const assetListWithId = await assetModel.updateMany(
      { operational_status: id },
      update
    );
    if (!oprSts) {
      res.status(404).json({ response: "OPERATIONAL STATUS DOES NOT EXIST!" });
      return;
    }
    console.log(`OPERATIONAL STATUS ${id} DELETED SUCCESSFULLY`);
    res
      .status(200)
      .json({ response: "OPERATIONAL STATUS DELETED SUCCESSFULLY" });
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
