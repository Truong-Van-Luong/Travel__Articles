
import Post from "../models/Post.js";
import connection from "../../config/db/index.js";
import { ObjectId } from "mongodb";

class UserController {
     
  register(req, res) {
    res.render('user/register');
  }
  login(req, res) {
    res.render('user/login');
  }
  logout(req, res) {
    res.render('user/logout');
  }


  }

export default new UserController();



