const { Router } = require("express");
const ProductRouter = Router();
const { Authentication } = require("../Midlewares/Authentication");
const { DataModel } = require("../Models/Data.Model");



ProductRouter.post("/:userId/create", Authentication, async (req, res) => {
  const userId = req.params.userId;
  const { name, price, imageurl } = req.body;
  const createproduct = new DataModel({
    name,
    price,
    imageurl,
    userId,
  });
  await createproduct.save();
  res.send({ msg: "Product Created", Product: createproduct });
});
ProductRouter.get("/:_id/one", Authentication, async (req, res) => {
  const _id = req.params._id;
  const userproducts = await DataModel.find({ _id });
  res.send({ msg: "Product", product: userproducts });
});
ProductRouter.get("/:userId",Authentication, async (req, res) => {
  const userId = req.params.userId;
  const userproducts = await DataModel.find({ userId });
  res.send({ msg: "All Produucts" ,products:userproducts });
});






ProductRouter.put("/:userId/update/:productId", async (req, res) => {
  //   const userId = req.params.userId;
  const productId = req.params.productId;
  const { name, price, imageurl } = req.body;
  const userproducts = await DataModel.findByIdAndUpdate(productId, {
    name: name,
    price: price,
    imageurl: imageurl,
  });
  res.send({ msg: "All Products", Products: userproducts });
});



ProductRouter.delete("/:userId/delete/:productId", async (req, res) => {
  //   const userId = req.params.userId;
  const productId = req.params.productId;
  //   const { name, price, imageurl } = req.body;
  const userproducts = await DataModel.findByIdAndRemove(productId);
  res.send({ msg: "Product deleted" });
});
module.exports = { ProductRouter };
