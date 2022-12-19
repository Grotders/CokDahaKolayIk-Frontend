import { Label } from "@mui/icons-material";
import {
  Box,
  TextField,
} from "@mui/material";
import React from "react";
import SidebarLink from "./SidebarLink";

export default function Sidebar(props) {
  return (
    <div>
      <Box
        lineHeight={5}
        sx={{
          padding: 5,
          width: 200,
          height: '90vh',
          backgroundColor: "primary.dark",
        }}
      >

<SidebarLink url={'/'} name='Ana sayfa'/>
<SidebarLink url={'/izin'} name='İzin oluştur'/>
<SidebarLink url={'/harcama'} name='Harcama oluştur'/>
<SidebarLink url={'/mesai'} name='Mesai oluştur'/>
<SidebarLink url={'/kayıt'} name='Kayıt oluştur'/>
<SidebarLink url={'/profil'} name='Profilim'/>
        <br />
          <TextField
            id="empId"
            type="number"
            value={props.employeeId}
            sx={{
              background: "white",
            }}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            onChange={props.changeId}
            variant="standard"
          />
      </Box>
    </div>
  );
}
