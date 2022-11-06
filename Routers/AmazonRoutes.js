const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { CoustomerModel } = require("../Models/Coustomer.Model");
const bcrypt = require("bcrypt");
const AmazonRouter = Router();
AmazonRouter.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 5, async function (err, hashedpassword) {
    if (err) {
      res.send({ msg: "Something went Wronge" });
    }
    const newcoustomer = new CoustomerModel({
      name,
      email,
      password: hashedpassword,
    });
    console.log(newcoustomer);
    try {
      await newcoustomer.save();
      res.send({ msg: "Sign up Sucessfully" });
    } catch {
      res.send({ msg: "Error in Signup" });
    }
  });
});

AmazonRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const coustomer = await CoustomerModel.findOne({ email });
  if (!coustomer) {
    return res.send({ msg: "Invalid Credentials" });
  }
  const hashedpassword = coustomer.password;
  await bcrypt.compare(password, hashedpassword, function (err, result) {
    if (err) {
      res.send({ msg: "Something Went Wrong" });
    }
    if (result == true) {
      const token = jwt.sign(
        { email: coustomer.email, _id: coustomer._id },
        process.env.SECRETKEY
      );
      return res.send({
        messege: "Login Sucessful",
        token: token,
        userId: coustomer._id,
      });
    } else {
      return res.send("Invalid Credentials");
    }
  });
});

module.exports = { AmazonRouter };
