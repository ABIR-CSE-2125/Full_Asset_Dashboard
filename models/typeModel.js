import mongoose from "mongoose";

const assetTypeSchema = new mongoose.Schema({
  type_id: {
    type: Number,
    required: true,
  },
  type_desc: {
    type: String,
    required: true,
  },
});

const assetTypeModel = mongoose.model("asset_type", assetTypeSchema);

export default assetTypeModel;
