import express from "express"
import { createUser, editUser, getSelectors, getUserById } from "../controllers/user.js";

const router = express.Router();

router.post("/users", createUser);
router.get("/selectors", getSelectors)
router.get("/users/:userId", getUserById)
router.put("/users/:userId", editUser)

export default router;