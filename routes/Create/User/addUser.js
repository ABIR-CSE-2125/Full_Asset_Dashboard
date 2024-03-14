//Add a new asset in the database
import { Router } from "express";
import userModel from "../../../models/userModel.js";
const router = Router();
router.post("/api/add/user", async (req, res) => {
  try {
    const { user_id, password, super_user } = req.body;
    const present_ids = (await userModel.find({})).map((tuple) => {
      return tuple.user_id;
    });
    var ifExists = false;
    present_ids.forEach((id) => {
      if (id === user_id) {
        ifExists = true;
      }
    });
    if (ifExists === true) {
      res
        .status(400)
        .send("ID ALREADY EXISTS! PLS RE-ENTER WITH APPROPRIATE DATA!!");
      return;
    }

    const userData = {
      user_id: user_id,
      password: password,
      super_user: super_user,
    };

    const newUser = new userModel(userData);
    const savedUser = await newUser.save();
    console.log(`USER ADDED SUCCESSFULLY.\User : ${userData}`);
    res.status(201).json(savedUser);
  } catch (err) {
    console.log("Request Error!");
    res.status(500).json({ err: "Internal Server Error" });
  }
});

export default router;
