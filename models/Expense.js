import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    splitMethod: {
        type: String,
        enum: ['EQUAL', 'EXACT', 'PERCENTAGE'],
        required: true,
    },
    participants: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        amountOwed: {
            type: Number,
            required: function () {
                return this.splitMethod === 'EXACT';
            },
        },
        percentageOwed: {
            type: Number,
            required: function () {
                return this.splitMethod === 'PERCENTAGE';
            },
        },
    }],
}, {
    timestamps: true,
});

const Expense = mongoose.model('Expense', expenseSchema)
export default Expense