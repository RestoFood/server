const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('address', {
    addr_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    addr_name: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    addr_detail: {
      type: DataTypes.STRING(55),
      allowNull: true
    },
    addr_latitude: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    addr_longitude: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    addr_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'address',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "addr_id_pk",
        unique: true,
        fields: [
          { name: "addr_id" },
        ]
      },
    ]
  });
};
