import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Grid,
  TextField,
} from "@mui/material";
import React from "react";
import LeaveService from "../components/service/LeaveService";

export default function CreateLeave(props) {
    const navigate = useNavigate();

    let [leave, setLeave] = React.useState({
      type: '',
      startDate: new Date(),
      endDate: new Date(),
      description: '',
      employeeId: props.employeeId
    });
    
    const handleChange = (event) => {
      const {name, value} = event.target;
      console.log(leave);
      setLeave(prevState => {
        return {
        ...prevState,
        [name]: value
      };
    });
    }
    const handleSubmit = event => {
      event.preventDefault();
      let leaveService = new LeaveService();
      leaveService.createLeave(leave)
      .then(() => alertAndNavigate("İzin başarıyla oluşturuldu", "success", true))
      .catch((error) => {
        let message = typeof error.response.data === 'string' ? error.response.data : Object.values(error.response.data)[0]

        console.log(error)
        console.log(error.response)
        console.log(error.response.data)
        alertAndNavigate(message, "error", false);
      });
    }

    const alertAndNavigate = (message, type, isSuccess) => {
      let notBlankMessage = message === "about:blank" ? "Geçersiz tarih" : message;
      props.addAlert(notBlankMessage, type);
      isSuccess && navigate("/");
    }
  
    
    return (
      <div className="main-content">
        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <h1 style={{ textAlign: "start" }}>İzin Oluştur</h1>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="type"
                  name="type"
                  label="İzin tipi"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={3}>
                <DesktopDatePicker
                  label="Başlangıç tarihi"
                  inputFormat="DD-MM-YYYY"
                  disableMaskedInput
                  value={leave.startDate}
                  onChange={(nValue) => handleChange({target:{name:'startDate', value: nValue}})}
                  renderInput={(params) => <TextField {...params} />}
                />{" "}
              </Grid>

              <Grid item xs={3}>
                <DesktopDatePicker
                  label="Bitiş tarihi"
                  inputFormat="DD-MM-YYYY"
                  value={leave.endDate}
                  onChange={(nValue) => handleChange({target:{name:'endDate', value: nValue}})}
                  renderInput={(params) => <TextField {...params} />}
                />{" "}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="İzin Açıklaması"
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