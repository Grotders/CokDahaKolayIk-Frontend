import React, { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import MainContent from "./MainContent";
import { Alert, Grid } from "@mui/material";
import CreateEmployee from "./CreateEmployee";
import CreateExpense from "./CreateExpense";
import CreateOvertime from "./CreateOvertime";
import CreateLeave from "./CreateLeave";
import { Route, Routes } from "react-router-dom";
import "../components/component.css"
import UpdateExpense from "./UpdateExpense";
import UpdateLeave from "./UpdateLeave";
import UpdateOvertime from "./UpdateOvertime";
import UpdateEmployee from "./UpdateEmployee";

export default function MainPage() {
  let [employeeId, setEmployeeId] = useState(1);

  let [alert, setAlert] = useState({
    isShown: false,
    message: "bos",
    type: 'success'
  })

  const changeEmployeeId = (event) => {
    console.log(event.target.value)
    setEmployeeId(event.target.value);
    console.log(employeeId)
  }

  const clearAlert = () => {
    setAlert({
      isShown: false,
      message: "bos",
      type: 'success'
    });
  }

  const addAlert = (message, type) => {
    console.log(type + " " + message)
    setAlert({
      isShown: true,
      message: message,
      type: type
    });
  }




  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Sidebar employeeId={employeeId} changeId={changeEmployeeId}/>
      </Grid>
      <Grid item xs={9}>
      {console.log(alert)}
      {alert.isShown && <Alert sx={{marginTop:1}} severity={alert.type}>{alert.message}</Alert>} 

      <Routes >
        <Route exact path="/" element={<MainContent employeeId={employeeId} clearAlert={clearAlert} addAlert={addAlert} alert={alert}/>} />

        <Route exact path="/harcama" element={<CreateExpense employeeId={employeeId} addAlert={addAlert}/>} />
        <Route path="/harcama/:expenseId" element={<UpdateExpense employeeId={employeeId} addAlert={addAlert} />} />


        <Route exact path="/izin" element={<CreateLeave employeeId={employeeId} addAlert={addAlert}/>} />
        <Route exact path="/izin/:leaveId" element={<UpdateLeave employeeId={employeeId} addAlert={addAlert}/>} />

        <Route exact path="/mesai" element={<CreateOvertime employeeId={employeeId} addAlert={addAlert}/>} />
        <Route exact path="/mesai/:overtimeId" element={<UpdateOvertime employeeId={employeeId} addAlert={addAlert}/>} />

        <Route exact path="/kayıt" element={<CreateEmployee employeeId={employeeId} addAlert={addAlert}/>} />
        <Route exact path="/profil" element={<UpdateEmployee employeeId={employeeId} addAlert={addAlert}/>} />
        
      </Routes>
      </Grid>
    </Grid>
  );
}
