import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import CrossIcon from '@material-ui/icons/Close';

// import useStyles from '../styles';
import ConditionalRender from '../ConditionalRender';
import useStyles from './style';
import { getBankName } from '../../helpers/functions';
// import ConditionalRender from '../../../../../../components/ConditionalRender';
// import { getBankName } from '../../../utils';

const SelectedBanks = ({
  list,
  onRemove,
  hideCount,
  maxLimit,
}) => {
  const classes = useStyles();

  const handleRemove = (removedBank) => {
    onRemove(list.filter((bank) => bank.institutionName !== removedBank.institutionName));
  };

  return (
    <ConditionalRender
      condition={list && list.length > 0}
      truthyComponent={(
        <Box className={classes.selectedBanksContainer}>
          <Box className="header">
            <Typography className="fs-12 fw-500 ff-indivisible-l" variant="caption">Selected Banks</Typography>
            <ConditionalRender
              condition={hideCount}
              truthyComponent={(
                <Typography className="count">
                  {`(${list.length}/${maxLimit})`}
                </Typography>
              )}
            />
          </Box>
          <Box className={classes.selecteBanksList}>
            {list.map((bank) => (
              <Box key={bank} className={classes.selectedBank}>
                <Typography className="fs-14 lh-17 fw-500 ff-indivisible-l">{getBankName(bank.value)}</Typography>
                <CrossIcon className="remove" onClick={() => handleRemove(bank)} />
              </Box>
            ))}
          </Box>
        </Box>
      )}
    />
  );
};

SelectedBanks.propTypes = {
  list: PropTypes.arrayOf(PropTypes.string).isRequired,
  onRemove: PropTypes.func.isRequired,
  hideCount: PropTypes.bool,
  maxLimit: PropTypes.number,
};

SelectedBanks.defaultProps = {
  hideCount: false,
  maxLimit: 5,
};

export default SelectedBanks;
