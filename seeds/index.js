const mongoose=require('mongoose');
const cities=require('./cities');
const {places,descriptors}=require('./seedHelpers');
const Campground=require('../models/campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp')
.then(()=>{
    console.log("connection open ");
})
.catch(err=>{
    console.log("got the error");
    console.log(err);
})
const sample=array=>array[Math.floor(Math.random()*array.length)];
const seedDB=async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++)
    {
        const random23 =Math.floor(Math.random()*23);
        const randomNumber =Math.floor((Math.random()*500)+10);
        const camp=new Campground({
            author:'65fe735879f6e61e299f98d5',
         location:`${cities[random23].city},${cities[random23].state}`, 
         title:`${sample(descriptors)} ${sample(places)}`,  
         image:'https://source.unsplash.com/collection/483251',      
         description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque tempora, aliquam nulla, ab asperiores excepturi totam quaerat eius eaque molestiae iste consequuntur nam aut! Necessitatibus molestias magnam ex dolor numquam",
         price:randomNumber,
        // price,
        images: [
            {
              url: 'https://res.cloudinary.com/ddqbnfq5g/image/upload/v1711865599/YelpCamp/hbnui27hfqb7irewuhwm.png',
              filename: 'YelpCamp/hbnui27hfqb7irewuhwm',
            },
            {
              url: 'https://res.cloudinary.com/ddqbnfq5g/image/upload/v1711865601/YelpCamp/dbxprq7hb3j0lbpucnif.png',
              filename: 'YelpCamp/dbxprq7hb3j0lbpucnif',
            }
          ]
        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
});
