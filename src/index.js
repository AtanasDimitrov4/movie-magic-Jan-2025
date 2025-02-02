
import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import routes from './routes.js';
import showRatingHelper from './helpers/rating-helper.js';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middlewares/auth-middleware.js';

    

const app = express();

//db config
try{
   const defaultUri = 'mongodb://127.0.0.1:27017/magic-movies-softuni'
   await mongoose.connect(process.env.DATABASE_URI ?? defaultUri);

   console.log('DB Connected Successfuly!');
} catch (err) {
    console.log('Cannot connect to DB');
    console.error(err.message)
}


//handlebars config
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions:{
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        showRating: showRatingHelper,
    }
}));

app.set('view engine', 'hbs');
app.set('views', './src/views');
//express config
app.use('/static', express.static('src/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(authMiddleware);
//setup routes
app.use(routes);



//start server
app.listen(6969, () => console.log('Server is listening on http://localhost:6969...'));