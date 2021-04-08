import express from 'express';
import HomeController from './homeController';

const router = express.Router();

router.get('/', HomeController.getHome);

export default router;