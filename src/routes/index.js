import express from "express";
import dataCtrl from "../controllers/data";
import userCtrl from "../controllers/users";
import auth from "../middlewares/auth";

const api = express.Router();

api.get("/product", auth, dataCtrl.getProducts);
api.get("/product/:productId", auth, dataCtrl.getProduct);
api.post("/product", auth, dataCtrl.postProduct);
api.put("/product/:productId", auth, dataCtrl.updateProduct);
api.delete("/product/:productId", auth, dataCtrl.deleteProduct);
api.post("/signup", auth, userCtrl.singUp);
api.post("/signin", auth, userCtrl.singIn);
// To test if the authorization is working
api.get("/private", auth, function(req, res) {
  res.status(200).send({
    message: "It worked! User id is: " + req.user + "."
  });
});

module.exports = api;
