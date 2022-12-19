import { Box, Tab} from '@mui/material'
import {TabPanel, TabList, TabContext} from '@mui/lab'
import React, {useEffect} from 'react'
import Overtime from '../components/Overtime';
import Expense from '../components/Expense';
import Leave from '../components/Leave';
import { lime } from '@mui/material/colors';

export default function MainContent(props) {
  const [value, setValue] = React.useState("1");
  const totalPageItem = 5;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setTimeout(() => {
      props.clearAlert();
    }, 5000)
  }, []);

  const toStringFromDate = (msg) => {
    let newFormat = msg.toString().replace( /(\d{4})(\d{2})(\d{2})/, "$1/$2/$3" ).split(",");
    newFormat = newFormat[2] + "/" + newFormat[1] + "/" + newFormat[0]
    return newFormat;
  }
  

  return (

    <TabContext value={value} >
  <Box sx={{ borderBottom: 1, borderColor: 'divider'}} className="main-content">
  <h1 style={{ textAlign: "start" }}>Anasayfa</h1>
    <TabList onChange={handleChange} >
    <Tab label="GEÇMİŞ HARCAMALAR" value="1" />
    <Tab label="GEÇMİŞ İZİNLER" value="2" />
      <Tab label="GEÇMİŞ MESAİLER" value="3" />
    </TabList>
  <Box sx={{background: lime[200]}}>
  <TabPanel value="1">{<Expense employeeId={props.employeeId} totalPageItem={totalPageItem} addAlert={props.addAlert} 
      toStringFromDate={toStringFromDate}
  />}</TabPanel>
  <TabPanel value="2">{<Leave employeeId={props.employeeId} totalPageItem={totalPageItem} addAlert={props.addAlert}
      toStringFromDate={toStringFromDate}
  />}</TabPanel>
  <TabPanel value="3">{<Overtime employeeId={props.employeeId} totalPageItem={totalPageItem} addAlert={props.addAlert}
      toStringFromDate={toStringFromDate}
  />}</TabPanel>
  </Box>
  
    </Box>

</TabContext>
    )
}
