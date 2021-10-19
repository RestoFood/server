const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('bank_account', {
    baac_acc_bank: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true
    },
    baac_owner: {
      type: DataTypes.STRING(85),
      allowNull: true
    },
    baac_saldo: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    baac_pin_number: {
      type: DataTypes.STRING(6),
      allowNull: true
    },
    baac_start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    baac_end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    baac_type: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    baac_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    baac_bank_id: {
      type: DataTypes.STRING(3),
      allowNull: true,
      references: {
        model: 'bank',
        key: 'bank_id'
      }
    }
  }, {
    sequelize,
    tableName: 'bank_account',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "baac_acc_bank_pk",
        unique: true,
        fields: [
          { name: "baac_acc_bank" },
        ]
      },
    ]
  });
};
