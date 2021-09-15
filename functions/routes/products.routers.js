const { Router } = require("express");
const router = Router();
const admin = require("firebase-admin");

const db = admin.firestore();

//post
router.post("/api/products", async (req, res) => {
  try {
    await db
      .collection("products")
      .doc("/" + req.body.id + "/")
      .create({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      });
    return res.status(204).json("Carga exitosa");
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
});

//get por id del producto
router.get("/api/products/:product_id", async (req, res) => {
  try {
    const doc = db.collection("products").doc(req.params.product_id);
    const item = await doc.get();
    const response = item.data();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
});

//get para consultar todos los productos
router.get("/api/products", async (req, res) => {
  try {
    const query = db.collection("products");
    const querySnapshot = await query.get();
    const response = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      name: doc.data().name,
      price: doc.data().price,
      description: doc.data().description,
    }));
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).send(error);
  }
});

//eliminar algun producto
router.delete("/api/products/:product_id", async (req, res) => {
  try {
    const document = db.collection("products").doc(req.params.product_id);
    await document.delete();
    return res.status(200).json("Informacion eliminada");
  } catch (error) {
    return res.status(500).send(error);
  }
});

//actualizacion de productos
router.put("/api/products/:product_id", async (req, res) => {
  try {
    const document = db.collection("products").doc(req.params.product_id);
    await document.update({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    });
    return res.status(200).json("Informacion actualizada");
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
