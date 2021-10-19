const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resto_addon', {
    redon_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    redon_name: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    redon_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    redon_reme_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'resto_menu',
        key: 'reme_id'
      }
    }
  }, {
    sequelize,
    tableName: 'resto_addon',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "redon_id_pk",
        unique: true,
        fields: [
          { name: "redon_id" },
        ]
      },
    ]
  });
};
