const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('account_payment', {
    acc_number: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('function_acc_number'),
      primaryKey: true
    },
    acc_saldo: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    acc_pin_number: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    acc_total_point: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    acc_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'account_payment',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "acc_number_pk",
        unique: true,
        fields: [
          { name: "acc_number" },
        ]
      },
    ]
  });
};
