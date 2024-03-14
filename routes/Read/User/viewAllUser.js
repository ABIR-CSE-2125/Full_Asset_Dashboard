// Read the asset and performance collectiopnand show the records of an ass
import { Router } from "express";
import userModel from "../../../models/userModel.js";

const router = Router();
router.get("/api/show/users", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).json(users);
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
