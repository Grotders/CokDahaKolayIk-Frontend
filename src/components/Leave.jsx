import {
    Table,
    TableHead,
    TableContainer,
    TableCell,
    TableRow,
    TableBody,
    Pagination,
    Button,
  } from "@mui/material";
  import React, {useEffect, useState} from "react";
  import CloseIcon from "@mui/icons-material/Close";
  import EditIcon from "@mui/icons-material/Edit";
import LeaveService from "./service/LeaveService";
import { Link } from "react-router-dom";

export default function Leave(props) {
  let [page, setPage] = useState(1);
  const [leaves, setLeaves] = useState([]); 

  useEffect(() => {
    let leaveService = new LeaveService();
    leaveService.getLeaves(props.employeeId, page)
        .then((result) => setLeaves(result.data));
  }, [props.employeeId, page]);

  const handleChangePage = (event, thisPage) => {
    setPage(thisPage)
    let leaveService = new LeaveService();
    leaveService.getLeaves(props.employeeId, thisPage)
        .then((result) => setLeaves(result.data));
  }

  const handleDelete = (id) => {
    let leaveService = new LeaveService();
    leaveService.deleteLeave(id);
    setLeaves(leaves.filter((leave) => leave.id !== id))
    props.addAlert("İzin başarıyla silindi.");
  } 

  

  return (
    <TableContainer
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell>İzin Türü</TableCell>
            <TableCell>İzin Miktarı</TableCell>
            <TableCell>İzin Başlangıç Tarihi</TableCell>
            <TableCell>İzin Bitiş Tarihi</TableCell>
            <TableCell>İzin Açıklaması</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaves.map((leave, index) => (
          <TableRow
              key={index}
          > 
          {}
            <TableCell component="th" scope="row">
                {((page-1) * props.totalPageItem) + index + 1}
                
              </TableCell>
            <TableCell>{leave.type}</TableCell>
            <TableCell>{leave.totalDay}</TableCell>
            <TableCell>{props.toStringFromDate(leave.startDate)}</TableCell>
            <TableCell>{props.toStringFromDate(leave.endDate)}</TableCell>
            <TableCell>{leave.description}</TableCell>
            <TableCell>
              <Button component={Link} to={`/izin/${leave.id}`} color="secondary">
              <EditIcon />
              </Button>
            </TableCell>
            <TableCell>
            <Button onClick={() => handleDelete(leave.id)} color="error" >
              <CloseIcon/>
              </Button>
            </TableCell>
          </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination sx={{marginTop:2}} count={10} page={page} color="primary" onChange={handleChangePage}/>

    </TableContainer>
)
}
