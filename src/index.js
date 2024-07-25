import methodOverride  from 'method-override';
import express from 'express';
import { engine } from 'express-handlebars'; 
import route from './routes/index.route.js';
import cookieParser from 'cookie-parser'; 

const app = express();
app.use(methodOverride('_method'))

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); 

app.engine('handlebars', engine(
    {
        helpers: {
            sum: (a,b) => a+b,
        }

    }
)); 
app.set('view engine', 'handlebars'); 
app.set('views', './src/resources/views'); 

// init routes
route(app);


app.listen(3000);