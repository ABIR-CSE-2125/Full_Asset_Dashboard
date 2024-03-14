// Read the asset and user collectiopnand show the records of an ass
import { Router } from "express";
import userModel from "../../../models/userModel.js";
const router = Router();
router.put("/api/update/user/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    const user = await userModel.findOneAndUpdate({ user_id: id }, req.body);
    if (!user) {
      res.status(404).send("USER DOES NOT EXIST!");
      return;
    }
    // cross check
    const updatedUser = await userModel.findOne({ user_id: id });
    console.log(`USER ${id} UPDATED SUCCESSFULLY`);

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
