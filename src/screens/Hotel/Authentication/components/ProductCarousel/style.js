import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  carouselContainer: {
    '& .rec-carousel-wrapper .rec-pagination button.rec-dot': {
      width: '23px',
      height: '5px',
      background: theme.palette.primary.main,
      borderRadius: '20px',
      opacity: 0.3,
      boxShadow: 'none',
      '&.rec-dot_active': {
        opacity: 1,
      },
    },
    '& .rec-item-wrapper': {
      padding: '5px !important',
    },
  },
}));

export default useStyles;
