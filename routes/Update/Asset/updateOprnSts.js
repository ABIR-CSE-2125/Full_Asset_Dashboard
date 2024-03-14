// Read the asset and performance collectiopnand show the records of an ass
import { Router, response } from "express";
import operationalStatusModel from "../../../models/statusModel.js";

const router = Router();
router.put("/api/update/asset-oprsts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const oprsts = await operationalStatusModel.findOneAndUpdate(
      { sts_id: id },
      req.body
    );
    if (!oprsts) {
      res.status(404).json({ response: "OPERATIONAL STATUS DOES NOT EXIST!" });
      return;
    }
    // cross check
    const updatedOprsts = await operationalStatusModel.findOne({
      sts_id: id,
    });
    console.log(`ASSET ${id} UPDATED SUCCESSFULLY`);

    res.status(200).json(updatedOprsts);
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
