/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  // prettier-ignore
  Box,
  Typography,
  Container,
  FormControl,
  FormHelperText,
  Input
} from '@material-ui/core';
import clsx from 'clsx';

import { ALT_CONSTANTS, CONSTANTS, CTA_LABELS } from '../../constants';
import Image from '../Image';
import IMAGE_URLS from '../../constants/images';
import useStyles from './style';
import Button from '../Button';
import Modal from '../Modal';
import { routes } from '../../routes/constant';

const ValidateGST = ({
  open,
  setOpen,
  data,
  handleContinue,
}) => {
  const classes = useStyles();
  const router = useHistory();
  return (
    <Modal open={open} disableOutsideClose dialogClass={classes.dailogClass} style={{ padding: '0px' }} contentClass={classes.contentClass}>
      <Container className={classes.container}>
        <FormControl>
          <FormHelperText id="panNumber" className={classes.textStyle}>
            Entered GST number
          </FormHelperText>
          <Input
            id="gstNumber"
            autoComplete="off"
            color="secondary"
            disabled
            name="gstNumber"
            rowsMax={2}
            value={data.gstNumber}
            // prettier-ignore
            aria-describedby="panNumber"
            inputProps={{
              className: clsx(classes.styleClass),
            }}
          />
        </FormControl>
        <div>
          <Typography
            align="center"
            component="p"
            className={clsx(classes.marginStyle)}
          >
            {CONSTANTS.GST_VALIDATE_HEADING}
          </Typography>
          <Typography
            align="center"
            component="p"
            className={clsx(classes.panNumber, 'fs-20 fs-sm-18 lh-25 col-text-secondary fw-600 ff-indivisible-l w-85-auto')}
          >
            {data.gstNumber?.slice(2, 12)}
          </Typography>
          <Typography
            align="center"
            component="p"
            className={clsx(classes.marginStyle)}
          >
            {CONSTANTS.GST_VALIDATE_SUBHEADING}
          </Typography>
          <div>
            <Box mt={2} mb={2}>
              <Image
                source={IMAGE_URLS.PAN_SCREEN.PAN_WITH_P}
                alt={ALT_CONSTANTS.GST_CHECK_NO}
              />
            </Box>
          </div>
        </div>
        <div className="flex justify-content-center">
          <div className={clsx(classes.btnStyle, 'mt-10')}>
            <Button
              label={CTA_LABELS.CONTINUE}
              allowedToContinue
              hideHelp
              height="40px"
              onClick={handleContinue}
            />
          </div>
          <div className={classes.btnStyle}>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={() => setOpen(false)}
              label={CTA_LABELS.EDIT_GST}
              height="40px"
            />
          </div>
        </div>
      </Container>
    </Modal>
  );
};
ValidateGST.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleContinue: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ValidateGST;
