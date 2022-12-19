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

export default function CreateEmployee(props) {
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
    enumService.getDepartments()
        .then((result) => setDepartments(result.data));
    
    enumService.getLevels()
        .then((result) => setLevels(result.data));

    enumService.getTiers()
        .then((result) => setTiers(result.data));

    enumService.getTitles()
        .then((result) => setTitles(result.data));
  }, []);
  
  const handleChange = (event) => {
    const {name, value} = event.target;
    console.log(employee);
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
    employeeService.createEmployee(employee)
    .then(() => alertAndNavigate("Çalışan başarıyla oluşturuldu", "success", true))
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

  return (
    <div className="main-content">
      <form onSubmit={handleSubmit}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <h1 style={{ textAlign: "start" }}>Kayıt ol</h1>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="firstname"
                name="firstname"
                label="İsim"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="lastname"
                name="lastname"
                label="Soyisim"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id="email"
                name="email"
                label="E-posta adresi"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <DesktopDatePicker
                id="birthdate"
                name="birthdate"
                label="Doğum günü"
                inputFormat="DD-MM-YYYY"
                value={employee.birthdate}
                onChange={(nValue) => handleChange({target:{name:'birthdate', value: nValue}})}
                renderInput={(params) => <TextField {...params} />}
              />{" "}
            </Grid>

            <Grid item xs={12}></Grid>

            <Grid item xs={4}>
              <TextField fullWidth id="salary" name="salary" label="Maaş" type={"number"} onChange={handleChange}/>
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
                  required
                  onChange={handleChange}
                >
                {levels.map((levelName, index) => (
                  <MenuItem key={index} value={levelName}>{levelName}</MenuItem>
                ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={4}>
              <DesktopDatePicker
                label="İşe başlama tarihi"
                inputFormat="DD-MM-YYYY"
                value={employee.startWorkDate}
                onChange={(nValue) => handleChange({target:{name:'startWorkDate', value: nValue}})}
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
                  required
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
                  required
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
                  required
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

            <Grid item xs={12}></Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="addressLine"
                name="addressLine"
                label="Adres"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth id="city" name="city" label="Şehir" onChange={handleChange}/>
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth id="country" name="country" label="Ülke" onChange={handleChange}/>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="postcode"
                name="postcode"
                label="Posta Kodu"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="phoneNumber"
                name="phoneNumber"
                label="Telefon Numarası"
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
