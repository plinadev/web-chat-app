import express from "express";
import protectRoute from "../middlewares/protectRoute.js";
import { getConversations, getMessages, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

router.get("/conversations", protectRoute, getConversations);
router.get("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
