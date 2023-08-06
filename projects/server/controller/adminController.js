const db = require('../models');
const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');
const enc = require('bcrypt');
const { response } = require('express');
const user = db.user;
const product = db.product;

const adminController = {
  register : async (req, res) =>{
    try {
      console.log(req.body);
      const {username, password, email} = req.body;
      const isExist = await user.findOne({
        where : {
          [Op.or] : [
            {username},
            {email}
          ]
        }
      });
      if (isExist == null) {
        const salt = await enc.genSalt(10);
        const hashPassword = await enc.hash(password, salt);
        const result = await user.create({
          username : username,
          password : hashPassword,
          email : email
        });
        // console.log(username, hashPassword, email);
        res.status(200).send({
          message : 'Register success',
          data : result
        });
      }else{
        if (isExist.username == username) {throw({message:`Username aleady exist`})}
        if (isExist.email == email) {throw({message:`Email already exist`})}
        res.status(400).send('failed to register');
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
  addProduct: async (req, res) => {
    try {
      console.log(req.body);
      const {productName, productDesc, productPrice, productQty, categoryId } = req.body;
      
      const {filename} = req.file;
      const addProduct = await product.create({
        productName, productDesc, productImg : filename, productPrice, productQty, categoryId
      });
      res.status(200).send({
        status : true,
        message : 'Add item success',
        result : addProduct
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error)
    }
  }
}

module.exports = adminController;