/* eslint-disable object-curly-newline */
/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from 'react-router-dom';
import { Container, Typography } from '@material-ui/core';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import useStyles from './style';
import AgreementPopup from './AgreementPopup';
import useCRUD from '../../../../hooks/useCRUD';
import Image from '../../../../components/Image';
import { routes } from '../../../../routes/constant';
import IMAGE_URLS from '../../../../constants/images';
import Wrapper from '../../../../wiredComponents/Wrapper';
import { LOS_SERVICE } from '../../../../api/webServiceUrl';
import { CONSTANTS, CTA_LABELS } from '../../../../constants';
import { getCheckBoxes } from '../../PersonalDetails/utils/default';
import useHotelContext from '../../../../hooks/useHotelContext';
import ConditionalRender from '../../../../components/ConditionalRender';
import { getLenderName, renderParsedHTML } from '../../../../helpers/functions';
import { verifyAddresslInfo } from '../../PersonalDetails/AddressInfo/components/utils/default';

const ApplicationDeclined = () => {
  const router = useHistory();
  const classes = useStyles();
  const [showAgreementPopup, setShowAgreementPopup] = useState(false);
  const {
    data: {
      previousAllocatedLender, // LENDER X
      lenderName, // Lender Y
      customerJourneyId,
      address,
      stage,
    },
    data,
    updateContext,
  } = useHotelContext();

  const [currentAddress, setCurrentAddress] = useState({
    addressLineOne: '',
    addressLineTwo: '',
    state: '',
    pincode: '',
    city: '',
    country: 'India',
    addressType: 'CURRENT',
  });

  const [businessAddress, setBusinessAddress] = useState({
    addressLineOne: '',
    addressLineTwo: '',
    pincode: '',
    city: '',
    state: '',
    addressType: 'BUSINESS',
  });

  useEffect(() => {
    if (address && address.length) {
      const current = address.filter((item) => item.addressType === 'CURRENT')[0];
      const business = address.filter((item) => item.addressType === 'BUSINESS')[0];
      if (current) {
        const { addressLine1, addressLine2, pincode, city, state } = current;
        setCurrentAddress((prev) => ({
          ...prev,
          addressLineOne: addressLine1,
          addressLineTwo: addressLine2,
          pincode,
          city,
          state,
        }));
      }
      if (business) {
        const { addressLine1, addressLine2, pincode, city, state } = business;
        setBusinessAddress((prev) => ({
          ...prev,
          addressLineOne: addressLine1,
          addressLineTwo: addressLine2,
          pincode,
          city,
          state,
        }));
      }
    }
  }, [address]);

  const [createLead, createLeadResponse, creatingLead, error] = useCRUD({
    type: 'create',
    url: `${LOS_SERVICE}${customerJourneyId}/create-lender-lead`,
  });

  useEffect(() => {
    if (error) updateContext({ msgSnackbar: error });
  }, [error]);

  const callCreateLead = useCallback(() => {
    if (!creatingLead) {
      if (showAgreementPopup) setShowAgreementPopup(false);
      createLead({
        data: verifyAddresslInfo(
          { IS_TREM_CHECKBOXES: true },
          currentAddress,
          businessAddress,
          data
        ),
      });
    }
  }, [creatingLead, currentAddress, businessAddress, data, showAgreementPopup]);

  useEffect(() => {
    if (createLeadResponse && createLeadResponse.success && createLeadResponse.data) {
      updateContext({
        ...createLeadResponse.data,
        stage: { ...stage, previousStageId: -1 },
      });
      router.replace(routes.redirect);
    }
  }, [createLeadResponse]);

  const [lenderX, lenderY] = useMemo(() => {
    let lastAllocatedLender = '';
    if (previousAllocatedLender && previousAllocatedLender.length) {
      [lastAllocatedLender] = previousAllocatedLender.slice(-1);
    }
    return [getLenderName(lastAllocatedLender), getLenderName(lenderName)];
  }, [previousAllocatedLender, lenderName]);

  const handleContinue = useCallback(() => {
    if (!lenderY) return;
    const isConsentRequired = getCheckBoxes(lenderName).length > 0;
    if (isConsentRequired) {
      setShowAgreementPopup(true);
    } else callCreateLead();
  }, [setShowAgreementPopup, callCreateLead, lenderY]);

  return (
    <Wrapper
      disableBack
      loading={creatingLead}
      allowedToContinue={Boolean(lenderY)}
      bottomButtonLabel={CTA_LABELS.CONTINUE}
      onContinue={handleContinue}
    >
      <Container className={classes.container}>
        <Typography className={classes.exclamation}>{CONSTANTS.OOPS}</Typography>
        <Typography className={classes.heading}>{CONSTANTS.LOAN_APPLICATION_DENIED}</Typography>
        <Typography className={classes.subHeading}>
          {renderParsedHTML(CONSTANTS.APPLICATION_DECLINED_WITH_X(lenderX))}
        </Typography>
        <Image source={IMAGE_URLS.ERRORS.APPLICATION_DECLINED} />
        <Typography className={classes.description}>
          {CONSTANTS.NOT_MEET_CRITERIA}
          <ConditionalRender
            condition={Boolean(lenderY)}
            truthyComponent={(
              <Typography>{renderParsedHTML(CONSTANTS.PLEASE_EXPLORE_WITH_Y(lenderY))}</Typography>
            )}
          />
        </Typography>
        <AgreementPopup open={showAgreementPopup} lender={lenderName} onAgree={callCreateLead} />
      </Container>
    </Wrapper>
  );
};

export default ApplicationDeclined;
