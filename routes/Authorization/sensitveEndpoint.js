//Add a new asset in the database
import { Router } from "express";
import userModel from "../../models/userModel.js";

const router = Router();
const authenticate = async (req, res, next) => {
  const { user_id, password } = req.query;
  const userList = await userModel.find({}, { _id: false });
  //   console.log(userList);
  // Check if username and password are provided
  if (!user_id || !password) {
    return res.status(401).json({ response: "Empty Fields" });
  }

  var isValidUser = false;
  var isSuperUser = false;
  var isCorrectPW = false;
  userList.forEach((user) => {
    if (user_id === user.user_id) {
      if (password === user.password) {
        isCorrectPW = true;
        isValidUser = true;
        if (user.super_user) {
          isSuperUser = true;
        }
        return false;
      }
    }
  });
  if (!isCorrectPW) {
    return res.status(404).json({ response: "Wrong Password" });
  }

  if (!isValidUser) {
    return res.status(404).json({ response: "User Does Not Exixts" });
  }
  if (!isSuperUser) {
    return res
      .status(404)
      .json({ response: "Don't have Permission to access this api endpoint" });
  }
  // If authentication succeeds, proceed to the next middleware
  next();
};

router.get("/api/sensitive-endpoint", authenticate, (req, res) => {
  // Endpoint logic goes here
  res.status(200).json({ response: "Authenticated" });
});
export default router;
