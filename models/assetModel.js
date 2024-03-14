import mongoose from "mongoose";
// Making asset_loc as a multilevel schema
const locationSchema = new mongoose.Schema({
  street_no: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
});

const assetSchema = new mongoose.Schema({
  asset_id: {
    type: String,
    required: true,
  },
  asset_name: {
    type: String,
  },
  asset_type: {
    type: Number,
  },
  asset_loc: {
    type: locationSchema,
  },
  purchase_date: {
    type: Date,
  },
  initial_cost: {
    type: Number,
  },
  operational_status: {
    type: Number,
  },
});

const assetModel = mongoose.model("asset", assetSchema);
export default assetModel;
