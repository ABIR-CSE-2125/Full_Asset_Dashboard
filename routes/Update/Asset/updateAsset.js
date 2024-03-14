// Read the asset and performance collectiopnand show the records of an ass
import { Router } from "express";
import assetModel from "../../../models/assetModel.js";

const router = Router();
router.put("/api/update/asset/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("In Update Api");
    console.log(req.body);
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
    const location = {
      street_no: street_no,
      city: city,
      pincode: pincode,
    };

    const updated_data = {
      asset_id: asset_id,
      asset_name: asset_name,
      asset_type: asset_type,
      purchase_date: purchase_date,
      initial_cost: initial_cost,
      asset_loc: location,
      operational_status: operational_status,
    };
    const asset = await assetModel.findOneAndUpdate(
      { asset_id: id },
      updated_data
    );
    if (!asset) {
      res.status(404).json({ response: "ASSET DOES NOT EXIST!" });
      return;
    }
    // cross check
    const updatedAsset = await assetModel.findOne({ asset_id: id });
    console.log(`ASSET ${id} UPDATED SUCCESSFULLY`);
    res.status(200).json(updatedAsset);
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
