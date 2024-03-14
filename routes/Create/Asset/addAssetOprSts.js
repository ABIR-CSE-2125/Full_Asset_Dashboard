// Adds the sts of assets in the system
import { Router } from "express";
import operationalStatusModel from "../../../models/statusModel.js";
const router = Router();
router.post("/api/add/asset_status", async (req, res) => {
  try {
    const { sts_id, sts_desc } = req.body;
    const present_ids = (
      await operationalStatusModel.find({}, { _id: false })
    ).map((tuple) => {
      return tuple.sts_id;
    });
    var ifExists = false;
    present_ids.forEach((id) => {
      if (id == sts_id) {
        ifExists = true;
      }
    });
    if (ifExists === true) {
      res
        .status(400)
        .send("ID ALREADY EXISTS! PLS RE-ENTER WITH APPROPRIATE DATA!!");
      return;
    }
    const stsData = {
      sts_id: sts_id,
      sts_desc: sts_desc,
    };
    console.log(
      `ASSET OPERATIONAL STATUS ADDED SUCCESSFULLY.\DATA : ${stsData}`
    );

    const newAssetSts = new operationalStatusModel(stsData);
    const savedAssetSts = await newAssetSts.save();
    res.status(201).json(savedAssetSts);
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
