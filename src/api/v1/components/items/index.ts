import express from "express";
import ItemsController from "./itemsController";

const router = express.Router();

// These routes will start with /items
router.post("/", express.json(), ItemsController.getItemsByQuery);
router.post("/:id", express.json(), ItemsController.getItemById);

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

export interface ItemDetail {
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
  sold_quantity: number,
  description: string
}

export interface ItemsDetailProps {
  author: {
    name: string,
    lastname: string
  },
  item: ItemDetail,
  categories: string[],
}


export default router;