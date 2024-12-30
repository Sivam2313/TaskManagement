import { Box, Paper, Stack, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { getDetails, getTable } from '../../api/getDetails';
import PendingTask from './PendingTask';
import TableSection from './TableSection';

const Dashboard = () => {
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(30);
  const [pendingTasks, setPendingTasks] = useState(70);
  const [totalLapsedTime, setTotalLapsedTime] = useState(0);
  const [totalTimeToFinish, setTotalTimeToFinish] = useState(0);
  const [avgTimeToFinish, setAvgTimeToFinish] = useState(0);
  const [pendingTasksPercent, setPendingTasksPercent] = useState(0);
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    getDetails().then((data) => {
      setTotalTasks(data.totalTasks);
      if(data.completedTasks === 0 || data.totalTasks === 0)
        setCompletedTasks(0);
      else
        setCompletedTasks(Math.floor((data.completedTasks*100)/data.totalTasks));
      if(data.pendingTasks === 0 || data.totalTasks === 0)
        setPendingTasks(0);
      else  
        setPendingTasksPercent(Math.floor((data.pendingTasks/data.totalTasks)*100));
      setPendingTasks(data.pendingTasks);
      setTotalLapsedTime(data.totalLapsedTime);
      setTotalTimeToFinish(data.totalTimeToFinish);
      setAvgTimeToFinish(data.avgTimeToFinish);
    })
    .catch((err) => {
      console.log(err);
    });

    getTable().then((data) => {
      console.log(data);
      setTableData(data);
    }).catch((err) => {
      console.log(err);
    });
  }, [])
  const taskTitles = [
    {
      "title":'Total Task',
      "percent":false,
      "value":totalTasks
    },
    {
      "title":'Task Completed',
      "percent":true,
      "color" : "#00D084",
      "value":completedTasks
    },
    {
      "title":'Task Pending',
      "percent":true,
      "color" : "#EB144C",
      "value":pendingTasksPercent
    },
    {
      "title":'Average Time per Completed Task',
      "percent":false,
      "value":avgTimeToFinish
    }
  ];
  const pendingTaskTitles = [
    {
      "title":'Task Pending',
      "percent":false,
      "value":pendingTasks
    },
    {
      "title":'Total Lapsed Time',
      "percent":false,
      "value":totalLapsedTime
    },
    {
      "title":'Total Time to Finish',
      "percent":false,
      "value":totalTimeToFinish
    }
  ]
  const columns = [
    { field: 'priority', headerName: 'Task Priority', width: 70 },
    { field: 'pendingTasks', headerName: 'Pending Tasks', width: 130 },
    { field: 'totalLapsedTime', headerName: 'Time Lapsed (hrs)', width: 130 },
    { field: 'totalTimeToComplete', headerName: 'Time to Finish (hrs)', width: 130 },
  ];
  return (
    <Box sx={{'display': 'flex', 'flexDirection': 'column', 'height': '85vh', 'width':"80vw", 'paddingLeft':'10vw', 'marginTop': '10vh'}}>
        <Box>
          <PendingTask titles={taskTitles} />
        </Box>
        <Box sx={{marginTop:'30px'}}>
          <PendingTask  titles={pendingTaskTitles} />
        </Box>
        <Box sx={{marginTop:'30px'}}>
          <TableSection columns={columns} rows={tableData} />
        </Box>
    </Box>
  )
}

export default Dashboard