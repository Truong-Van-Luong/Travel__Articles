import Post from "../models/Post.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";

class PostController {

    // GET /posts
    index(req, res) {
        connection.connect().then(async (db) => {
            try {
                const result = await Post.findAll(db);
                res.render('post/post', { posts: result });
            } catch (err) {
                console.error(err);
            } finally {
                await connection.close();
            }
        });
    }

    // GET /posts/:id
    detail(req, res) {
        connection.connect().then(async (db) => {
            try {
                const result = await Post.findById(db, new ObjectId(req.params.id));
                res.render('post/detail', { post: result });
            } catch (err) {
                console.error(err);
            } finally {
                await connection.close();
            }
        });
    }

    // GET /posts/create
    create(req, res) {
        res.render('post/create');   
    };
    // edit post
    edit(req, res) {
        connection.connect().then(async (db) => {
            try {
                const result = await Post.findById(db, new ObjectId(req.params.id));
                res.render('post/edit', { post: result });
            } catch (err) {
                console.error(err);
            } finally {
                await connection.close();
            }
        });
    };
     // PUT /posts/:id
     async update(req, res) {
        try {
            const postId = req.params.id;

            const db = await connection.connect();
            const newData = {
                title: req.body.title,
                content: req.body.content,
                author: req.body.author,
                image: req.body.image
            };

            const result = await Post.updateById(db, postId, newData);
            if (result.modifiedCount === 1) {
                res.redirect(`/me/stored/posts`);
            } else {
                res.status(404).send('Post not found');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        } finally {
            await connection.close();
        }
    }

     // DELETE /posts/:id
     async delete(req, res) {
        try {
            const postId = req.params.id;
            const db = await connection.connect();

            const result = await Post.deleteById(db, postId);
            if (result.deletedCount === 1) {
                res.redirect('back');
            } else {
                res.status(404).send('Post not found');
            }
        } catch (err) {
            console.error(err);
            res.status(500).send('An error occurred');
        } finally {
            await connection.close();
        }
    }

    // POST /posts/store
    store(req, res) {
        console.log(req.body);
        connection.connect().then(async (db) => {
            try {
                const post = new Post(undefined, req.body.title, req.body.content, req.body.author, req.body.image);
                const result = await post.save(db);
                console.log(result);
                res.redirect('/posts');
            } catch (err) {
                console.error(err);
                res.status(500).send('An error occurred');
            } finally {
                await connection.close();
            }
        });
    }
}

export default new PostController();