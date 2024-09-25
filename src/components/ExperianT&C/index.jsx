import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

import TermsAndConditionsModal from './TermsAndConditionsModal';

const ExperianTAndC = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <>
      <Typography
        color="primary"
        variant="caption"
        onClick={(e) => {
          e.preventDefault();
          setShowPopup(true);
        }}
        className="fs-sm-12 fs-14 fw-500 ff-indivisible-l"
      >
        Experian Terms and Conditions.
      </Typography>
      <TermsAndConditionsModal open={showPopup} setOpen={setShowPopup} />
    </>
  );
};

export default ExperianTAndC;
