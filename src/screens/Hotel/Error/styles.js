import { makeStyles } from '@material-ui/core';

const useErrorStyles = makeStyles((theme) => ({
  error: {
    textAlign: 'center',
    '& .oops': {
      fontFamily: 'Indivisible-Bold',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '24px',
      lineHeight: '29px',
      color: theme.palette.primary.main,
    },
  },
  error_sub_title: {
    fontSize: '0.875rem',
    fontWeight: '600',
    marginTop: '10px',
    lineHeight: '17px',
    width: ({ width }) => width || '100%',
  },
  error_msg: {
    textAlign: 'center',
    margin: '0 auto',
    lineHeight: '140%',
    fontWeight: '600',
    width: '85%',
    [theme.breakpoints.down('sm')]: {
      fontWeight: '400',
    },
  },
  error_img: {
    margin: '0px auto',
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
    height: '260px',
  },
  desc: {
    textAlign: 'center',
    fontSize: '0.875rem',
    marginTop: '5px',
  },
  m_0_auto: {
    margin: '0 auto',
    textAlign: 'center',
  },
}));

export default useErrorStyles;
