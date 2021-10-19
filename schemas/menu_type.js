const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('menu_type', {
    mety_name: {
      type: DataTypes.STRING(55),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'menu_type',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "mety_name_pk",
        unique: true,
        fields: [
          { name: "mety_name" },
        ]
      },
    ]
  });
};
