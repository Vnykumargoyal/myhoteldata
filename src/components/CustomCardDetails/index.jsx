import { Box, IconButton, Typography } from '@material-ui/core';
// import ArrowForwardIosIcon from '@material-ui/core/';
import { ArrowForward, ArrowForwardIos, ArrowForwardIosSharp } from '@material-ui/icons';
import React from 'react';
import useStyles from './style';
import color from '../../constants/colors';


const CustomCardDetails = ({
  title,
  handleChange,
  describe
}) => {
  const classes = useStyles();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 10px',
        border: '1px solid #dcdcdc',
        borderRadius: '8px',
        transition: 'box-shadow 0.3s ease',
        cursor: 'pointer',
        backgroundColor: '#fff',
        maxWidth: '600px',
        margin: '0px auto',
        '&:hover': {
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        },
      }}
      onClick={handleChange}
      mt={2}
      mb={2}
    >
      <Box>
        <Typography component="p" className={classes.heading}>
          {title}
        </Typography>
        <Typography component="p" className={classes.headingSub}>
          {describe}
        </Typography>
      </Box>
      <IconButton>
        <ArrowForwardIosSharp color={color.primary} sx={{ color: color.primary }} />
      </IconButton>
    </Box>
  );
};

export default CustomCardDetails;