//const { Sequelize } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
  const Response = sequelize.define("response", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    responses: {
      type: DataTypes.STRING,
    },
  });
  return Response;
};
