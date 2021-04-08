import express from 'express';
import items from './components/items';

const router = express.Router();
router.use('/items', items);

export default router;