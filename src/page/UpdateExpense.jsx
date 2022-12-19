import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import {useParams} from "react-router-dom";
import ExpenseService from "../components/service/ExpenseService";

export default function UpdateExpense(props) {
  let { expenseId } = useParams();
  const navigate = useNavigate();


    let [expense, setExpense] = React.useState({
      id: expenseId,
      type: '',
      amount: 0,
      receiptDate: new Date(),
      description: ''
    });
    

    React.useEffect(() => {
      let expenseService = new ExpenseService();
      expenseService.getExpense(expenseId)
          .then((result) => setExpense(result.data));
    }, [expenseId]);

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
      expenseService.updateExpense(props.employeeId, expense)
      .then(() => alertAndNavigate("Harcama başarıyla güncellendi.", "success", true))
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

    console.log(expense);
    return (
      <div className="main-content">
        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <h1 style={{ textAlign: "start" }}>Harcama Güncelle (Id:{expenseId})</h1>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="type"
                  name="type"
                  label="Harcama türü"
                  value={expense.type}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="amount"
                  name="amount"
                  label="Harcama miktarı"
                  value={expense.amount}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4}>
                <DesktopDatePicker
                  label="Fiş tarihi"
                  inputFormat="DD-MM-YYYY"
                  value={expense.receiptDate}
                  onChange={(nValue) => handleChange({target:{name:'receiptDate', value: nValue}})}
                  renderInput={(params) => <TextField {...params} />}
                />{" "}
              </Grid>
    
    
              <Grid item xs={12}>
                <br />
              </Grid>
    
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Harcama Açıklaması"
                  value={expense.description}
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
                  Güncelle
                </Button>
              </Grid>
            </Grid>
          </LocalizationProvider>
        </form>
      </div>
    );
    }