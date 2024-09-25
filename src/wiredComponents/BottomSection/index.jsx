import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import {
  makeStyles,
  Typography,
  Container,
  Box
} from '@material-ui/core';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import parse from 'html-react-parser';

import ContinueButton from '../../components/Button';
import color from '../../constants/colors';
import { CTA_LABELS } from '../../constants';
import ReferralCodeModal from '../../components/ReferralCodeModal';
import useHotelContext from '../../hooks/useHotelContext';

const useStyles = makeStyles((theme) => ({
  fs12: {
    fontSize: '12px',
    cursor: 'pointer',
  },
  color: 'red',
  labelCheckbox: {
    fontSize: '14px',
    fontFamily: 'Indivisible-Light',
    fontWeight: 500,
    lineHeight: '120%',
    userSelect: 'none',
    color: theme.palette.secondary.main5,
    display: 'contents',
    pointerEvents: 'auto',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  pointersNone: {
    pointerEvents: 'none',
  },
  labelRoot: {
    alignItems: 'start',
    '& span.MuiCheckbox-root': {
      padding: '0 9px',
    },
  },
  mt_10p: {
    marginBottom: '10px',
    '& label': {
      display: 'flex',
    },
  },
  ml: {
    marginLeft: '5px',
  },
  contents: {
    display: 'contents',
  },
  needHelp: {
    fontSize: '0.875rem',
    fontWeight: 500,
    // margin: '0.75rem 0',
    fontFamily: 'Indivisible',
    color: `${theme.palette.primary.main} !important`,
    // opacity: 0.7,
  },
}));

const DEFAULT_LIMIT = 66;

const BottomSection = ({
  children,
  onContinue,
  allowedToContinue,
  handleChange,
  values,
  checkBoxes = [],
  label,
  fullWidth,
  buttonClass,
  texts,
  continueButtonVariant,
  showContinue,
  checkBoxClassRoot,
  textContainerClass,
  loading,
  checkboxExpandTitles,
  pageId,
  bottomText,
}) => {
  const classes = useStyles();
  const { more, less } = checkboxExpandTitles;
  const [referralCodeAdded, setreferralCodeAdded] = useState(false);
  const { data, updateContext } = useHotelContext();
  const handlereferralCodeClose = (value) => {
    setreferralCodeAdded(false);
    updateContext({
      ...data,
      // referralCodeValue: value || data.referenceCode,
      referralCodeValue: value || data.referralCodeValue || data?.referenceCode
    });
  };

  const GetLabel = (title, hasLongText = false, key = false, heading = '', substringLimit = DEFAULT_LIMIT) => {
    const [limit, setLimit] = useState(substringLimit);
    const [isExpanded, setIsExpanded] = useState(false);
    if (!hasLongText) return title;
    const handleLimit = (e) => {
      e.stopPropagation();
      if (key) {
        handleChange({
          target: {
            name: key,
            value: !values[key],
          },
        });
      }
      setIsExpanded((prev) => !prev);
      setLimit((lim) => (lim === substringLimit ? 9999 : substringLimit));
    };
    return (
      <>
        {heading && (
          <Typography
            variant="caption"
            className={clsx(classes.contents, 'fs-sm-12 fs-14 fw-700 col-text-primary-op5')}
          >
            {heading}
          </Typography>
        )}
        {parse(title.substring(0, limit))}
        {limit < 9999 && '...'}
        <Typography
          color="primary"
          component="span"
          size="small"
          className={clsx('fs-12 fw-600 ff-indivisible-l', classes.ml, classes.contents)}
          onClick={handleLimit}
        >
          &nbsp;
          {isExpanded ? less : more}
          &nbsp;
        </Typography>
      </>
    );
  };
  return (
    <div className={clsx(classes.mt_10p, checkBoxClassRoot)}>
      {children}
      {checkBoxes && checkBoxes?.map((e) => (
        <FormControlLabel
          key={e?.name}
          className={e?.class}
          classes={{
            label: classes.labelCheckbox,
            root: clsx(e.alignStart && classes.labelRoot, classes.pointersNone),
          }}
          style={{ color: color.secondary5 }}
          control={( // prettier-ignore
            <Checkbox // prettier-ignore
              checked={values?.[e?.value] || false}
              onChange={handleChange}
              color="primary"
              name={e.name}
              className="pointer-event-auto"
            />
            )} // prettier-ignore
          label={GetLabel(e?.label, e?.readMore, e?.value, e?.heading, e?.limit)}
        />
      ))}
      {texts && (
        <Container className={textContainerClass}>
          {texts?.map((e) => (
            <Typography
              key={e}
              variant="caption"
              className="fs-14 fs-sm-12 fw-b"
              // style={{ fontWeight: 'bold', color: color.secondary }}
            >
              {e}
            </Typography>
          ))}
        </Container>
      )}
      {showContinue && (
        <Box style={{ width: '85%', margin: 'auto' }} align="center">
          <ContinueButton
            hasLoading={loading}
            onClick={onContinue}
            disabled={!allowedToContinue}
            label={label}
            fullWidth={fullWidth}
            className={`${buttonClass} fs-14 fw-b mt-20 mb-20`}
            variant={continueButtonVariant}
            pageId={pageId}
          />
        </Box>
      )}
      {(bottomText) && (
        <Box mb={2} align="left">
          {bottomText}
        </Box>
      )}
      {(!bottomText) && (
         <Box mt={4} mb={2} align="left" />
      )}
    </div>
  );
};

BottomSection.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  checkBoxes: PropTypes.arrayOf(PropTypes.object),
  values: PropTypes.oneOfType([
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
    ),
    PropTypes.array
  ]),
  allowedToContinue: PropTypes.bool,
  handleChange: PropTypes.func,
  onContinue: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
  fullWidth: PropTypes.bool,
  label: PropTypes.string,
  texts: PropTypes.instanceOf(Array),
  continueButtonVariant: PropTypes.string,
  buttonClass: PropTypes.string,
  showContinue: PropTypes.bool,
  checkBoxClassRoot: PropTypes.string,
  textContainerClass: PropTypes.string,
  loading: PropTypes.bool,
  checkboxExpandTitles: PropTypes.objectOf(PropTypes.string),
  pageId: PropTypes.string,
  bottomText: PropTypes.string,
};

BottomSection.defaultProps = {
  checkBoxes: [],
  values: [],
  label: CTA_LABELS.CONTINUE,
  allowedToContinue: true,
  handleChange: () => {},
  fullWidth: true,
  texts: [],
  continueButtonVariant: 'contained',
  children: null,
  buttonClass: '',
  showContinue: true,
  checkBoxClassRoot: '',
  textContainerClass: '',
  loading: false,
  checkboxExpandTitles: {
    more: ' See More',
    less: ' See Less',
  },
  pageId: '',
  bottomText: '',
};

export default BottomSection;
