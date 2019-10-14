//CALL THE PACKAGES



var express= require('express');
var app=express();
var bodyParser=require('body-parser');
var morgan = require('morgan');
var mongoose=require('mongoose');
var User= require('./app/models/user');
var port= process.env.PORT || 8080;
var jwt= require('jsonwebtoken');

//super secret for creating tokens, student can change
//var superSecret= 'ilovescotchscotchyscotchscotch';
var superSecret= 'toihocmean';


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use(function(req,res,next){
    res.setHeader('Access-Controll-Allow-Origin', '*');
    res.setHeader('Access-Controll-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers','X-Requested-With, content-type, Authorization');
    next();
});


app.use(morgan('dev'));

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/myDatabase', {useNewUrlParser: true});
mongoose.set('useCreateIndex', true);




app.get('/',function(req,res){
 res.send('Welcome to the home page!');
 });

 //middleware to use for all requests
 var apiRouter= express.Router();


apiRouter.post('/authenticate', function(req,res){
   
   
   User.findOne({
      username: req.body.username
   }).select('name username password').exec(function(err,user){
      if(err) throw err;


      //no user with that username was found
      if(!user){
         res.json({
            success: false,
            message: 'Authentication failed. User not found.'
         });
      } else if(user){


         var validPassword= user.comparePassword(req.body.password);
         if(!validPassword){
            res.json({
               success: false,
               message: 'Authentication failed. Wrong password.'
            
            });
         }else{


            var token= jwt.sign({
               name: user.name,
               username: user.username
            }, superSecret,{
               expiresIn: '24h' //expires in 24 hours
            });
         
            
            res.json({
               success: true,
               message: 'User da duoc cap phat token!',
               token: token
            });
         }
      }
   });
});



 apiRouter.use(function(req,res,next){
     
   console.log('Dang lam tren App!');
   
   
   var token=req.body.token||req.query.token||req.headers['x-access-token'];  
     
   if(token){


      jwt.verify(token,superSecret,function(err,decoded){
         if(err){
            return res.json({success: false, message:'Failed to authenticate token.'});
         }else{
            
            req.decoded=decoded;
            next();
         }
      });
   }else{



      return res.status(403).send({
         success:false,
         message: 'No token provided.'
      });
   }
 });


 
 apiRouter.get('/', function(req,res){
     res.json({message: 'Resful API! welcome to our api!'});
 });
//mongoose.connect('mongodb://localhost:27017/myDatabase');


apiRouter.route('/users')


   .post(function(req,res){
      var user=new User();
      user.name=req.body.name;
      user.username=req.body.username;
      user.password=req.body.password;
    
   
      user.save(function(err){
         if(err){
            if(err.code==11000)
            return res.json({success:false,message:'A User with that username already exist!'});
            else
               return res.send(err);
         }
         
         
         res.json({message:'User created'});
      });
 
 })
// apiRouter.route('/users/all')
   // http://localhost:8080/api/users
   .get(function(req,res){
      User.find(function(err,users){
         if(err) return res.send(err);
         

         res.json(users);
      });
   });


   //////////////////////////GET A SINGLE USER///////////////////
apiRouter.route('/users/:user_id')


   .get(function(req,res){
      User.findById(req.params.user_id,function(err,user){
         if(err) return res.send(err);


         res.json(user);
      });
   })
// apiRouter.route('/users/userinfo/:user_id')
   .put(function(req,res){
      User.findById(req.params.user_id,function(err,user){
         if(err) return res.send(err);
 
         if(req.body.name) user.name=req.body.name;
         if(req.body.username) user.username=req.body.username;
         if(req.body.password) user.password=req.body.password;
 
         user.save(function(err){
            if (err) return res.send(err);
            res.json({message:'User updated!'});
         });
      });
   })



 
 
 //////////////////////DELETE USER/////////////////////
   //  apiRouter.route('/users/:user_id')
   .delete(function(req,res){
      User.remove({
         _id:req.params.user_id
      }, function(err,user){
         if(err) return res.send(err);
         
         res.json({message:'Successfully deleted'});
      });
   });




apiRouter.get('/me', function(req,res){
   res.send(req.decoded);
});


app.use('/api',apiRouter);



app.listen(port);
console.log('Dang dung Port:' +port);
