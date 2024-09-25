import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  dropZone: {
    borderColor: theme.palette.primary.main,
    border: '2px dotted',
    backgroundColor: theme.palette.primary.lightGreen,
    borderRadius: '10px',
  },
  image_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: '10px 0',
    '& div': {
      display: 'flex',
      alignItems: 'center',
      flex: '1 1 auto',
      overflow: 'hidden',
    },
    '& div span': {
      marginLeft: '10px',
      fontSize: '14px',
    },
  },
  previewText: {
    fontSize: '16px',
    color: theme.palette.primary.light,
    margin: '10px 0',
  },
  image: {
    height: '28px',
    width: '24px',
    flex: '0 0 auto',
  },
  deleteIcon: {
    flex: '0 0 auto !important',
    cursor: 'pointer',
    '& svg': {
      height: '20px',
      width: '20px',
    },
  },
  fileName: {
    display: 'block',
    alignItems: 'flex-start',
    overflow: 'hidden',
    width: 'calc(100% - 22px)',
    textOverflow: 'ellipsis',
  },
  fileSize: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start !important',
    padding: '0 0',
    flex: '1 1 auto',
    overflow: 'hidden',
  },
}));
export default useStyles;
