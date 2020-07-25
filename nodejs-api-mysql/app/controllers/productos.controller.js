const db = require("../models");
const productos = db.productos;
const Op = db.Sequelize.Op;

// Create and Save a new Producto
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({
      message: "¡El contenido no puede estar vacío!"
    });
    return;
  }

  // Create a Producto
  const producto = {
    nombre: req.body.nombre,
    referencia: req.body.referencia,
    precio: req.body.precio,
    peso: req.body.peso,
    categoria: req.body.categoria,
    stock: req.body.stock,
    uventa: null
  };

  // Save Producto in the database
  productos.create(producto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo algún error al crear el producto."
      });
    });
};

// Retrieve all Productos from the database.
exports.findAll = (req, res) => {
  productos.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Se produjo algún error al consultar los productos."
      });
    });
};

// Find a single Producto with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  productos.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al recuperar el producto con id=" + id
      });
    });
};

// Update a Producto by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  console.log(id);
  console.log(req.body)

  productos.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "El producto se actualizó con éxito."
        });
      } else {
        res.send({
          message: `No se puede actualizar el producto con id= ${id}. ¡Tal vez no se encontró el producto o el cuerpo está vacío!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error al actualizar el producto con id=" + id
      });
    });
};

// Delete a Producto with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  productos.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Producto se eliminó con éxito!"
        });
      } else {
        res.send({
          message: `No se pudo eliminar el producto con id= ${id}. ¡Tal vez no se encontró el producto!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "No se pudo eliminar el producto con id= " + id
      });
    });
};
