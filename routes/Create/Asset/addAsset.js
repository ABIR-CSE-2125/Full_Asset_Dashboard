//Add a new asset in the database
import { Router } from "express";
import assetModel from "../../../models/assetModel.js";
import assetTypeModel from "../../../models/typeModel.js";
import operationalStatusModel from "../../../models/statusModel.js";

const router = Router();
router.post("/api/add/asset", async (req, res) => {
  try {
    const {
      asset_id,
      asset_name,
      asset_type,
      purchase_date,
      initial_cost,
      operational_status,
      street_no,
      city,
      pincode,
    } = req.body;
    const present_ids = (await assetModel.find({}, { _id: false })).map(
      (tuple) => {
        return tuple.asset_id;
      }
    );
    const present_types = (
      await assetTypeModel.find({}, { _id: false, type_id: true })
    ).map((tuple) => {
      return tuple.type_id;
    });
    const present_sts = (
      await operationalStatusModel.find({}, { _id: false, sts_id: true })
    ).map((tuple) => {
      return tuple.sts_id;
    });
    var ifExists = false;
    var ifTypeExists = false;
    var ifStatusExists = false;
    present_ids.forEach((id) => {
      if (id === asset_id) {
        ifExists = true;
      }
    });
    present_types.forEach((type) => {
      if (type == asset_type) {
        ifTypeExists = true;
      }
    });
    present_sts.forEach((sts) => {
      if (sts == operational_status) {
        ifStatusExists = true;
      }
    });
    if (ifExists === true) {
      res.status(404).json({
        response: "ID ALREADY EXISTS! PLS RE-ENTER WITH APPROPRIATE DATA!!",
      });
      return;
    }
    if (ifTypeExists !== true) {
      res.status(404).json({ response: "ASSET TYPE NOT DEFINED!!" });
      return;
    }
    if (ifStatusExists !== true) {
      res
        .status(404)
        .json({ response: "OPERATIONAL STATUS TYPE NOT DEFINED!!" });
      return;
    }

    const location = {
      street_no: street_no,
      city: city,
      pincode: pincode,
    };

    const assetData = {
      asset_id: asset_id,
      asset_name: asset_name,
      asset_type: asset_type,
      purchase_date: purchase_date,
      initial_cost: initial_cost,
      asset_loc: location,
      operational_status: operational_status,
    };

    // console.log(`ASSET ADDED SUCCESSFULLY.\nASSET : ${assetData}`);
    const newAsset = new assetModel(assetData);
    const savedAsset = await newAsset.save();
    // res.status(201).json(savedAsset);
    res.render("add_performance.ejs", { asset_id: asset_id });
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
