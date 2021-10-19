const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('resto_reviews', {
    rere_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    rere_comments: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    rere_rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rere_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    rere_reto_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'resto_shop',
        key: 'reto_id'
      }
    }
  }, {
    sequelize,
    tableName: 'resto_reviews',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "rere_id_pk",
        unique: true,
        fields: [
          { name: "rere_id" },
        ]
      },
    ]
  });
};
