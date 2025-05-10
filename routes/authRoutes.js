const express=require('express');
const router=express.Router();
const {validateUser,register,login}=require('../controller/authController');
router.post('/register',validateUser,register);
router.post('/login',login);
module.exports=router;