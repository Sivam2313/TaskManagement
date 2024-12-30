import { Box, Button, colors, FormControl, InputLabel, MenuItem, Paper, Select, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { taskList } from '../../api/taskList'
import TaskTable from './TaskTable'
import { DataGrid } from '@mui/x-data-grid'
import CreateTasks from './CreateTasks'
import { deletetask } from '../../api/tasks'
import EditTasks from './EditTasks'

const TaskList = () => {
    const [priority, setPriority] = useState(0)
    const [status, setStatus] = useState(0)
    const [taskData, setTaskData] = useState([])
    const [selectedRows, setSelectedRows] = useState([]);
    const [showCreateTask, setShowCreateTask] = useState(false)
    const [showEditTask, setShowEditTask] = useState(false)
    const [taskSelected, setTaskSelected] = useState({})
    const handleChangePriority = (event) => {
        setPriority(event.target.value);
    };
    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    }

    const handleDelete = () => {
        const formdata = {
            "taskIds": selectedRows
        }
        deletetask(formdata).then((data) => {
            // console.log(data);
            const formdata1 = {
                "priority": priority,
                "status": status
            }
            taskList(formdata1).then((data) => {
                setTaskData(data);
            }
            ).catch((err) => {
                console.log(err);
            })
        }).catch((err) => {
            console.log(err);
        });
    }

    function handleEdit(row){
        setTaskSelected(row);
        setShowEditTask(true);
    }

    useEffect(() => {
        const formdata = {
            "priority": priority,
            "status": status
        }
        taskList(formdata).then((data) => {
            setTaskData(data);
        }
        ).catch((err) => {
            console.log(err);
        })

    }, [priority, status, showCreateTask])

    const columns = [
        { field: '_id', headerName: 'ID', width: 130 },
        { field: 'name', headerName: 'Title', width: 130 },
        { field: 'priority', headerName: 'Priority', width: 130 },
        { field: 'startTime', headerName: 'Start Time', width: 130 },
        { field: 'endTime', headerName: 'End Time', width: 130 },
        { field: 'status', headerName: 'Status', width: 130,valueGetter: (value,row) => (value === 1) ? 'Pending' : 'Finished'},
        {
            field: 'Edit',
            headerName: 'Edit Tasks',
            width: 130,
            sortable: false,
            renderCell: (params) => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(params.row)}
                >
                    Edit
                </Button>
            )
        },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    return (
        <Box sx={{ 'display': 'flex', 'flexDirection': 'column', 'height': '85vh', 'width': "80vw", 'paddingLeft': '10vw', 'marginTop': '10vh' }}>
            <CreateTasks open={showCreateTask} setOpen={setShowCreateTask} />
            <EditTasks open={showEditTask} setOpen={setShowEditTask} task={taskSelected}/>
            <Stack direction='column' spacing={2}>
                <Box>
                    <Typography variant='h4'>Task List</Typography>
                </Box>
                <Box sx={{ 'display': 'flex', 'justifyContent': 'space-between' }}>
                    <Stack direction='row' spacing={2}>
                        <Button variant="contained" size='medium' onClick={(e) => setShowCreateTask(true)} color="success">Add Task</Button>
                        <Button variant="outlined" size='medium'  onClick={handleDelete} color="error">Delete Task</Button>
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="select-small-label">Priority</InputLabel>
                            <Select
                                labelId="select-small"
                                id="select-small"
                                value={priority}
                                label="Age"
                                onChange={handleChangePriority}
                                sx={{ width: '8vw', minWidth: '100px' }}
                            >
                                <MenuItem value={0}>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>1</MenuItem>
                                <MenuItem value={2}>2</MenuItem>
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={4}>4</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                            <InputLabel id="select-small-label">Status</InputLabel>
                            <Select
                                labelId="select-small"
                                id="select-small"
                                value={status}
                                label="Age"
                                onChange={handleChangeStatus}
                                sx={{ width: '8vw', minWidth: '100px' }}
                            >
                                <MenuItem value={0}>
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={1}>Pending</MenuItem>
                                <MenuItem value={2}>Finished</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Box>
                <TaskTable rows={taskData} columns={columns} selectedRows={selectedRows} setSelectedRows={setSelectedRows}/>
            </Stack>
        </Box>
    )
}

export default TaskList