'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  cart.init({
    qty: {
      type:DataTypes.INTEGER
    },
    totalPrice : {
      type:DataTypes.INTEGER
    },
    categoryId : {
      type:DataTypes.INTEGER
    },
    productId : {
      type:DataTypes.INTEGER
    },
    productDesc :{
      type:DataTypes.STRING
    },
    productImg :{
      type:DataTypes.STRING
    },
    productName : {
      type:DataTypes.STRING
    },
    productPrice :{
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'cart',
    freezeTableName : true,
  });
  return cart;
};