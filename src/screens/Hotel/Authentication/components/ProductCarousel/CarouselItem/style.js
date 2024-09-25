import { makeStyles } from '@material-ui/core';

import color from '../../../../../../constants/colors';

const useStyles = makeStyles((theme) => ({
  carouselItem: {
    background: color.whiteSmoke,
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.12)',
    borderRadius: '20px',
    height: '260px',
    width: '320px',
    padding: '10px 15px',
    boxSizing: 'border-box',
  },
  primaryTitle: {
    fontWeight: 700,
    fontFamily: 'Indivisible-Bold',
    fontSize: '1.5rem',
    lineHeight: '1.8125rem',
    color: theme.palette.primary.main,
    marginTop: '12px',
    filter: 'drop-shadow(0px 3px 20px rgba(0, 0, 0, 0.12))',
  },
  primarySubTitle: {
    fontWeight: 500,
    fontFamily: 'Indivisible-Light',
    fontSize: '0.8125rem',
    lineHeight: '1rem',
    color: theme.palette.secondary.main,
    margin: 'auto',
    marginTop: '10px',
    maxWidth: '195px',
  },
  description: {
    maxWidth: '80%',
    margin: 'auto',
    marginTop: theme.spacing(1),
    filter: 'drop-shadow(0px 3px 20px rgba(0, 0, 0, 0.12))',
  },
  secondaryTitle: {
    fontWeight: 700,
    fontFamily: 'Indivisible-Light',
    fontSize: '1rem',
    lineHeight: '1.1875rem',
    color: theme.palette.secondary.main,
  },
  secondarySubTitle: {
    fontWeight: 500,
    fontFamily: 'Indivisible-Light',
    fontSize: '0.8125rem',
    lineHeight: '1rem',
    color: theme.palette.secondary.main,
    marginTop: '10px',
  },
  secondaryImage: {
    marginTop: '-35px',
    minHeight: '205px',
  },
  primaryImage: {
    minHeight: '120px',
    margin: ({ primaryImageMargin }) => primaryImageMargin || 'auto',
  },
}));

export default useStyles;
