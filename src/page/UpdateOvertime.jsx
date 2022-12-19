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
import OvertimeService from "../components/service/OvertimeService";

export default function UpdateOvertime(props) {
  let { overtimeId } = useParams();
  const navigate = useNavigate();

  let [overtime, setOvertime] = React.useState({
    id: overtimeId,
    overtimeDate: new Date(),
    description: '',
    amountOvertime: 0.0,
    employeeId: props.employeeId
  });

  React.useEffect(() => {
    let overtimeService = new OvertimeService();
    overtimeService.getOvertime(props.employeeId)
        .then((result) => setOvertime(result.data));
  }, [props.employeeId]);

  const handleChange = (event) => {
    const {name, value} = event.target;
    setOvertime(prevState => {
      return {
      ...prevState,
      [name]: value
    };
  });
  }
  const handleSubmit = event => {
    event.preventDefault();
    let overtimeService = new OvertimeService();
    overtimeService.updateOvertime(props.employeeId, overtime)
    .then(() => alertAndNavigate("Mesai başarıyla güncellendi.", "success", true))
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

    console.log(overtime);

    return (
      <div className="main-content">
        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <h1 style={{ textAlign: "start" }}>Mesai Güncelle (Id:{overtimeId})</h1>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="amountOvertime"
                  name="amountOvertime"
                  label="Mesai miktarı"
                  onChange={handleChange}
                  value={overtime.amountOvertime}
                />
              </Grid>
              <Grid item xs={4}>
                <DesktopDatePicker
                  label="Mesai tarihi"
                  inputFormat="DD-MM-YYYY"
                  value={overtime.overtimeDate}
                  onChange={(nValue) => handleChange({target:{name:'overtimeDate', value: nValue}})}
                  renderInput={(params) => <TextField {...params} />}
                />{" "}
              </Grid>
    
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="description"
                  name="description"
                  label="Harcama Açıklaması"
                  onChange={handleChange}
                  value={overtime.description}
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
