import axios from "axios";

let localhostURL = "http://localhost:8080";
let apiURL = "/api/v1/expenses";

export default class ExpenseService {

    createExpense(expense) {
        console.log("Create service")
        console.log(expense);
        return axios.post(localhostURL + apiURL, {
                type: expense.type,
                amount: expense.amount,
                receiptDate: new Date(expense.receiptDate),
                description: expense.description,
                employeeId: expense.employeeId
            })
    }

    getExpenses(id, page) {
        return axios.get(localhostURL + apiURL + "?employeeId=" + id + "&page=" + page);
    }

    getExpense(id) {
        return axios.get(localhostURL + apiURL + "/" + id);
    }

    updateExpense(id, expense) {
        console.log("Update service")
        console.log(expense)
        console.log(id);
        return axios.put(localhostURL + apiURL + "/" + expense.id, {
                type: expense.type,
                amount: expense.amount,
                receiptDate: expense.receiptDate,
                description: expense.description,
                employeeId: id
        })
    }

    deleteExpense(id) {
        return axios.delete(localhostURL + apiURL + "/" + id);
    }
}