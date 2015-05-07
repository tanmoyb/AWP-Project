var express    = require('express');
   var app        =express();
    var mongoose    =require('mongoose');
    var bodyParser=require('body-parser');
   var newQuestion=require('./node-controller/saveNewQuestion');
   var  newAnswer=require('./node-controller/saveNewAnswer');
   var  newuser=require('./node-controller/saveNewUser');
   var  passport =require('passport');
   var passportLocal=require('passport-local');
    var cookieparser=require('cookie-parser');
   var  expresssession=require('express-session');
     var checkUser=require('./node-models/saveUserToMongo');

mongoose.connect('mongodb://localhost:27017');
app.use(cookieparser());
app.use(expresssession({
    secret: 'secret',
    resave: false,
    saveUninitialized:false
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(passport.initialize());
app.use(passport.session());

passport.use( new passportLocal.Strategy(function(username, password, done){
    //console.log(username);
    checkUser.findOne({email:username}, function(err, user){
        //console.log(username);
        //console.log(user);
        //console.log(password);
        //console.log(user.password);
        if(user.password===password){
            console.log('match');
            done(null, {id:username, name:password})
        }else{
            done(null, null )
        }
            
    });
    /*if(username===password){
        done(null, {id:username, name:password})
    }else{
        done(null, null )
    }*/
}));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(function(id, done){

    done(null,{id:id, name:id});
});
app.get('/partials/login.html', function(req, res){
    res.sendFile(__dirname+'/partials/login.html');
});
app.get('/partials/registration.html', function(req, res){
    res.sendFile(__dirname+'/partials/registration.html');
});
app.get('/', function(req, res){
    res.sendFile(__dirname+'/index.html');
});
app.get('/partials/home.html', function(req, res){
    var isAuthenticate=req.isAuthenticated();
    if(isAuthenticate){
        res.sendFile(__dirname+'/partials/home.html');
    }else{
        res.sendFile(__dirname+'/partials/login.html');
    }
});




app.post('/api/saveNewQuestion', newQuestion.createNewQuestion);
app.get('/api/saveNewQuestion', newQuestion.getAll);
app.post('/api/saveNewAnswer', newAnswer.addNewAnswer );
app.post('/api/registerUser', newuser.addUser);

app.post('/api/login', passport.authenticate('local'),function(req,res){
    res.json({id: 'yes'});
});


app.use('/js', express.static(__dirname+'/js'));
app.use('/css', express.static(__dirname+'/css'));
app.use('/fonts', express.static(__dirname+'/fonts'));
app.use('/img', express.static(__dirname+'/img'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
