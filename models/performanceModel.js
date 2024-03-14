import mongoose from "mongoose";
const performanceSchema = new mongoose.Schema({
  asset_id: {
    type: String,
    required: true,
  },
  uptime: {
    type: Number,
    default: 0, // % of total time
  },
  downtime: {
    type: Number,
    default: 0, // % of total time
  },
  maintenance_cost: {
    type: Number,
    default: 0,
  },
  failure_rate: {
    type: Number,
    default: 0, // % of failure
  },
  efficiency: {
    type: Number,
    default: 0, // % of efficiency
  },
});

const performanceModel = mongoose.model(
  "performance_metrics",
  performanceSchema
);
export default performanceModel;
