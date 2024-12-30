import { Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import { deletetask } from '../../api/tasks';

const TaskTable = ({rows,columns,setSelectedRows,selectedRows}) => {
    
    
    const handleSelection = (ids) => {
        // console.log(ids);
        
        setSelectedRows(ids);
    };

    

    const paginationModel = { page: 0, pageSize: 5 };
    return (
        <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row._id}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            onRowSelectionModelChange={(ids) => handleSelection(ids)}
            checkboxSelection
            sx={{ border: 0 }}
        />
        </Paper>
    )
}

export default TaskTable