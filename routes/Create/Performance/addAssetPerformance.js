//Add a new asset in the database
import { Router } from "express";
import assetModel from "../../../models/assetModel.js";
import performanceModel from "../../../models/performanceModel.js";

const router = Router();
router.post("/api/add/performance", async (req, res) => {
  try {
    const {
      asset_id,
      uptime,
      downtime,
      maintenance_cost,
      failure_rate,
      efficiency,
    } = req.body;
    const present_ids = (await assetModel.find({}, { _id: false })).map(
      (tuple) => {
        return tuple.asset_id;
      }
    );
    var ifAssetExists = false;
    present_ids.forEach((id) => {
      if (id === asset_id) {
        ifAssetExists = true;
      }
    });
    if (ifAssetExists === true) {
      const current_performance_asset_ids = (
        await performanceModel.find({}, { _id: false })
      ).map((tuple) => {
        return tuple.asset_id;
      });
      var ifPrfAssetExists = false;
      current_performance_asset_ids.forEach((id) => {
        if (id === asset_id) {
          ifPrfAssetExists = true;
        }
      });
      if (ifPrfAssetExists === true) {
        res
          .status(400)
          .send("CAN'T ADD THE SAME ASSET! PLS UPDATE TO CONTINUE!");
        return;
      }
      const assetPerformacneData = {
        asset_id: asset_id,
        uptime: uptime,
        downtime: downtime,
        maintenance_cost: maintenance_cost,
        failure_rate: failure_rate,
        efficiency: efficiency,
      };
      console.log(`ASSET PERFORMANCE ADDED SUCCESSFULLY.`);
      console.log(assetPerformacneData);
      const newAssetPerformacne = new performanceModel(assetPerformacneData);
      const savedAssetPerformacne = await newAssetPerformacne.save();
      // res.status(201).json(savedAssetPerformacne);
      res.redirect("/");
    } else {
      res
        .status(400)
        .send("ID DOESNOT EXIST! PLS RE-ENTER WITH APPROPRIATE DATA!!");
    }
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
