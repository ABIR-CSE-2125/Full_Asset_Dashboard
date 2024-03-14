// Read the asset and performance collectiopnand show the records of an ass
import { Router, response } from "express";
import userModel from "../../../models/userModel.js";

const router = Router();
router.delete("/api/delete/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOneAndDelete({
      user_id: id,
    });
    if (!user) {
      res.status(404).json({ response: "USER DOES NOT EXIST!" });
      return;
    }
    console.log(`USER ${id} DELETED SUCCESSFULLY`);
    res.status(200).json({ response: "USER DELETED SUCCESSFULLY" });
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
