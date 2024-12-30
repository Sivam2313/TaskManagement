import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createtask, editTask } from '../../api/tasks';

const EditTasks = ({open,setOpen,task}) => {
    const [name, setName] = useState(task.name);
    const [priority, setPriority] = useState(task.priority);
    const [startTime, setStartTime] = useState(task.startTime);
    const [endTime, setEndTime] = useState(task.endTime);
    const [status, setStatus] = useState(task.status);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePriority = (event) => {
        setPriority(event.target.value);
    };

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };

      const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '5px',

        boxShadow: 24,
        p: 4,
      };

    const handelSubmit = () => {
        const formdata = {
            "name": name,
            "priority": priority,
            "startTime": startTime,
            "endTime": endTime,
            "status": status,
            "taskId": task._id
        }
        editTask(formdata).then((data) => {
            handleClose();
        }).catch((err) => {
            console.log(err);
        })
    }
  return (
    <Modal
    open={open}
    onClose={handleClose}>
        <Box sx={{...style}}>
            <Stack spacing={3}> 
                <Typography variant='h4'>
                    Create Task
                </Typography>
                <Box>
                    <TextField id="outlined-basic" sx={{width:'100%'}} label="Title" onChange={(e)=>setName(e.target.value)} variant="outlined" />
                </Box>
                <Stack direction='row' spacing={2}>
                      <FormControl sx={{ minWidth: 120 }} size="small">
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
                      <FormControl sx={{ minWidth: 120 }} size="small">
                          <InputLabel id="select-small-label">Status</InputLabel>
                          <Select
                              labelId="select-small"
                              id="select-small"
                              value={status}
                              label="Age"
                              onChange={handleChangeStatus}
                              sx={{ width: '8vw', minWidth: '100px' }}
                          >
                              <MenuItem value={1}>
                                  <em>Pending</em>
                              </MenuItem>
                              <MenuItem value={2}>Finished</MenuItem>
                          </Select>
                      </FormControl>
                </Stack>
                <Stack direction='row' spacing={2}>
                    <DatePicker
                        selected={startTime}
                        onChange={(date) => setStartTime(date)}
                        showTimeSelect
                        timeFormat="HH:mm" 
                        timeIntervals={1}
                        timeCaption="Time"
                        dateFormat="yyyy/MM/dd h:mm aa" 
                        customInput={<TextField label="Start Time" variant="outlined" />}
                    />
                    <DatePicker
                        selected={endTime}
                        onChange={(date) => setEndTime(date)}
                        showTimeSelect
                        timeFormat="HH:mm" 
                        timeIntervals={1}
                        timeCaption="Time"
                        dateFormat="yyyy/MM/dd h:mm aa"
                        customInput={<TextField label="End Time" variant="outlined" />}
                    />
                </Stack>
                <Stack direction='row' spacing={2}>
                    <Button variant="contained" size='medium' color="success" onClick={handelSubmit}>Edit Task</Button>
                    <Button variant="outlined" size='medium' color="error" onClick={handleClose}>Cancel</Button>
                </Stack>
            </Stack>
        </Box>
    </Modal>
  )
}


export default EditTasks