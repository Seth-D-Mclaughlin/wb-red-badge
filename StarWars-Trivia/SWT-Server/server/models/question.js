//const { Sequelize } = require("sequelize/types");

module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("question", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    questions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
            //   ["1",
            //    "What is the name of Han Solo’s ship?",
            //    "Millennium Falcon",
            //  "REB",]
            // ],
            // ["2", "Who played the part of Mace Windu?", "Mace Windu", "GE"],
            // ["3", "Who killed Han Solo?", "Kylo Ren", "RES"],
    },
  });
  return Question;
};
