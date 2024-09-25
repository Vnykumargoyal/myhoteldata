/* eslint-disable no-confusing-arrow */
import { makeStyles } from '@material-ui/core';

import color from '../../constants/colors';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: ({ open }) => open ? 'block' : 'none',
    overflowY: 'hidden',
  },
  listItem: {
    padding: '20px 20px 10px !important',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start !important',
  },
  formLabel: {
    margin: '18px 0',
  },
  label: {
    color: theme.palette.secondary.main,
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '17px',
    fontFamily: 'Indivisible-Light',
  },
  noData: {
    display: 'block',
    marginBottom: '200px',
  },
  divider: {
    width: '95%',
    margin: 'auto',
  },
  header: {
    boxShadow: ` 0px -6px 30px 0px ${color.blackRus}`,
    position: 'sticky',
    top: 0,
  },
  containerWrapper: {
    background: color.white,
    paddingBottom: '1px',
    paddingRight: '9px',
    overflowY: ({ containerScroll }) => containerScroll ? 'auto' : 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  overflowBox: {
    // height: '100%',
    // overflowY: 'auto',
  },
  backgroundButton: {
    backgroundColor: ' rgba(0, 0, 0, 0.04)',
    height: '32px',
    width: '32px',
  },
  bottomSheetContainer: {
    background: color.white,
    position: 'absolute',
    width: '100%',
    height: ({ searchBarShow }) => searchBarShow ? 'auto' : 'auto',
    display: 'flex',
    flexDirection: 'column',
    maxHeight: ({ downSm }) => downSm ? 'calc(100vh - 5px)' : '600px',
    bottom: 0,
    borderRadius: '10px 10px 0 0',
    transition: 'all 1s ease',
    animation: 'slides-upto-max 0.7s ease',
  },
  item: {
    padding: '10px 0 !important',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    color: theme.palette.secondary.main,
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '17px',
    fontFamily: 'Indivisible-Light',
  },
  bankSearch: {
    margin: '20px 10px 10px',
    width: 'calc(100% - 30px)',
    fontSize: '1rem',
    paddingBottom: '5px',
  },
  dividerHeader: {
    width: '35%',
    position: 'relative',
    top: '5px',
    margin: 'auto !important',
    height: '3px !important',
    borderRadius: '44px',
    backgroundColor: color.gray85,
  },
  title: {
    color: theme.palette.secondary.main,
    fontFamily: 'Indivisible-Light',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '17px',
    marginTop: '15px',
  },
  btnClass: {
    marginBottom: '25px',
    fontSize: '14px',
    lineHeight: '17px',
    fontWeight: 600,
    fontFamily: 'Indivisible',
    color: theme.palette.text.white,
    position: 'relative',
    width: '100%',
    padding: '13px 0px',
  },
  containerSpacing: {
    position: 'relative',
    bottom: '20px',
  },
  height: {
    // height: '385px',
    // overflowY: 'auto',
  },
  subTitel: {
    color: theme.palette.secondary.main5,
    fontFamily: 'Indivisible-Light',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '17px',
    marginTop: '10px',
  },
}));

export default useStyles;
