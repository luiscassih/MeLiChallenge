import express from 'express';
import ItemsController from './itemsController';

const router = express.Router();

router.get('/', ItemsController.getAllItems);
export default router;


export interface ItemsProps {
  items: string[],
  categories: string[],
  searchQuery: string
}