// import { processenv } from "processenv";
import "dotenv/config";
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
// import the models - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import assetModel from "./models/assetModel.js";
import operationalStatusModel from "./models/statusModel.js";
import assetTypeModel from "./models/typeModel.js";
import performanceModel from "./models/performanceModel.js";
import userModel from "./models/userModel.js";
// import the api endpoints - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// CREATE END POINTS- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import addAssetRoute from "./routes/Create/Asset/addAsset.js";
import addAssetTypeRoute from "./routes/Create/Asset/addAssetType.js";
import addOprStsRoute from "./routes/Create/Asset/addAssetOprSts.js";
import addPerformanceRoute from "./routes/Create/Performance/addAssetPerformance.js";
import addUserRoute from "./routes/Create/User/addUser.js";
// SHOW ENDPOINTS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import viewAllAssetRoute from "./routes/Read/Asset/viewAllAssets.js";
import viewAllTypeRoute from "./routes/Read/Asset/viewAssetType.js";
import viewAllStatusRoute from "./routes/Read/Asset/viewOprnSts.js";
import viewSpecificAssetRoute from "./routes/Read/Asset/viewSpecificAsset.js";
import viewAllPerformanceRoute from "./routes/Read/Performance/viewAllPerformance.js";
import viewSpecificPerformanceRoute from "./routes/Read/Performance/viewSpecificPerformance.js";
import viewAllUsersRoute from "./routes/Read/User/viewAllUser.js";
import viewSpecificUserRoute from "./routes/Read/User/viewSpecificUser.js";
// UPDATE ENDPOINTS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import updateAssetRoute from "./routes/Update/Asset/updateAsset.js";
import updateTypeRoute from "./routes/Update/Asset/updateAssetType.js";
import updateStatusRoute from "./routes/Update/Asset/updateOprnSts.js";
import updatePerformanceRoute from "./routes/Update/Performance/updatePerformance.js";
import updateUserRoute from "./routes/Update/User/updateUser.js";
// DELETE ENDPOINTS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import deleteAssetCascadeRoute from "./routes/Delete/Asset/deleteAssetCascade.js";
import deletePerformanceRoute from "./routes/Delete/Performance/deletePerformance.js";
import deleteAssetRoute from "./routes/Delete/Asset/deleteAsset.js";
import deleteTypeRoute from "./routes/Delete/Asset/deleteAssetType.js";
import deleteStatusRoute from "./routes/Delete/Asset/deleteOprnSts.js";
import deleteUserRoute from "./routes/Delete/User/deleteUser.js";
// INSIGHT ENDPOINTS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import avgDTRoute from "./routes/Aggregation/avgDowntime.js";
import totalMNTRoute from "./routes/Aggregation/totalMaintainanceCost.js";
import highFRRoute from "./routes/Aggregation/highFR.js";
// SENSITIVE ENDPOINTS - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import sensitiveRoute from "./routes/Authorization/sensitveEndpoint.js";
import { errorMonitor } from "events";
import { Console } from "console";
// Create the app - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const app = express();
const port = process.env.PORT;
const mongo_url = process.env.Mongo_URL;
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to Mongo DB - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
mongoose
  .connect(mongo_url)
  .then(() => {
    console.log("DB Connected Good to Go");
  })
  .catch((err) => console.log(`DB Connection Falied ${err}`));

// Handeling the endpoints - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

app.get("/", async (req, res) => {
  const assets = await assetModel.find(
    {},
    { _id: false, asset_id: true, asset_name: true }
  );
  // console.log(assets);
  res.render("index.ejs", { asset_list: assets });
});

app.post("/", async (req, res) => {
  const { asset_id } = req.body;
  const assets = await assetModel.find(
    {},
    { _id: false, asset_id: true, asset_name: true }
  );
  console.log(asset_id);
  try {
    var performance_response;
    var asset_response;
    var performance_data;
    var asset_data;
    try {
      asset_response = await axios.get(
        `http://localhost:${port}/api/show/asset/${asset_id}`
      );
      asset_data = asset_response.data;
    } catch (error) {
      asset_data = null;
    }
    try {
      performance_response = await axios.get(
        `http://localhost:${port}/api/show/performance/${asset_id}`
      );
      performance_data = performance_response.data;
    } catch (error) {
      performance_data = null;
    }
    // console.log(asset_data);
    // console.log("Data");
    res.render("index.ejs", {
      asset_list: assets,
      a_data: asset_data,
      p_data: performance_data,
    });
  } catch (error) {
    res.send({ err: error });
  }
});

app.get("/add", async (req, res) => {
  try {
    const type_list_response = await axios.get(
      `http://localhost:${port}/api/show/asset-types`
    );
    const status_list_response = await axios.get(
      `http://localhost:${port}/api/show/asset-oprsts`
    );

    const type_list = type_list_response.data;
    const status_list = status_list_response.data;
    res.render("add_asset.ejs", {
      type_list: type_list,
      status_list: status_list,
    });
  } catch (error) {
    res.status(404).send({ Error: error });
  }
});
app.get("/updateA/:id", async (req, res) => {
  const { id } = req.params;
  const asset_response = await axios.get(
    `http://localhost:${port}/api/show/asset/${id}`
  );
  const asset_data = asset_response.data;
  res.render("update_asset.ejs", { data: asset_data });
});

app.post("/update/asset/:id", async (req, res) => {
  const { id } = req.params;
  const updated_data = req.body;
  console.log(updated_data);
  const response = await axios.put(
    `http://localhost:${port}/api/update/asset/${id}`,
    updated_data
  );
  console.log("Data Updated");
  console.log(response.data);
  res.redirect("/");
});

app.get("/updateP/:id", async (req, res) => {
  const { id } = req.params;
  var performance_response;
  var performance_data;
  try {
    performance_response = await axios.get(
      `http://localhost:${port}/api/show/performance/${id}`
    );
    performance_data = performance_response.data;
    res.render("update_performance.ejs", { data: performance_data });
  } catch (error) {
    res.render("add_performance.ejs", { asset_id: id });
  }
});

app.post("/update/performance/:id", async (req, res) => {
  const { id } = req.params;
  const updated_data = req.body;
  console.log(updated_data);
  const response = await axios.put(
    `http://localhost:${port}/api/update/performance/${id}`,
    updated_data
  );
  console.log("Data Updated");
  console.log(response.data);
  res.redirect("/");
});

app.post("/delete/:id", async (req, res) => {
  const { id } = req.params;
  const { delete_option } = req.body;
  switch (delete_option) {
    case "1":
      const rsa = await axios.delete(
        `http://localhost:${port}/api/delete/asset/${id}`
      );
      console.log(rsa);
      res.redirect("/");
      break;
    case "2":
      const rsp = await axios.delete(
        `http://localhost:${port}/api/delete/performance/${id}`
      );
      console.log(rsp);
      res.redirect("/");
      break;
    default:
      const rsc = await axios.delete(
        `http://localhost:${port}/api/delete/cascade/asset/${id}`
      );
      console.log(rsc);
      res.redirect("/");
      break;
  }
});
app.use("/", addAssetRoute);
app.use("/", addAssetTypeRoute);
app.use("/", addOprStsRoute);
app.use("/", addPerformanceRoute);
app.use("/", addUserRoute);
//-----------------------------------------------------------------
app.use("/", viewAllAssetRoute);
app.use("/", viewSpecificAssetRoute);
app.use("/", viewAllTypeRoute);
app.use("/", viewAllStatusRoute);
app.use("/", viewAllPerformanceRoute);
app.use("/", viewSpecificPerformanceRoute);
app.use("/", viewAllUsersRoute);
app.use("/", viewSpecificUserRoute);
//---------------------------------------------
app.use("/", updateAssetRoute);
app.use("/", updateTypeRoute);
app.use("/", updateStatusRoute);
app.use("/", updatePerformanceRoute);
app.use("/", updateUserRoute);
//-------------------------------------------------
app.use("/", deleteAssetCascadeRoute);
app.use("/", deleteAssetRoute);
app.use("/", deletePerformanceRoute);
app.use("/", deleteTypeRoute);
app.use("/", deleteStatusRoute);
app.use("/", deleteUserRoute);
//---------------------------------------------------------
app.use("/", avgDTRoute);
app.use("/", totalMNTRoute);
app.use("/", highFRRoute);
//----------------------------------------------------------
app.use("/", sensitiveRoute);
// Starting the Server - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
app.listen(port, () => {
  console.log(`Yup Server Up and running at Port : ${port}`);
});
