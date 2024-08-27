const express=require('express');
const router=express.Router();
const User =require('../models/user');
const { storeReturnTo } = require('../middleware');
const cathcAsync=require('../utils/cathcAsync');
const passport = require('passport');
const users=require('../controllers/users');

router.route('/register')
.get(users.renderRegister)
.post(cathcAsync(users.register));

// agr niche wala router.route dikkat de to usko hata ke sirf ye 2 comment lines ko uncomments krana h!!!
// router.get('/login',users.renderLogin);
// router.post('/login', storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}),users.login);

router.route('/login')
.get(users.renderLogin)
.post(passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}),users.login);
router.get('/logout', users.logout);


module.exports=router;