module.exports = app => {
  const producto = require("../controllers/productos.controller.js");

  var router = require("express").Router();

  // Crear un nuevo producto
  router.post("/", producto.create);

  // Consultar todos los productos
  router.get("/", producto.findAll);

  // Consultar producto por id
  router.get("/:id", producto.findOne);

  // Actualizar un producto por id
  router.put("/:id", producto.update);

  // Eliminar un producto por id
  router.delete("/:id", producto.delete);

  app.use('/api/productos', router);
};
