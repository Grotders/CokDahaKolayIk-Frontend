import {
  Table,
  TableHead,
  TableContainer,
  TableCell,
  TableRow,
  TableBody,
  Pagination,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import React, {useEffect, useState} from "react";
import ExpenseService from "./service/ExpenseService";
import { Link } from "react-router-dom";

export default function Expense(props) {
  let [page, setPage] = useState(1);
  let [expenses, setExpenses] = useState([]); 

  useEffect(() => {
    let expenseService = new ExpenseService();
    expenseService.getExpenses(props.employeeId, page)
        .then((result) => setExpenses(result.data));
  }, [props.employeeId, page]);

  const handleChangePage = (event, value) => {
    setPage(value)
    let expenseService = new ExpenseService();
    expenseService.getExpenses(props.employeeId, value)
        .then((result) => setExpenses(result.data));
  }

  const handleDelete = (id) => {
    let expenseService = new ExpenseService();
    expenseService.deleteExpense(id);
    expenseService.getExpenses(props.employeeId, page)
        .then((result) => setExpenses(result.data));
    props.addAlert("Harcama başarıyla silindi.");
  } 


  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell>Harcama Türü</TableCell>
            <TableCell>Harcama Miktarı</TableCell>
            <TableCell>Fiş Tarihi</TableCell>
            <TableCell>Harcama Açıklaması</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense, index) => (
          <TableRow
              key={index}
          >
            <TableCell component="th" scope="row">
                {((page-1) * props.totalPageItem) + index + 1}
              </TableCell>
            <TableCell>{expense.type}</TableCell>
            <TableCell>{expense.amount}</TableCell>
            <TableCell>{props.toStringFromDate(expense.receiptDate)}</TableCell>
            <TableCell>{expense.description}</TableCell>
            <TableCell>
              <Button component={Link} to={`/harcama/${expense.id}`} color="secondary">
              <EditIcon />
              </Button>
            </TableCell>
            <TableCell>
              <Button onClick={() => handleDelete(expense.id)} color="error">
              <CloseIcon/>
              </Button>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination sx={{marginTop:2}} count={10} page={page} color="primary" onChange={handleChangePage}/>

    </TableContainer>
  );
}
