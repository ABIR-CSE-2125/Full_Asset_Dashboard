// Read the asset and user collectiopnand show the records of an ass
import { Router } from "express";
import userModel from "../../../models/userModel.js";
const router = Router();
router.get("/api/show/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOne({ user_id: id });
    if (!user) {
      res.status(404).send("ASSET DOES NOT EXIST!");
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
