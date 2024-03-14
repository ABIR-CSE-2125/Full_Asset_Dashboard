import mongoose from "mongoose";

const operationalStatusSchema = new mongoose.Schema({
  sts_id: {
    type: Number,
    required: true,
  },
  sts_desc: {
    type: String,
    required: true,
  },
});

const operationalStatusModel = mongoose.model(
  "oprnl_sts",
  operationalStatusSchema
);

export default operationalStatusModel;
