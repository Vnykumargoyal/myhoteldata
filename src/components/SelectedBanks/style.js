import { makeStyles } from '@material-ui/core';

import color from '../../constants/colors';

// import color from '../../../../../constant/colors';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
  searchField: {
    padding: '12px 20px',
    boxSizing: 'border-box',
    background: color.white,
    border: `1px solid ${color.grey}`,
    borderRadius: '15px',
    '& img': {
      marginRight: theme.spacing(1.5),
      width: theme.spacing(2),
      height: theme.spacing(2),
    },
  },
  searchInput: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    fontWeight: 500,
    fontFamily: 'Indivisible-Light',
    paddingBottom: '6px',
  },
  selectedBanksContainer: {
    margin: '18px 0 0',
    '& .header': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      '& > .count': {
        fontWeight: 600,
        fontSize: '0.75rem',
        lineHeight: '150%',
      },
    },
  },
  selecteBanksList: {
    display: 'flex',
    alignItems: 'center',
    overflowX: 'auto',
    overflowY: 'hidden',
    width: '100%',
    marginTop: theme.spacing(1.25),
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  selectedBank: {
    padding: '12px 11px 12px 16px',
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    background: 'rgba(80, 211, 135, 0.2)',
    borderRadius: '20px',
    margin: '0 16px 0 0',
    '& > p': {
      width: 'max-content',
    },
    '& .remove': {
      height: '16px',
      width: '16px',
      marginLeft: '15px',
      padding: '2px',
      boxSizing: 'border-box',
      cursor: 'pointer',
    },
  },
  scroll: {
    '&::-webkit-scrollbar-thumb': {
      background: `${color.grey}80`,
      borderRadius: '50px',
    },
  },
  labelCheckbox: {
    fontSize: '0.875rem',
    lineHeight: '1.0625rem',
    fontWeight: 500,
    fontFamily: 'Indivisible-Light',
    marginLeft: '5px',
  },
  root: {
    marginBottom: '15px',
  },
}));

export default useStyles;
