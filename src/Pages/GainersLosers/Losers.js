import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react'
import styled from 'styled-components';
import LosersTableData from './LosersTableData';
import FilterSelector from '../Dashboard/FilterSelector';


const Losersl = styled.div`
  height:100%;
`

const Losers = () => {
  return (
    <div>
      <Losersl>
        <Box>
          <Container maxWidth='xl'>
            <Grid container spacing={1}>
              <Grid item md={12}>
                <Box>
                  <Typography variant='h4' gutterBottom component='h4' fontWeight='400'>
                    Losers
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Box>
          <FilterSelector />
          <LosersTableData />
        </Box>
      </Losersl>
    </div>
  )
}

export default Losers;