import express from 'express';
import ItemsController from './itemsController';

const router = express.Router();

router.get('/:id', ItemsController.getItemById);
router.get('/', ItemsController.getAllItems);
export default router;

export interface ItemsProps {
  items: string[],
  categories: string[],
  searchQuery: string
}

export interface ItemsDetailProps {
  item: any,
  categories: string[],
}

export interface Breadcrumb {
  title: string,
  link: string
}