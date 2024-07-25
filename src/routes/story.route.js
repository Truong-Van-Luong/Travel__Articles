import express from "express"; // step 1
import storyController from "../app/controllers/StoryController.js";  // step 3

const router = express.Router(); // step 2

router.get('/:id', storyController.show); // localhost:3000/story/101
router.get('/', storyController.index); // localhost:3000/story/

export default router;