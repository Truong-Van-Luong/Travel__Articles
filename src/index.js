import methodOverride  from 'method-override';
import express from 'express';
import { engine } from 'express-handlebars'; // 1. import handlebars engine
import route from './routes/index.route.js';
import connection from './config/db/index.js';
import Post from './app/models/Post.js';
import User from './app/models/User.js';
import { ObjectId } from 'mongodb';
import cookieParser from 'cookie-parser'; // import cookie-parser to use req.cookies

const app = express();
app.use(methodOverride('_method'))

// const post = new Post(undefined, "Post - 13 - Update", "This is my updated post", "Ha Hoang");
// connection.connect().then(async (db) => {
//     try {
//         // get all posts
//         // const result = await Post.findAll(db);
//         // for (let post of result) {
//         //     console.log(`${post._id}: ${post.title}`);
//         // }

//         // save a post
//         // const result = await post.save(db);

//         // update a post
//         // const result = await post.update(db, new ObjectId('65fae45730faf6208a55bcfd'));

//         // delete a post
//         // const result = await post.del(db, new ObjectId('65fff34f6e6960b1d4cf13f3'));
        
//         console.log(result);
//     } catch (err) {
//         console.error(err);
//     } finally {
//         await connection.close();
//     }
// });

// -- End of testing the Post model

// // Start User
// const user = new User(undefined, "Post - 28 - Update", "This is my updated post", "Van Luong");
// connection.connect().then(async (db) => {
//     try {
//         // get all posts
//         // const result = await Post.findAll(db);
//         // for (let post of result) {
//         //     console.log(`${post._id}: ${post.title}`);
//         // }

//         // save a post
//         // const result = await post.save(db);

//         // update a post
//         // const result = await post.update(db, new ObjectId('65fae45730faf6208a55bcfd'));

//         // delete a post
//         // const result = await post.del(db, new ObjectId('65fae71904448ac5a76e9094'));
        
//         console.log(result);
//     } catch (err) {
//         console.error(err);
//     } finally {
//         await connection.close();
//     }
// });
// End User

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser()); // use cookie-parser to read cookies

app.engine('handlebars', engine(
    {
        helpers: {
            sum: (a,b) => a+b,
        }
        // extname: '.ha' // config the extension name of the views
    }
)); // 2. register handlebars engine
app.set('view engine', 'handlebars'); // 3. set handlebars as the view engine
app.set('views', './src/resources/views'); // 4. set the views directory

// init routes
route(app);


app.listen(3000);