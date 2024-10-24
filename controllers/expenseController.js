import Expense from '../models/Expense.js'

export const addExpense = async (req, res) => {
    //TODO: Show amount owed when adding an expense
    try {
        const { description, amount, date, splitMethod, participants } = req.body;
        const expense = await Expense.create({ description, amount, date, splitMethod, participants });
        res.status(201).json(expense);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const getUserExpense = async (req, res) => {
    try {
        console.log("Getting user id", req.user.id)
        const user = req.user.id
        const expense = await Expense.find({ 'participants.userId': user }); // this shoudl be correct
        console.log("expense", expense)
        if (!expense) {
            return res.status(400).json({ message: "Expense not found" })
        }
        res.status(200).json(expense);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const getAllExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
