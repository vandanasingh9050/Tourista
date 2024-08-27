if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}
const express=require('express');
const app=express();
const path=require('path');
const mongoose=require('mongoose');
const ejsMate =require('ejs-mate');
const session =require('express-session');
const flash=require('connect-flash');
const Joi =require('joi');
// const { campgroundSchema ,reviewSchema} = require('./views/schemas.js');
// const catchAsync=require('./utils/cathcAsync');
const ExpressError=require('./utils/ExpressError');
const methodOverride=require('method-override');
// const Campground=require('./models/campground');
// const Review=require('./models/review');
const passport=require('passport');
const LocalStrategy = require('passport-local');
const User=require('./models/user');
const userRoutes=require('./routes/users');
const campgroundRoutes=require('./routes/campgrounds');
const reviewRoutes=require('./routes/reviews');
mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(()=>{
    console.log("connection open ");
})
.catch(err=>{
    console.log("got the error");
    console.log(err);
})
app.engine('ejs',ejsMate);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')));
app.use(methodOverride('_method'));
const sessionConfig={
    secret:'thisshouldbeabettersecret',
    resave:false,
    saveUninitialized:true,
    cookie:{
        httpOnly:true,
        expires:Date.now() + 1000*60*60*24*7,
        maxAge:1000*60*60*24*7
    }
}
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.session());
app.use(passport.initialize());
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
passport.use(new LocalStrategy(User.authenticate()));
app.use((req,res,next)=>{
    console.log(req.session);
    res.locals.currentUser=req.user;
   res.locals.success= req.flash('success');
   res.locals.error=req.flash('error');
   next();
})

app.use('/',userRoutes);
app.use('/campgrounds',campgroundRoutes);
app.use('/campgrounds/:id/reviews',reviewRoutes);

app.get('/',(req,res)=>{
    // res.send("hellllloooooooo");
    res.render('home')
})

// app.get('/home',(req,res)=>{
//     res.render('home');
// })
app.all('*',(req,res,next)=>{
    next(new ExpressError('Page not Found',404));
})

app.use((err,req,res,next)=>{
    const {statusCode=500}=err;
     if(!err.message) err.message="oh no, Something went wrong";
    res.status(statusCode).render('error',{err});
// res.send("ohh, Something went wrong");
})


 

app.listen(3000,(req,res)=>{
    console.log("Port 3000 is listening ");
})