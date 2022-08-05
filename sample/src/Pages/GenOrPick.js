import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './GenOrPick';

const GenOrPick = () => {
  return (
    <Box sx={{ '& button': { m: 5 } }}>
      
      <div className="gnpBtn">
        <Button variant="contained" size="large">
          Generate New
        </Button>
        <Button variant="contained" size="large">
          Pick Old One
        </Button>
      </div>
    </Box>
  );
}

export default GenOrPick;