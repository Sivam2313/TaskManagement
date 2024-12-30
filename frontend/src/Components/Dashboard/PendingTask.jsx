import React from 'react'
import InfoCard from './InfoCard'
import { Stack } from '@mui/material'

const PendingTask = ({titles}) => {
  return (
      <Stack direction='row' spacing={2}>
          {
              titles.map((elem, index) => (
                  <InfoCard key={index} val={elem.value} title={elem.title} percent={elem.percent} color={elem.color}/>
              ))
          }
      </Stack>  
  )
}

export default PendingTask