module.exports = (sequelize, Sequelize) => {
  const Productos = sequelize.define("productos", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nombre: {
      type: Sequelize.STRING
    },
    referencia: {
      type: Sequelize.STRING
    },
    precio: {
      type: Sequelize.DECIMAL
    },
    peso: {
      type: Sequelize.DECIMAL
    },
    categoria: {
      type: Sequelize.STRING
    },
    stock: {
      type: Sequelize.INTEGER
    },
    uventa: {
      type: Sequelize.DATE
    }
  });

  return Productos;
};
