import express from 'express';
import siteController from '../app/controllers/SiteController.js';

const router = express.Router();

router.use('/about', siteController.about);
router.use('/search', siteController.search);
router.get('/', siteController.indexPosts);
router.use('/', siteController.index);

export default router;
