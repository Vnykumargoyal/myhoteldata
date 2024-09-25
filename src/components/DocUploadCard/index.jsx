/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@material-ui/core';
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';

import useStyles from './style';
// import useHotelContext from '../../hooks/useHotelContext';
import Image from '../Image';
import ConditionalRender from '../ConditionalRender';
import IMAGE_URLS from '../../constants/images';
import { routes } from '../../routes/constant';

const DocUploadCard = ({ containerClass, item }) => {
  const classes = useStyles();
  const router = useHistory();
  // const { data } = useHotelContext();

  const handleRedirectToUpload = (item) => {
    if (item?.document_category === 'Individual KYC') {
      router.replace({
        pathname: routes.kyc.nonGst,
        state: {
          data: item,
        },
      });
    } else if (item?.document_category === 'Business KYC') {
      router.replace({
        pathname: routes.kyc.businessIntro,
        state: {
          data: item,
        },
      });
    } else if (item?.document_category === 'Banking & GST Proofs') {
      router.replace({
        pathname: routes.kyc.bankingAndGST,
        state: {
          data: item,
        },
      });
    } else if (item?.document_category === 'Existing Loan Details') {
      router.replace({
        pathname: routes.kyc.existingLoanDetails,
        state: {
          data: item,
        },
      });
    }
  };

  const subCategery = (ele) => {
    return (
      ele.map((it) => {
        return `${it}, `;
      })
    );
  };
  return (
    <Box mt={1} mb={1}>
      <div
        className={clsx(containerClass, classes.cont)}
      >
        <div className={classes.sectionFirst}>
          <Typography component="p" className={classes.docTitle}>
            {item?.document_category}
          </Typography>
          <Typography component="p" className={classes.docSubTitle}>
            {/* {item?.document_sub_category} */}
            {subCategery(item?.document_sub_category)}
          </Typography>
        </div>
        <div className={classes.sectionSecond}>
          <ConditionalRender
            condition={item?.status === 'ACCEPTED'}
            truthyComponent={(
              <div className={classes.mainCard}>
                <div className={classes.docuplod}>
                  <Typography component="p" className={classes.docuplodText}>
                    {item?.status?.charAt(0) + item.status.slice(1).toLowerCase()}
                  </Typography>
                </div>
                <Image source={IMAGE_URLS.ICONS.RIGHT_ARROW} height={10} width={10} />
              </div>
            )}
          />
          <ConditionalRender
            condition={item?.status === 'PENDING'}
            truthyComponent={(
              <div className={classes.mainCard} onClick={() => handleRedirectToUpload(item)}>
                <div className={classes.docPend}>
                  <Typography component="p" className={classes.docPendText}>
                    {item?.status?.charAt(0) + item.status.slice(1).toLowerCase()}
                  </Typography>
                </div>
                <Image source={IMAGE_URLS.ICONS.RIGHT_ARROW} height={10} width={10} />
              </div>
            )}
          />
          <ConditionalRender
            condition={item?.status === 'REJECTED'}
            truthyComponent={(
              <div className={classes.mainCard} onClick={() => handleRedirectToUpload(item)}>
                <div className={classes.docRejected}>
                  <Typography component="p" className={classes.docRejectedText}>
                    {item?.status?.charAt(0) + item.status.slice(1).toLowerCase()}
                  </Typography>
                </div>
                <Image source={IMAGE_URLS.ICONS.RIGHT_ARROW} height={10} width={10} />
              </div>
            )}
          />
          <ConditionalRender
            condition={item?.status === 'UPLOADED'}
            truthyComponent={(
              <div className={classes.mainCard} onClick={() => handleRedirectToUpload(item)}>
                <div className={classes.docuplod}>
                  <Typography component="p" className={classes.docuplodText}>
                    {item?.status?.charAt(0) + item.status.slice(1).toLowerCase()}
                  </Typography>
                </div>
                <Image source={IMAGE_URLS.ICONS.RIGHT_ARROW} height={10} width={10} />
              </div>
            )}
          />
          <ConditionalRender
            condition={item?.status === 'PARTIAL_REJECTED'}
            truthyComponent={(
              <div className={classes.mainCard} onClick={() => handleRedirectToUpload(item)}>
                <div className={classes.docRejected}>
                  <Typography component="p" className={classes.docRejectedText}>
                    Rejected
                  </Typography>
                </div>
                <Image source={IMAGE_URLS.ICONS.RIGHT_ARROW} height={10} width={10} />
              </div>
            )}
          />
        </div>
      </div>
    </Box>
  );
};

DocUploadCard.propTypes = {
  containerClass: PropTypes.string,
  item: PropTypes.arrayOf(PropTypes.object),
};

DocUploadCard.defaultProps = {
  containerClass: '',
  item: [],
};

export default DocUploadCard;
