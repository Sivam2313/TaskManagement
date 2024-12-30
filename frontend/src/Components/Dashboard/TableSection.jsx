import React from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const TableSection = ({coloumns,rows}) => {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));
      
      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
      }));
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Priority</StyledTableCell>
                        <StyledTableCell align="right">Pending Tasks</StyledTableCell>
                        <StyledTableCell align="right">Time Lapsed&nbsp;(hrs)</StyledTableCell>
                        <StyledTableCell align="right">Time to Finish&nbsp;(hrs)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <StyledTableRow key={row.priority}>
                            <StyledTableCell component="th" scope="row">
                                {row.priority}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.pendingTasks}</StyledTableCell>
                            <StyledTableCell align="right">{row.totalLapsedTime}</StyledTableCell>
                            <StyledTableCell align="right">{row.totalTimeToComplete}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TableSection