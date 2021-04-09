import express from 'express';
import HomeController from './homeController';

const router = express.Router();

router.get('/', HomeController.getHome);
router.get('/404', HomeController.getNotFound);
router.get('*', (_, res: express.Response) => res.status(404).redirect("/404"));

export default router;