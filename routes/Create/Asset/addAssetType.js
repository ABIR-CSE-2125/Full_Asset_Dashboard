// Adds the types of assets in the system
import { Router } from "express";
import assetTypeModel from "../../../models/typeModel.js";
const router = Router();
router.post("/api/add/asset_type", async (req, res) => {
  try {
    const { type_id, type_desc } = req.body;
    const present_ids = (await assetTypeModel.find({}, { _id: false })).map(
      (tuple) => {
        return tuple.type_id;
      }
    );
    var ifExists = false;

    present_ids.forEach((id) => {
      if (id == type_id) {
        ifExists = true;
      }
    });

    if (ifExists === true) {
      res
        .status(400)
        .send("ID ALREADY EXISTS! PLS RE-ENTER WITH APPROPRIATE DATA!!");
      return;
    }
    const typeData = {
      type_id: type_id,
      type_desc: type_desc,
    };
    console.log(`ASSET TYPE ADDED SUCCESSFULLY`);
    console.log(typeData);

    const newAssetType = new assetTypeModel(typeData);
    const savedAssetType = await newAssetType.save();
    res.status(201).json(savedAssetType);
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
