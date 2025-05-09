const db = require('../models');
const user = db.user;
const product = db.product;
const cart = db.cart;
const category = db.category;
const trans = db.transaction;
const transDet = db.transDetail;
const jwt = require('jsonwebtoken');
const enc = require('bcrypt');
const moment = require('moment');
const { Op, Sequelize } = require('sequelize');


const userController = {
  login : async (req, res) => {
    try {
      const {username, password} = req.body;
      const isExist = await user.findOne({
        where : {username : username}
      });

      if (isExist == null) {throw({message:'User not found!'})}
      // const isValid =  await enc.compare(password, isExist.password);
      // if (!isValid) {throw({messge:'Wrong Password'})}
      const payload = {id : isExist.id, username : isExist.username}
      const token = jwt.sign(payload, 'minpro3');
      res.status(200).send({
        message : 'Login success',
        token
      });
    } catch (error) {
      res.status(400).send(error); 
    }
  },
  getProducts : async (req, res) => {
    try {
      const page = +req.query.page || 1;
      const limit = +req.query.limit || 10;
      // console.log(req.query.categoryId);
      const clause = [];
      if (req.query.categoryId) {
        clause.push({categoryId: req.query.categoryId})
      }
      // console.log(clause);
      const getProducts = await product.findAll({
        where : clause,
        limit,
        offset : limit * (page - 1)
      });
      const total = await product.count({
        where : clause
      });

      console.log(total);
      res.status(200).send({
        status : 'OK',
        currentPage : page,
        totalPage : Math.ceil(total/limit),
        getProducts
      });
    } catch (error) {
      console.log(error);
      res.status(400).send(error);
    }

  },
  getCategories : async (req, res) => {
    try {
      const getCategories = await category.findAll({
        order : [['id', 'ASC']]
      });
      res.status(200).send({
        status : 'OK',
        getCategories
      })
    } catch (error) {
      res.status(400).send(error);
    }
  },
  setToCart : async (req, res) => {
    try {
      const {qty, totalPrice, detail} = req.body;
      const {categoryId, id: productId, productDesc, productImg, productName, productPrice} = detail;
      
      // console.log(total_harga);
      const addCart = await cart.create({
        qty : qty,
        totalPrice : totalPrice,
        categoryId : categoryId,
        productId : productId,
        productDesc : productDesc,
        productImg : productImg,
        productName : productName,
        productPrice : productPrice
      });
      
      res.status(200).send({
        status : true,
        message : 'Add cart success',
        result : addCart
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  checkCart : async (req, res) => {
    try {
      const isExist = await cart.findOne({
        where : {productId : req.query.productId}
      });
      res.status(200).send({
        status : true, 
        isExist
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  editCart : async (req, res) => {
    try {
      // console.log(req.body);
      const {qty, totalPrice, detail} = req.body;
      const {productName, productDesc, productImg, productPrice, categoryId, id:productId} = detail;
      // console.log(detail);
      // console.log(req.params);
      const setCart = await cart.update(
        {
          qty : qty,
          totalPrice : totalPrice
        },
        {where : {productId : req.params.id}}
      );
      res.status(200).send({
        message : 'Berhasil tambah barang'
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getCart : async (req, res) => {
    try {
      
      const result = await cart.findAll();
      // console.log(result);
      res.status(200).send({
        status : 'OK',
        result
      });
    } catch (error) {

      res.status(400).send(error);
    }
  },
  checkOut : async (req, res) => {
    try {
      // console.log(req.body);
      console.log(req.body);
      const {userId, totalPrice, menus, buyerAmount} = req.body;
      const invoice = `INV${userId}${moment().format('MMDDYYYYhmmss')}`;
      const change = buyerAmount - totalPrice;
      
      const setTrans = await trans.create({
        transactionId : invoice,
        total : totalPrice,
        cash : buyerAmount,
        change,
        userId
      });

      menus.map((value) =>{
        const setTransDet = transDet.create({
          productName : value.productName,
          productPrice : value.productPrice,
          productCategory : value.categoryId,
          totalQty : value.qty,
          totalPriceItem : value.totalPrice,
          productId : value.productId,
          transactionId : invoice,
          userId
        });
      })

      const cleanCart = await cart.destroy({
        where : {},
        truncate : true
      })

      
      
      res.status(200).send({
        status : true,
        message : 'Checkout Success',
        setTrans
      });
    } catch (error) {
      res.status(400).send(error);
    }
  },
  findMenus : async (req, res) =>{
    try {
      const clause = [];
      const {key, cat} = req.query;
      console.log(cat=='');
      if (!cat == '') {
        clause.push({categoryId:Number(cat)})
      }

      clause.push({productName:{[Op.like]: `%${key}%`}})
      const result = await product.findAll({
        where : {
          [Op.and] : clause
        },
        limit : 10
      })

      // console.log(result);
      res.status(200).send({
        status : true,
        message : 'Success',
        result
      });
    } catch (error) {
      res.status(400).send(error)
    }
  }
}
module.exports = userController;