import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react'
import styled from 'styled-components';
import GainersTableData from './GainersTableData';
import FilterSelector from '../Dashboard/FilterSelector';


const Gainersl = styled.div`
  height:100%;
`

const Gainers = () => {
  return (
    <div>
      <Gainersl>
        <Box>
          <Container maxWidth='xl'>
            <Grid container spacing={1}>
              <Grid item md={12}>
                <Box>
                  <Typography variant='h4' gutterBottom component='h4' fontWeight='400'>
                    Gainers
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box>
          <FilterSelector />
          <GainersTableData />
        </Box>
      </Gainersl>
    </div>
  )
}

export default Gainers;