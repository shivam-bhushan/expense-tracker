import express from "express";
import { verifyRoute } from "../middleware/verifyRoute.js";
import { addExpense, getAllExpenses, getUserExpense } from "../controllers/expenseController.js";

export const router = express.Router();

router.post('/', verifyRoute, addExpense);
router.get('/user', verifyRoute, getUserExpense);
router.get('/', verifyRoute, getAllExpenses);

