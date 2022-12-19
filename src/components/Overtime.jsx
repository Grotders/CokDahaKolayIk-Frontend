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
import React, { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import OvertimeService from "./service/OvertimeService";
import { Link } from "react-router-dom";

export default function Overtime(props) {
  let [page, setPage] = useState(1);
  const [overtimes, setOvertimes] = useState([]);

  useEffect(() => {
    let overtimeService = new OvertimeService();
    overtimeService
      .getOvertimes(props.employeeId, page)
      .then((result) => setOvertimes(result.data));
  }, [props.employeeId, page]);

  const handleChangePage = (event, thisPage) => {
    setPage(thisPage);
    let overtimeService = new OvertimeService();
    overtimeService
      .getOvertimes(props.employeeId, thisPage)
      .then((result) => setOvertimes(result.data));
  };

  const handleDelete = (id) => {
    let overtimeService = new OvertimeService();
    overtimeService.deleteOvertime(id);
    setOvertimes(overtimes.filter((overtime) => overtime.id !== id));
    props.addAlert("Mesai başarıyla silindi.");
  };

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">ID</TableCell>
            <TableCell>Acıklama</TableCell>
            <TableCell>Süre(Saat)</TableCell>
            <TableCell>Mesai Tarihi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {overtimes.map((overtime, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {(page - 1) * props.totalPageItem + index + 1}
              </TableCell>
              <TableCell>{overtime.description}</TableCell>
              <TableCell>{overtime.amountOvertime}</TableCell>
              <TableCell>
                {props.toStringFromDate(overtime.overtimeDate)}
              </TableCell>
              <TableCell>
                <Button
                  component={Link}
                  to={`/mesai/${overtime.id}`}
                  color="secondary"
                >
                  <EditIcon />
                </Button>
              </TableCell>
              <TableCell>
                <Button onClick={() => handleDelete(overtime.id)} color="error">
                  <CloseIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        sx={{ marginTop: 2 }}
        count={10}
        page={page}
        color="primary"
        onChange={handleChangePage}
      />
    </TableContainer>
  );
}
