import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import ExpenseService from "../components/service/ExpenseService";

export default function CreateExpense(props) {

const navigate = useNavigate();

let [expense, setExpense] = React.useState({
  type: '',
  amount: 0,
  receiptDate: new Date(),
  description: '',
  employeeId: props.employeeId
});


const handleChange = (event) => {
  const {name, value} = event.target;
  setExpense(prevState => {
    return {
    ...prevState,
    [name]: value
  };
});
}
const handleSubmit = event => {
  event.preventDefault();
  let expenseService = new ExpenseService();
  expenseService.createExpense(expense)
  .then(() => alertAndNavigate("Harcama başarıyla oluşturuldu", "success", true))
  .catch((error) => {
    let message = Object.values(error.response.data)[0];
    alertAndNavigate(message, "error", false)
  });
}

const alertAndNavigate = (message, type, isSuccess) => {
  let notBlankMessage = message === "about:blank" ? "Boş alanları doldur" : message;
  props.addAlert(notBlankMessage, type);
  isSuccess && navigate("/");
}

return (
  <div className="main-content">
    <form onSubmit={handleSubmit}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <h1 style={{ textAlign: "start" }}>Harcama Oluştur</h1>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="type"
              name="type"
              label="Harcama türü"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="amount"
              name="amount"
              label="Harcama miktarı"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
          {/* Date Çalışmıyor */}
            <DesktopDatePicker
              label="Fiş tarihi"
              inputFormat="DD-MM-YYYY"
              value={expense.receiptDate}
              onChange={(nValue) => handleChange({target:{name:'receiptDate', value: nValue.toISOString()}})}
              renderInput={(params) => <TextField {...params} />}
            />{" "}
          </Grid>

          <Grid item xs={9}>
            <TextField
              fullWidth
              id="description"
              name="description"
              label="Harcama Açıklaması"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <Button
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
              sx={{ height: 55 }}
            >
              Oluştur
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </form>
  </div>
);
}