const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bank', {
    bank_id: {
      type: DataTypes.STRING(3),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('function_bank_id'),
      primaryKey: true
    },
    bank_name: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'bank',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "bank_id_pk",
        unique: true,
        fields: [
          { name: "bank_id" },
        ]
      },
    ]
  });
};
