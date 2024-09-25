import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Hidden,
  Paper,
  Grid,
  Container,
  Snackbar,
  IconButton
} from '@material-ui/core';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import CloseIcon from '@material-ui/icons/Close';

import useStyles from './style';
import BackButton from '../BackButton';
import BottomSection from '../BottomSection';
import ConditionalWrapper from '../../components/ConditionalWrapper';
import { CTA_LABELS, HEADER_TITLE } from '../../constants';
import IMAGE_URLS from '../../constants/images';
import Image from '../../components/Image';
import Loader from '../../components/Loader';
import { IS_ENABLE_DEV_ERRORS } from '../../config/auth';
import GenericErrorModal from '../../components/GenericErrorModal';
import useHotelContext from '../../hooks/useHotelContext';
import { getPageID } from '../../helpers/functions';

const Wrapper = ({
  children,
  disableGutters,
  checkBoxesFields,
  allowedToContinue,
  onContinue,
  handleCheckBoxChange,
  checkBoxValues,
  bottomButtonLabel,
  fullWidth,
  buttonClass,
  texts,
  applyContainerOnBottom,
  disabledBottomSection,
  bottomSectionContainerClass,
  continueButtonVariant,
  loading,
  showContinue,
  panelClass,
  isSpaceBetween,
  checkBoxClassRoot,
  textContainerClass,
  disableBack,
  checkboxExpandTitles,
  pageId,
  bottomText,
}) => {
  const router = useHistory();
  const { data, updateContext } = useHotelContext();
  const pageID = useMemo(() => getPageID(pageId), [pageId]);
  const [isDevSnackbarOpen, setIsDevSnackbarOpen] = useState(false);
  const [isMsgSnackbarOpen, setIsMsgSnackbarOpen] = useState(false);
  const handleClose = () => {
    setIsDevSnackbarOpen(false);
    setIsMsgSnackbarOpen(false);
    updateContext({ devSnackbar: '', msgSnackbar: '' });
  };
  useEffect(() => {
    if (data.devSnackbar && data.devSnackbar.length > 0) {
      setIsDevSnackbarOpen(true);
    } else {
      setIsDevSnackbarOpen(false);
    }
    if (data.msgSnackbar && data.msgSnackbar.length > 0) {
      setIsMsgSnackbarOpen(true);
    } else {
      setIsMsgSnackbarOpen(false);
    }
  }, [data.devSnackbar, data.msgSnackbar]);
  const classes = useStyles({
    path: router?.location?.pathname === '',
  });

  return (
    <div className={classes.container}>
      <Grid container>
        {loading && <Loader />}
        <Hidden xsDown smDown>
          <Grid item xs>
            <Paper
              className={clsx(classes.paper, classes.right, classes.marginTop)}
              elevation={0}
            >
              <BackButton
                disableBack={disableBack}
                previousWorkflowState={data?.stage?.previousStageId}
                loading={loading}
              />
              <Image
                source={IMAGE_URLS.LOGOS.PINELABS_LOGO}
                alt={HEADER_TITLE}
                className={classes.brandImg}
              />
            </Paper>
          </Grid>
        </Hidden>
        <Grid id={pageID} item sm={12} xs={12} md={6} className={classes.spacing}>
          <div className={classes.mH_100}>
            <Paper
              className={clsx(
                classes.paper,
                classes.shadow,
                disableGutters && classes.noGutters,
                panelClass
              )}
            >
              <div
                className={clsx(
                  classes.mH_Inherit,
                  isSpaceBetween && 'justify-content-space-between'
                )}
              >
                {children}
                {!disabledBottomSection && (
                  <ConditionalWrapper
                    condition={applyContainerOnBottom}
                    wrapper={(wrapperChildren) => (
                      <Container className={bottomSectionContainerClass}>
                        {wrapperChildren}
                      </Container>
                    )}
                  >
                    <BottomSection
                      loading={loading}
                      checkBoxClassRoot={checkBoxClassRoot}
                      checkBoxes={checkBoxesFields}
                      allowedToContinue={allowedToContinue}
                      onContinue={onContinue}
                      handleChange={handleCheckBoxChange}
                      values={checkBoxValues}
                      label={bottomButtonLabel}
                      showContinue={showContinue}
                      fullWidth={fullWidth}
                      buttonClass={buttonClass}
                      texts={texts}
                      textContainerClass={textContainerClass}
                      continueButtonVariant={continueButtonVariant}
                      checkboxExpandTitles={checkboxExpandTitles}
                      pageId={pageId}
                      bottomText={bottomText}
                    />
                  </ConditionalWrapper>
                )}
              </div>
            </Paper>
          </div>
        </Grid>
        <Hidden xsDown smDown>
          <Grid item xs>
            <Paper
              className={clsx(
                classes.paper,
                disableGutters && classes.noGutters,
                // classes.shadow,
                classes.marginTop,
                classes.pL_10px
              )}
              elevation={0}
            />
          </Grid>
        </Hidden>
      </Grid>
      {IS_ENABLE_DEV_ERRORS && (
        <Snackbar
          open={isDevSnackbarOpen}
          onClose={handleClose}
          message={data.devSnackbar}
          action={(
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          )}
        />
      )}
      {data?.msgSnackbar && (
        <GenericErrorModal
          open={isMsgSnackbarOpen}
          message={data.msgSnackbar}
          onClose={handleClose}
        />
      )}
    </div>
  );
};
Wrapper.defaultProps = {
  disableGutters: false,
  checkBoxesFields: [],
  allowedToContinue: true,
  onContinue: () => {},
  handleCheckBoxChange: () => {},
  checkBoxValues: {},
  bottomButtonLabel: CTA_LABELS.CONTINUE,
  fullWidth: true,
  buttonClass: '',
  texts: [],
  applyContainerOnBottom: true,
  disabledBottomSection: false,
  bottomSectionContainerClass: '',
  continueButtonVariant: 'contained',
  loading: false,
  showContinue: true,
  panelClass: '',
  isSpaceBetween: true,
  checkBoxClassRoot: '',
  textContainerClass: '',
  disableBack: false,
  checkboxExpandTitles: {
    more: ' See More',
    less: ' See Less',
  },
  pageId: '',
  referralCode: false,
};

Wrapper.propTypes = {
  disableGutters: PropTypes.bool,
  checkBoxesFields: PropTypes.instanceOf(Array),
  allowedToContinue: PropTypes.bool,
  onContinue: PropTypes.func,
  handleCheckBoxChange: PropTypes.func,
  checkBoxValues: PropTypes.instanceOf(Object),
  bottomButtonLabel: PropTypes.string,
  fullWidth: PropTypes.bool,
  buttonClass: PropTypes.string,
  texts: PropTypes.instanceOf(Array),
  applyContainerOnBottom: PropTypes.bool,
  disabledBottomSection: PropTypes.bool,
  bottomSectionContainerClass: PropTypes.string,
  continueButtonVariant: PropTypes.string,
  loading: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
  showContinue: PropTypes.bool,
  panelClass: PropTypes.string,
  checkBoxClassRoot: PropTypes.string,
  textContainerClass: PropTypes.string,
  isSpaceBetween: PropTypes.bool,
  disableBack: PropTypes.bool,
  checkboxExpandTitles: PropTypes.objectOf(PropTypes.string),
  pageId: PropTypes.string,
  referralCode: PropTypes.bool,
};
export default Wrapper;
