import express from "express"; // step 1
import postController from "../app/controllers/PostController.js";  // step 3

const router = express.Router(); // step 2

router.post('/store', postController.store); // localhost:3000/posts/store
router.get('/create', postController.create); // localhost:3000/posts/create
router.get('/:id', postController.detail); // localhost:3000/posts/101
router.get('/:id/edit', postController.edit); // localhost:3000/posts/id/edit
router.put('/:id', postController.update); // localhost:3000/posts/id/edit
router.delete('/:id', postController.delete); // localhost:3000/posts/id/delete
router.get('/', postController.index); // localhost:3000/posts/

export default router;
