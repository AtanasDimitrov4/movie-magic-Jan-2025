
import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import routes from './routes.js';
import showRatingHelper from './helpers/rating-helper.js';

    

const app = express();

//db config
try{
   const uri = 'mongodb://localhost:27017/magic-movies-softuni'
   await mongoose.connect(uri);

   console.log('DB Connected Successfuly!');
}catch{
    console.log('Cannot connect to DB');
    console.error(err.message)
}


//handlebars config
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
        showRating: showRatingHelper,
    }
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');
//express config
app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false}));

//setup routes
app.use(routes);



//start server
app.listen(6969, () => console.log('Server is listening on http://localhost:6969...'));