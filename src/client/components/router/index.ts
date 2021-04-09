import express from 'express';
import items from "@/client/components/items";
import home from '@/client/components/home';

const router = express.Router();
router.use("/items", items);
router.use("/", home);

export default router;