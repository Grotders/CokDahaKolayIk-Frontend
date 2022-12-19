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
import LeaveService from "../components/service/LeaveService";

export default function UpdateLeave(props) {
  let { leaveId } = useParams();
  const navigate = useNavigate();



    let [leave, setLeave] = React.useState({
      id: leaveId,
      type: '',
      startDate: new Date(),
      endDate: new Date(),
      description: '',
      employeeId: props.employeeId
    });

    React.useEffect(() => {
      let leaveService = new LeaveService();
      leaveService.getLeave(props.employeeId)
          .then((result) => setLeave(result.data));
    }, [props.employeeId]);

    const handleChange = (event) => {
      const {name, value} = event.target;
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
      leaveService.updateLeave(props.employeeId, leave)
      .then(() => alertAndNavigate("İzin başarıyla güncellendi.", "success", true))
      .catch((error) => {
        let message = Object.values(error.response.data)[0];
        console.log(error)
        console.log(error.response)
        console.log(error.response.data)
        alertAndNavigate(message, "error", false);
      });
    }

    const alertAndNavigate = (message, type, isSuccess) => {
      let notBlankMessage = message === "about:blank" ? "Boş alanları doldur" : message;
      props.addAlert(notBlankMessage, type);
      isSuccess && navigate("/");
    }

    console.log(leave);

    return (
      <div className="main-content">
        <form onSubmit={handleSubmit}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <h1 style={{ textAlign: "start" }}>İzin Güncelle (Id:{leaveId})</h1>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  id="type"
                  name="type"
                  label="İzin tipi"
                  onChange={handleChange}
                  value={leave.type}
                />
              </Grid>
              <Grid item xs={4}>
                <DesktopDatePicker
                  id="startDate"
                  name="startDate"
                  label="Başlangıç tarihi"
                  inputFormat="DD-MM-YYYY"
                  value={leave.startDate}
                  onChange={(nValue) => handleChange({target:{name:'startDate', value: nValue}})}
                  renderInput={(params) => <TextField {...params} />}
                />{" "}
              </Grid>

              <Grid item xs={4}>
                <DesktopDatePicker
                  id="endDate"
                  name="endDate"
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
                  value={leave.description}
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