const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resto_category', {
    reca_name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
    },
    reca_desc: {
      type: DataTypes.STRING(55),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'resto_category',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "reca_name_pk",
        unique: true,
        fields: [
          { name: "reca_name" },
        ]
      },
    ]
  });
};
