
import Post from "../models/Post.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";

class SiteController {
      // Me posts
  indexPosts(req, res){
      connection.connect().then(async (db) => {
          try {
              const result = await Post.findAll(db);
              res.render('home', { posts: result });
          } catch (err) {
              console.error(err);
          } finally {
              await connection.close();
          }
      });
  };
    index(req, res) {
    res.render('home');
  }

  about(req, res) {
    res.render('about');
  }

  search(req, res) {
    res.render('search');
  }



  }

export default new SiteController();



