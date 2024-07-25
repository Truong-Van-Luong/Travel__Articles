import User from "../models/User.js";
import connection from "../../config/db/index.js";
import bcrypt from "bcrypt";
import Auth from "../helpers/Auth.js";



class AuthController {

    /* REGISTER
    ** path: /auth/resgister
    ** method: POST
    */
    async register(req, res) {
        const email = req.body.email; console.log(`Email: ${email}`);
        connection.connect().then(async (db) => {
            try {
                const result = await User.isAvailable(db, email);
                console.log(`Result: ${result}`);
                if (result) {
                    console.log('Email is already taken');
                    res.send('<script>alert("Email này đã tồn tại. Vui lòng nhập email khác !"); window.location.href = "/user/register";</script>'); 
                } else {
                    bcrypt.hash(req.body.password, 10, function(err, hash) {
                        if(err) {
                            console.error(`Error: ${err}`);
                        } else {
                            console.log(`Hash: ${hash}`);
                            connection.connect().then(async (db) => {
                                console.log('Creating new user');
                                const user = new User(undefined, req.body.name, req.body.email, hash);
                                user.save(db).then((result) => {
                                    res.send('<script>alert("Đăng ký thành công. Vui lòng đăng nhập để xem được bài post"); window.location.href = "/user/login";</script>');
                                    console.log(`User created with ID: ${result.insertedId}`);
                                });
                            });
                        }
                    });
                }
            } catch (err) {
                console.error(err);
            } finally {
                await connection.close();
            }
        });
    }

    /* LOGIN
    ** path: /auth/login
    ** method: POST
    */
    async login(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        console.log(`Email: ${email} | Password: ${password}`);
        connection.connect().then(async (db) => {
            try {
                const user = await User.findByEmail(db, email);
                console.log(typeof user);
                bcrypt.compare(password, user.password, (err, result) => {
                    if (err) {
                        console.error(err);
                    } else {
                        if (result) {
                            const token = Auth.createJWTToken(email);
                            res.cookie('token', token, {
                                httpOnly: true,
                                secure: false, 
                                sameSite: 'strict', 
                                maxAge: 3600000, 
                            });
                            console.log('Login successful');
                            res.redirect('/posts')
                        } else {
                            console.log('Login failed');
                            res.send('<script>alert("Đăng nhập thất bại !"); window.location.href = "/user/login";</script>');
                        }
                    }
                });
            } catch (err) {
                console.error(err);
            }
        });
    }


    /* LOGOUT
    ** path: /auth/logout
    ** method: GET or POST
    */
    logout(req, res) {
        res.clearCookie('token');
        console.log('Logout successful');
        res.redirect('/user/login');
    }

    
}


export default new AuthController();