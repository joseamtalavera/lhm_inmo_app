import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import TablePagination from '@mui/material/TablePagination';
import { BoldTableCell } from '../../styles/OrdersStyles'; // added import

export default function Orders() {
  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/requests`);
        if (response.ok) {
          const data = await response.json();
          console.log('Data from fetchRequests:', data);
          setRequests(data);
          setTotalRequests(data.length);
        } else {
          console.error("Error fetching requests:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, []);

  const handleChangePage = (event, newPage) => {
    console.log('New Page:', newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRows = parseInt(event.target.value, 10);
    console.log('New Rows:', newRows);
    setRowsPerPage(newRows);
    setPage(0);
  };

  // Apply client-side pagination
  const displayedRequests = requests.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <React.Fragment>
      <Title>Solicitudes de Información</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <BoldTableCell>Referencia</BoldTableCell>
            <BoldTableCell>Nombre</BoldTableCell>
            <BoldTableCell>Email</BoldTableCell>
            <BoldTableCell>Teléfono</BoldTableCell>
            <BoldTableCell align="right">Fecha</BoldTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRequests && displayedRequests.length ? (
            displayedRequests.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.property_ref}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.telephone}</TableCell>
                <TableCell align="right">
                  {new Date(row.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>No Requests Found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalRequests}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}