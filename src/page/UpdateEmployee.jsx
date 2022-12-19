import { LocalizationProvider, DesktopDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";

import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";
import EmployeeService from "../components/service/EmployeeService";
import EnumService from "../components/service/EnumService";

export default function UpdateEmployee(props) {
  const navigate = useNavigate();

  let [employee, setEmployee] = React.useState({
    email: '',
    firstname: '',
    lastname: '',
    birthdate: new Date(),
    salary: 0.0,
    developerLevel: '',
    startWorkDate: new Date(),
    developerTitle: '',
    developerTier: '',
    department: '',
    phoneNumber: '',
    addressLine: '',
    city: '',
    country: '',
    postcode: ''
  });

  // all enums from backend for selection box
  let [departments, setDepartments] = React.useState([]);
  let [levels, setLevels] = React.useState([]);
  let [tiers, setTiers] = React.useState([]);
  let [titles, setTitles] = React.useState([]);

  React.useEffect(() => {
    let enumService = new EnumService();
    let employeeService = new EmployeeService();
    enumService.getDepartments()
        .then((result) => setDepartments(result.data));
    
    enumService.getLevels()
        .then((result) => setLevels(result.data));

    enumService.getTiers()
        .then((result) => setTiers(result.data));

    enumService.getTitles()
        .then((result) => setTitles(result.data));

    employeeService.getEmployee(props.employeeId)
        .then((result) => setEmployee(result.data));
  }
    
  , [props.employeeId]);
  
  const handleChange = (event) => {
    const {name, value} = event.target;
    setEmployee(prevState => {
      return {
      ...prevState,
      [name]: value
    };
  });
  console.log(employee);
  }
  const handleSubmit = event => {
    event.preventDefault();
    let employeeService = new EmployeeService();
    employeeService.updateEmployee(props.employeeId, employee)
    .then(() => alertAndNavigate("Çalışan başarıyla güncellendi", "success", true))
    .catch((error) => {
      let errorMessage = Object.values(error.response.data)[0];
      alertAndNavigate(errorMessage, "error", false);
    });
    
  }

  const alertAndNavigate = (message, type, isSuccess) => {
    let notBlankMessage = message === "about:blank" ? "Boş alanları doldur" : message;
    props.addAlert(notBlankMessage, type);
    isSuccess && navigate("/");
  }

  const handleDeleteEmployee = () => {
    let employeeService = new EmployeeService();
    let message = employeeService.deleteEmployee(props.employeeId);
    console.log(message);
    props.addAlert("Çalışan silindi");
    navigate("/");
  }

  return (
    <div className="main-content">
    {console.log(employee)}
    <Grid container>
    <Grid item xs={9}>
            <h1 style={{ textAlign: "start" }}>Profilim (Id:{props.employeeId})</h1>

            </Grid>
            <Grid item xs={3}>
            <Button
                color="error"
                variant="contained"
                fullWidth
                onClick={handleDeleteEmployee}
                sx={{ height: 55 }}
              >
                Çalışanı Sil
              </Button>
            </Grid>
    </Grid>
      <form onSubmit={handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Grid container spacing={3}>
            
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="firstname"
                name="firstname"
                label="İsim"
                value={employee.firstname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="lastname"
                name="lastname"
                label="Soyisim"
                value={employee.lastname}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="E-posta adresi"
                value={employee.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <DesktopDatePicker
                id="birthdate"
                name="birthdate"
                inputFormat="DD-MM-YYYY"
                label="Doğum günü"
                value={employee.birthdate}
                onChange={(nValue) => handleChange({target:{name:'birthdate', value: nValue.toISOString()}})}
                renderInput={(params) => <TextField {...params} />}
              />{" "}
            </Grid>

            <Grid item xs={12}>
            </Grid>

            <Grid item xs={4}>
              <TextField fullWidth id="salary" name="salary" label="Maaş" value={employee.salary} onChange={handleChange}/>
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="developerLevel-label">Ünvan</InputLabel>
                <Select
                  labelId="developerLevel-label"
                  id="developerLevel"
                  name="developerLevel"
                  value={employee.developerLevel ?? " "}
                  label="Ünvan"
                  onChange={handleChange}
                >
                {levels.map((levelName, index) => (
                  <MenuItem key={index} value={levelName}>{levelName} </MenuItem>
                ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <DesktopDatePicker
                label="İşe başlama tarihi"
                inputFormat="DD-MM-YYYY"
                value={employee.startWorkDate}
                onChange={(nValue) => handleChange({target:{name:'startWorkDate', value: nValue.toISOString()}})}
                renderInput={(params) => <TextField {...params} />}
              />
            </Grid>

            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="developerTitle-label">Rol</InputLabel>
                <Select
                  labelId="developerTitle-label"
                  id="developerTitle"
                  name="developerTitle"
                  value={employee.developerTitle ?? " "}
                  label="Rol"
                  onChange={handleChange}
                >
                {titles.map((titleName, index) => (
                  <MenuItem key={index} value={titleName}>{titleName}</MenuItem>
                ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="department-label">Departman</InputLabel>
                <Select
                  labelId="department-label"
                  id="department"
                  name="department"
                  value={employee.department ?? " "}
                  label="Departman"
                  onChange={handleChange}
                >
                {departments.map((departmentName, index) => (
                  <MenuItem key={index} value={departmentName}>{departmentName}</MenuItem>
                ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <InputLabel id="developerTier-label">Seviye</InputLabel>
                <Select
                  labelId="developerTier-label"
                  id="developerTier"
                  name="developerTier"
                  value={employee.developerTier ?? " "}
                  label="Seviye"
                  onChange={handleChange}
                >

                {tiers.map((tierName, index) => (
                  <MenuItem key={index} value={tierName}>{tierName}</MenuItem>
                ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="addressLine"
                name="addressLine"
                label="Adres"
                value={employee.addressLine}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth id="city" name="city" label="Şehir" value={employee.city} onChange={handleChange}/>
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth id="country" name="country" label="Ülke" value={employee.country} onChange={handleChange}/>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="postcode"
                name="postcode"
                label="Posta Kodu"
                value={employee.postcode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                label="Telefon Numarası"
                value={employee.phoneNumber}
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
