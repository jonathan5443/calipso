import express from "express";
import dataCtrl from "../controllers/data";
import userCtrl from "../controllers/user";
import auth from "../middlewares/auth";

const api = express.Router();

api.get("/product", dataCtrl.getProducts);
api.get("/product/:productId", dataCtrl.getProduct);
api.post("/product", dataCtrl.postProduct);
api.put("/product/:productId", dataCtrl.updateProduct);
api.delete("/product/:productId", dataCtrl.deleteProduct);
api.post("/signup", userCtrl.singUp);
api.post("/signin", userCtrl.singIn);
api.get("/private", auth, function(req, res) {
  res.status(200).send({
    message: `Tienes acceso`
  });
});

module.exports = api;
