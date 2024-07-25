import postRouter from './post.route.js';
import taskRouter from './task.route.js';
import siteRouter from './site.route.js';
import meRouter from './me.route.js';
import storyRouter from './story.route.js';
import Auth from '../app/helpers/Auth.js';
import authRouter from './auth.route.js';
import userRouter from './user.route.js';


const route = (app) => {
  app.use('/story', storyRouter);
  app.use('/user', userRouter);
  app.use('/auth', authRouter);
  app.use('/posts',Auth.verifyJWTToken, postRouter);
  app.use('/tasks', taskRouter);
  app.use('/me', meRouter);
  app.use('/', siteRouter);
};

export default route;
