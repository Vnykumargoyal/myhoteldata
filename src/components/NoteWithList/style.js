/* eslint-disable no-confusing-arrow */
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  aboutPnach: {
    fontWeight: '400 !important',
    fontFamily: 'Indivisible-Light',
    fontSize: '12px !important',
    lineHeight: '18px !important',
    color: `${theme.palette.secondary.main} !important`,
    opacity: '0.5 !important',
    textAlign: 'left !important',
  },
  aboutContainer: {
    padding: '5px 8px !important',
  },
  aboutBank: {
    marginBottom: ({ listIconImgDisable }) => listIconImgDisable ? '10px' : '0px',
  },
  imgSize: {
    paddingRight: '15px !important',
    maxHeight: '15px !important',
    maxWidth: '15px !important',
    minWidth: '0px !important',
    marginTop: '3px !important',
  },
}));

export default useStyle;
