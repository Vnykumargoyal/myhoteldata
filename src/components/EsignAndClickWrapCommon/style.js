/* eslint-disable max-len */
import { makeStyles } from '@material-ui/core';

import color from '../../constants/colors';

const useStyles = makeStyles((theme) => ({
  name: {
    fontSize: '18px',
    lineHeight: '21px',
    fontWeight: 400,
    fontFamily: 'Indivisible',
    color: theme.palette.secondary.main,
  },
  nameShow: {
    fontWeight: 700,
    fontFamily: 'Indivisible-Light',
  },
  heading: {
    marginTop: '10px',
    fontSize: '24px',
    lineHeight: '29px',
    fontWeight: 700,
    fontFamily: 'Indivisible-Light',
    color: theme.palette.primary.main,
  },
  education: {
    fontSize: '14px',
    lineHeight: '17px',
    fontWeight: 600,
    fontFamily: 'Indivisible-Light',
    color: theme.palette.secondary.main5,
    textAlign: 'center',
  },
  amountContainMain: {
    // background: 'linear-gradient(310.54deg, rgba(80, 211, 135, 0.2) 12.3%, rgba(197, 219, 66, 0.2) 83.23%);',
    borderRadius: '8px',
    backgroundColor: color.lightGreen1,
  },
  subContainer: {
    // backgroundImage: `url(${IMAGE_URLS.KYC_SCREEN.KYC_DONE_FRAME})`,
    // height: '180px',
    // maxHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px 0px 30px',
  },
  amount: {
    fontSize: '48px',
    fontWeight: 600,
    fontFamily: 'Indivisible',
    color: theme.palette.secondary.main,
    lineHeight: '58px',
  },
  linearSeparator: {
    width: '100%',
    height: '1px',
    maxWidth: '260px',
    background: 'linear-gradient(270deg, rgba(31, 215, 123, 0) 0%, #1FD77B 47.41%, rgba(31, 215, 123, 0) 102.21%)',
  },
  tenorContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '85%',
    marginTop: '15px',
  },
  rate: {
    fontFamily: 'Indivisible-Light',
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '14px',
    color: theme.palette.secondary.main,
  },
  renised: {
    fontSize: '12px',
    fontFamily: 'Indivisible',
    fontWeight: 500,
    color: theme.palette.secondary.main,
    opacity: '0.6',
    marginBottom: '10px',
  },
  rateAmount: {
    marginTop: '5px',
    fontFamily: 'Indivisible-Light',
    fontWeight: 700,
    color: theme.palette.secondary.main,
    position: 'relative',
    top: '5px',
  },
  btnClass: {
    fontSize: '14px',
    fontFamily: 'Indivisible-Light',
    fontWeight: 600,
    color: `${theme.palette.primary.main} !important`,
  },
}));

export default useStyles;
