import express from 'express';
import items from "@/client/components/items";
import home from '@/client/components/home';

const router = express.Router();
router.use("/", home);
router.use("/items", items);

export default router;