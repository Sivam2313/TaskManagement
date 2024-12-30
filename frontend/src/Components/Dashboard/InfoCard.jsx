import { Box, CircularProgress, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import React from 'react'
import SemiCircleProgressBar from "react-progressbar-semicircle";

const InfoCard = ({val,title, percent,color}) => {
    console.log(val,title, percent);
  return (
    <Paper elevation={1} sx={{'padding': '10px', 'width': '20vw', 'minWidth': '300px', 'height': '18vh', 'padding':'15px','display':'flex','alignItems':'center', 'flexFlow':'column'}}>
        <Box sx={{'marginBottom':"10px"}}>
            {
                percent?
                <SemiCircleProgressBar stroke={color} strokeWidth='15' diameter={200} percentage={val} showPercentValue />
                :<Typography variant='h4' sx={{'marginTop':'60px'}}>
                    {val}
                </Typography>
            }
        </Box>
        <Box>
            <Typography align='center' variant='h12' color='textSecondary'>
                {title}
            </Typography>
        </Box>
    </Paper>
  )
}

export default InfoCard