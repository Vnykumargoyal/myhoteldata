import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.up('md')]: {
      height: '100%',
    },
    // height: '100vh',
    maxHight: '100vh',
    marginBottom: '20px',
  },
  error: {
    textAlign: 'center',
    marginTop: '20px',
    '& .oops': {
      fontFamily: 'Indivisible-Light',
      fontStyle: 'normal',
      fontWeight: 700,
      fontSize: '24px',
      lineHeight: '29px',
      color: theme.palette.primary.main,
      margin: 'auto',
    },
  },
  error_sub_title: {
    fontSize: '0.875rem',
    fontWeight: '700',
    marginTop: '10px',
    lineHeight: '17px',
  },
  error_msg: {
    textAlign: 'center',
    margin: '20px auto',
    lineHeight: '140%',
    fontWeight: '600',
    fontSize: '14px',
    color: theme.palette.secondary.main,
    width: '90%',
    [theme.breakpoints.up('md')]: {
      fontSize: '16px',
    },
  },
  error_img: {
    margin: '20px auto',
    // width: '250px',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
    //   width: '200px',
    //   height: '200px',
    },
    // height: '150px',
  },
  desc: {
    textAlign: 'center',
    fontSize: '0.875rem',
    marginTop: '5px',
    // fontWeight: '700',
  },
  play_img: {
    width: '40%',
    margin: '0 auto',
  },
  m_0_auto: {
    margin: '0 auto',
  },
  btnClass: {
    background: `${theme.palette.text.orange} !important`,
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '17px',
    color: theme.palette.text.white,
  },
  btnColor: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '17px',
    color: theme.palette.secondary.main,
    borderColor: theme.palette.secondary.main,
  },
  logout: {
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '17px',
    color: theme.palette.text.white,
  },
}));

export default useStyles;
