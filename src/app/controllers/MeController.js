import Post from "../models/Post.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";

class MeController {
      // Me posts
  storedPosts(req, res){
      connection.connect().then(async (db) => {
          try {
              const result = await Post.findAll(db);
              res.render('me/stored-posts', { posts: result });
          } catch (err) {
              console.error(err);
          } finally {
              await connection.close();
          }
      });
  };

  }

export default new MeController();