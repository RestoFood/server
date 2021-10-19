const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resto_shop', {
    reto_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    reto_name: {
      type: DataTypes.STRING(155),
      allowNull: true
    },
    reto_open_hours: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    reto_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    reto_approval: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    reto_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    reto_resto_type: {
      type: DataTypes.STRING(15),
      allowNull: true,
      references: {
        model: 'resto_category',
        key: 'reca_name'
      }
    }
  }, {
    sequelize,
    tableName: 'resto_shop',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "reto_id_pk",
        unique: true,
        fields: [
          { name: "reto_id" },
        ]
      },
    ]
  });
};
