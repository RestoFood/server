const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resto_menu', {
    reme_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    reme_name: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    reme_desc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    reme_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    reme_url_image: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    reme_mety_name: {
      type: DataTypes.STRING(55),
      allowNull: true,
      references: {
        model: 'menu_type',
        key: 'mety_name'
      }
    },
    reme_reto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'resto_shop',
        key: 'reto_id'
      }
    }
  }, {
    sequelize,
    tableName: 'resto_menu',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "reme_id_pk",
        unique: true,
        fields: [
          { name: "reme_id" },
        ]
      },
    ]
  });
};
