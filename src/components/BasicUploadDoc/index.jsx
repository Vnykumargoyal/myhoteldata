/* eslint-disable */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-len */
/* eslint-disable no-else-return */
/* eslint-disable space-infix-ops */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable array-callback-return */
/* eslint-disable react/forbid-prop-types */

import React, { useEffect, useState } from 'react';
import {
  Box,
  IconButton,
  Typography
} from '@material-ui/core';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import PropTypes, { object } from 'prop-types';

import useStyles from './style';
import { bytesToSize } from '../../helpers/functions';
import FileSizeExceed from '../FileSizeExceed';
import BasicDropZone from '../BasicDropZone';
import Image from '../Image';
import IMAGE_URLS from '../../constants/images';
import { CTA_LABELS, INPUT_CONSTANTS } from '../../constants';
import { DOC_UPLOAD_MAX_SIZE } from '../../config';
import ConditionalRender from '../ConditionalRender';

const BasicUploadDoc = ({
  label,
  name,
  updateFiles,
  defaultFile,
  link,
  showIconOnly,
  handleDelDoc,
  getAllStatus,
  uploadToPendingSection,
  bankStatementUploaded,
  hideBottomSection,
}) => {
  const classes = useStyles({ label });
  const [files, setFiles] = useState([]);
  const [regListOpen, setRegListOpen] = useState('none');
  const [limitExceeded, setLimitExceeded] = useState(false);
  const DropAreaComponentAdd = () => (
    <div className={classes.drop_area}>
      <div className="browse">Upload</div>
    </div>
  );

  const DropAreaForPreview = () => {
    return (
      <>
        <ConditionalRender
          condition={getAllStatus?.status?.toLowerCase() === 'uploaded' && !uploadToPendingSection}
          truthyComponent={(
            <div className={classes.del}>
              <div>
                <Image source={previewUpload()} alt="preview" />
              </div>
              <Box ml={1}>
                <IconButton
                  size="small"
                  onClick={() => handleDelDoc(getAllStatus?.docGroupId, getAllStatus?.document_category, getAllStatus?.subCategoryName)}
                >
                  <Image source={IMAGE_URLS.ICONS.DEL} alt="preview" />
                </IconButton>
              </Box>
            </div>
          )}
        />
        <ConditionalRender
          condition={(getAllStatus?.status?.toLowerCase() !== 'accepted' && getAllStatus?.status?.toLowerCase() !== 'uploaded') || uploadToPendingSection}
          truthyComponent={(
            <div>
              <div
                className={clsx(classes.image_container, 'flex')}
              >
                <div className={classes.uploadPreview}>
                  <img
                    className={clsx(classes.image)}
                    height={32}
                    width={23}
                    src={previewUpload()}
                    alt="preview"
                  />
                </div>
                <div
                  className={classes.deleteIconWithCross}
                  onClick={() => updateFiles(null, name)}
                >
                  <img
                    height={12}
                    width={12}
                    src={IMAGE_URLS.ICONS.CROSS}
                    alt="delete"
                  />
                </div>
              </div>
            </div>
          )}
        />
      </>
    );
  };

  const DropAreaForPreviewOnlyAccepted = () => {
    return (
      <ConditionalRender
        condition={getAllStatus?.status?.toLowerCase() === 'accepted'}
        truthyComponent={(
          <div>
            <Image source={previewUpload()} alt="preview" />
          </div>
        )}
      />
    );
  };

  useEffect(() => {
    if (files) {
      updateFiles(files, name);
    }
  }, [files]); 
  const removeFile = (file) => () => {
    files.splice(files.indexOf(file), 1);
    setFiles([...files]);
    updateFiles(file, name);
  };

  const ShowUploadButton = () => {
    if (showIconOnly) {
      return <DropAreaComponentAdd />;
    } else if (defaultFile?.path || bankStatementUploaded) {      
      return <DropAreaForPreview />;
    } else if ((defaultFile && defaultFile.length > 1)) {
      return <DropAreaForPreview />;
    } else if (link) {
      return (
        <Link to={link} className="upload">
          <DropAreaComponentAdd />
        </Link>
      );
    } else if (!showIconOnly && !link) {
      return (
        <BasicDropZone
          className={classes.dropZoneAdd}
          showPreviews={false}
          showFileNamesInPreview={false}
          isIconCross={false}
          dropAreaComponent={<DropAreaComponentAdd />}
          hideDropzoneIfHasData={false}
          defaultFiles={files}
          setDefaultFiles={setFiles}
          getSelectedFiles={fileAdded}
          updateFiles={updateFiles}
          name={name}
          accept=".pdf,.PDF, .jpg, .JPG, .jpeg, .JPEG, .png, .PNG"
        />
      );
    }
  };

  const ShowUploadButtonForStatus = () => {
    if (getAllStatus?.status?.toLowerCase() === 'accepted') {
      return <DropAreaForPreviewOnlyAccepted />;
    } else if ((getAllStatus?.status?.toLowerCase() === 'pending' || uploadToPendingSection)) {
      return ShowUploadButton();
    } else if (getAllStatus?.status?.toLowerCase() === 'uploaded' && !uploadToPendingSection) {
      return <DropAreaForPreview />;
    } else if (getAllStatus?.status?.toLowerCase() === 'rejected') {
      return ShowUploadButton();
    }
  };

  useEffect(() => {
    let sum;
    let total = 0;
    if (files[0]?.length) {
      total = 0;
      files[0]?.map((item) => {
        total +=item.size;
      });
      if (total > DOC_UPLOAD_MAX_SIZE) {
        setLimitExceeded(true);
      }
    } else {
      sum = files
        .map((item) => item.size)
        .reduce((prev, curr) => prev + curr, 0);
      if (sum > DOC_UPLOAD_MAX_SIZE) {
        // pushClevertapEvent(CLEVERTAP_EVENTS.GS.GST_DOCUMENTS_ERROR, { page_name: 'size_issue' });
        setLimitExceeded(true);
      }
    }
  }, [files]);

  const previewUpload = () => IMAGE_URLS.ICONS.PREVIEW;

  const fileAdded = (val) => {
    setFiles(val);
    if (val.length > 0) {
      updateFiles(val, name);
    }
  };

  const getExtension = (item) => {
    if (item?.length > 1) {
      // let exe = item.map((ele) => ele?.name.toUpperCase());
      const exe = item[item?.length-1].name?.toUpperCase()?.split('.');
      return exe[exe?.length-1];
    } else {
      const exe = item?.name?.toUpperCase()?.split('.');
      if (exe) {
        return exe[exe?.length-1];
      }
    }
  };

  const handleAccountTypeOpen = () => {
    setRegListOpen('block');
  };
  return (
    <div style={{ overflow: 'hidden' }} className="mt-04">
      <div className="mt-20 mb-20" style={{ width: '98%' }}>
        {files.length === 0 && (
          <div className="ta-center flex justify-content-space-between align-items-center">
            <div className="flex justify-content-space-between align-items-center">
              <div>
                <Image
                  source={IMAGE_URLS.ICONS.UPLOAD}
                  alt={CTA_LABELS.UPLOAD}
                  height={35}
                  width={35}
                />
              </div>
              <div style={{ marginLeft: '15px' }}>
                <Typography
                  variant="body1"
                  className={classes.titel}
                  component="h6"
                  align="left"
                >
                  {label || INPUT_CONSTANTS.SELECTED_DOC_LABEL}
                </Typography>
                {!hideBottomSection && (
                  <Typography
                    variant="body1"
                    className={classes.subTitel}
                    component="h6"
                    align="left"
                  >
                    Only PDF,JPEG,PNG (10 MB)
                  </Typography>
                )}
                {getAllStatus?.rejectionReason && getAllStatus?.rejectionReason.length > 0 && (
                  <Box mt={1}>
                    <Typography
                      variant="body1"
                      className={classes.rejectResion}
                      component="h6"
                      align="left"
                    >
                      {getAllStatus?.rejectionReason}
                    </Typography>
                  </Box>
                )}
              </div>
            </div>
            <div>
              {/* <ConditionalRender
                condition={getAllStatus?.status && getAllStatus.status.toLowerCase() === 'pending'}
                truthyComponent={ShowUploadButton()}
                falsyComponent={ShowUploadButton()}
              /> */}
              <ConditionalRender
                condition={getAllStatus?.status && getAllStatus.status.toLowerCase() !== 'pending'}
                truthyComponent={ShowUploadButtonForStatus()}
                falsyComponent={ShowUploadButton()}
              />
            </div>
          </div>
        )}
        {files.map((item, index) => {
          return (
            <div
              key={item?.name}
              className={clsx(
                classes.statement,
                index === files?.length - 1 && classes.removeMarginBottom,
                'ta-center flex justify-content-space-between align-items-center'
              )}
            >
              <div className="flex justify-content-space-between align-items-center">
                <div>
                  <Image
                    source={IMAGE_URLS.ICONS.UPLOAD}
                    alt={CTA_LABELS.UPLOAD}
                    height={35}
                    width={35}
                  />
                </div>
                <div style={{ marginLeft: '18px' }}>
                  <Typography
                    variant="body1"
                    className={classes.titel}
                    component="h6"
                    align="left"
                  >
                    {label}
                  </Typography>
                  <div className="flex">
                    <Typography
                      variant="body1"
                      className={classes.subTitel}
                      component="h6"
                    >
                      {/* {item?.length > 1 ? (
                        getExtension(item[0]?.name)?.toUpperCase() +
                        getExtension(item[1]?.name)?.toUpperCase(),
                        bytesToSize(item[0]?.size) +
                        bytesToSize(item[1]?.size)
                      ) : (
                        getExtension(item?.name)?.toUpperCase(),
                        bytesToSize(item?.size)
                      )} */}
                      {getExtension(item)}
                      {' '}
                      {item?.length > 1 ? bytesToSize(item[1]?.size) : bytesToSize(item?.size)}
                    </Typography>
                  </div>
                </div>
              </div>

              <div>
                <div
                  key={`${item?.name}`}
                  className={clsx(classes.image_container, 'flex')}
                >
                  <div className={classes.uploadPreview}>
                    <img
                      className={clsx(classes.image)}
                      height={32}
                      width={23}
                      src={previewUpload()}
                      alt={item?.name}
                    />
                  </div>
                  <div
                    className={classes.deleteIconWithCross}
                    onClick={removeFile(item)}
                  >
                    <img
                      height={12}
                      width={12}
                      src={IMAGE_URLS.ICONS.CROSS}
                      alt="delete"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <FileSizeExceed
        open={limitExceeded}
        sizeLimit="10 MB"
        onRetry={() => {
          setLimitExceeded(false);
          removeFile(files[0])();
        }}
      />
    </div>
  );
};

BasicUploadDoc.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  updateFiles: PropTypes.func,
  // eslint-disable-next-line react/forbid-prop-types
  defaultFile: PropTypes.any.isRequired,
  showIconOnly: PropTypes.bool,
  handleDelDoc: PropTypes.func,
  getAllStatus: PropTypes.arrayOf(object),
  uploadToPendingSection: PropTypes.bool,
  bankStatementUploaded: PropTypes.bool,
  hideBottomSection: PropTypes.bool,
};

BasicUploadDoc.defaultProps = {
  label: '',
  name: '',
  updateFiles: () => { },
  showIconOnly: false,
  handleDelDoc: () => { },
  getAllStatus: [],
  uploadToPendingSection: false,
  bankStatementUploaded: false,
  hideBottomSection: false,
};

export default BasicUploadDoc;
