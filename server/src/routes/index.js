const express = require('express');
const dotenv = require("dotenv").config();

const router = express.Router();

// controllers
const { getUsers, getUser, addUser, updateUser, deleteUser } = require('../controllers/user');
const { register, login } = require('../controllers/auth');
const { getCategories, addCategory, updateCategory, deleteCategory, getCategory } = require('../controllers/category');
const { getProducts, getProduct, addProduct, updateProduct, deleteProduct } = require('../controllers/product');
const { getTransactions, getTransaction, addTransaction } = require('../controllers/transaction');
const { addProductCategory, updateProductCategory, deleteProductCategory, } = require('../controllers/productcategory');
const { updateProfile } = require('../controllers/profile');

// middlewares
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

// user routes... maybe best for admin
router.get('/user', getUsers);
router.get('/user/:id', getUser);
router.post('/user', addUser); // not necessary but okay for dev, use register instead
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

// auth routes
router.post('/login', login);
router.post('/register', register);

// category routes
router.get('/category', auth, getCategories);
router.get('/category/:id', auth, getCategory);
router.post('/category', auth, addCategory);
router.patch('/category/:id', auth, updateCategory);
router.delete('/category/:id', auth, deleteCategory);

// product routes
router.get('/product', auth, getProducts);
router.get('/product/:id', auth, getProduct);
router.post('/product', auth, uploadFile("img"), addProduct);
router.patch('/product/:id', auth, uploadFile("img"), updateProduct);
router.delete('/product/:id', auth, deleteProduct);

// transaction routes
router.get('/transaction', auth, getTransactions);
router.get('/transaction/:id', auth, getTransaction);
router.post('/transaction', auth, addTransaction);


// productcategory routes
router.post('/productcategory', auth, addProductCategory);
router.patch('/productcategory/:id', auth, updateProductCategory);
router.delete('/productcategory/:id', auth, deleteProductCategory);

// profile routes
router.patch('/profile/:idUser', auth, updateProfile);

module.exports = router;