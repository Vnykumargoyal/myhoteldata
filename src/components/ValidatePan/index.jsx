/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
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

import Button from '../Button';
import Modal from '../Modal';
import useStyles from './style';
import Image from '../Image';
import { ALT_CONSTANTS, CTA_LABELS } from '../../constants';

const ValidatePan = ({
  open,
  setOpen,
  panNumber,
  handleContinue,
  data,
}) => {
  const classes = useStyles({ data });
  return (
    <Modal open={open} disableOutsideClose dialogClass={classes.dailogClass} style={{ padding: '0px' }} contentClass={classes.contentClass}>
      <Container className={classes.container}>
        <FormControl>
          <FormHelperText id="panNumber" className={clsx(classes.textStyle)}>
            {data.panTitle}
          </FormHelperText>
          <Input
            id="panNumber"
            autoComplete="off"
            color="secondary"
            disabled
            name="panNumber"
            rowsMax={2}
            value={panNumber}
            // prettier-ignore
            aria-describedby="panNumber"
            inputProps={{
              autoComplete: 'off',
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
            {data.title}
          </Typography>
          <div className="w-85">
            <Box mt={1} mb={1}>
              <Image
                source={data.image}
                alt={ALT_CONSTANTS.PAN}
              />
            </Box>
          </div>
          <Typography
            align="center"
            component="p"
            className={clsx(classes.marginStyle, classes.subTitle)}
          >
            {data.subTitle}
          </Typography>
          {data.leadBoolean && (
            <Typography
              align="center"
              component="p"
              className={clsx(classes.rejections)}
            >
              {data.lead}
            </Typography>
          )}
        </div>
        <div className="flex justify-content-center">
          <div className={clsx(classes.btnStyle, 'mt-10')}>
            <Button
              label={CTA_LABELS.CONTINUE}
              allowedToContinue
              hideHelp
              height="40px"
              onClick={() => handleContinue()}
            />
          </div>
          <div className={classes.btnStyle}>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={() => setOpen(false)}
              label={CTA_LABELS.EDIT_PAN}
              height="40px"
            />
          </div>
        </div>
      </Container>
    </Modal>
  );
};
ValidatePan.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleContinue: PropTypes.func.isRequired,
  panNumber: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ValidatePan;
