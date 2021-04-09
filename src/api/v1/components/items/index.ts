import express from "express";
import ItemsController from "./itemsController";

const router = express.Router();
router.post("/", express.json(), ItemsController.getItemsByQuery);

export interface Item {
  id: string,
  title: string,
  price: {
    currency: string,
    amount: number,
    decimals: number
  },
  picture: string,
  condition: string,
  free_shipping: boolean,
  state_name: string
}

export interface ItemsProps {
  author: {
    name: string,
    lastname: string
  },
  items: Item[],
  categories: string[],
  searchQuery: string
}

export interface ItemsDetailProps {
  item: Item,
  categories: string[],
}


export default router;