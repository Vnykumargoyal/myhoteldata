/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable operator-linebreak */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
// import { Typography } from '@material-ui/core';

import useStyles from './useStyle';

const DropZone = ({
  showPreviews,
  className,
  showFileNamesInPreview,
  previewText,
  dropAreaComponent,
  multiple,
  previewTextClass,
  getSelectedFiles,
  previewImageClass,
  disableRootStyle,
  hideDropzoneIfHasData,
  previewIcon,
  fileNameClass,
  showFileInPreview,
  showPreviewOnDropZone,
  previewClass,
  defaultFiles,
  accept,
  onDropRejected,
  onDrop,
  onDropAccepted,
  fileRemovedOther,
  onRemoveDefault,
  maxSize,
  maxFiles,
  onLimitExceed,
  disabled,
  onDragEnter,
  onDragLeave,
  defaultPreviewImage,
}) => {
  const classes = useStyles();
  const [files, setFile] = useState(defaultFiles || []);
  const [hideDropzoneOnData, setHideDropZone] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple,
    accept,
    onDropRejected,
    onDrop,
    onDropAccepted,
    maxSize,
    maxFiles,
    onDragEnter,
    onDragLeave,
  });
  useEffect(() => {
    if (defaultFiles && defaultFiles.length) {
      setFile(defaultFiles);
      if (hideDropzoneIfHasData && defaultFiles.length >= maxFiles) {
        setHideDropZone(true);
      } else {
        setHideDropZone(false);
      }
    } else {
      setHideDropZone(false);
    }
  }, [defaultFiles, hideDropzoneIfHasData, maxFiles]);

  useEffect(() => {
    if (acceptedFiles && acceptedFiles.length) {
      const filesCount = files.length + acceptedFiles.length;
      if (hideDropzoneIfHasData && filesCount === maxFiles) {
        setHideDropZone(true);
      }
      if (filesCount > maxFiles) {
        onLimitExceed();
        return;
      }
      setFile(files.concat(acceptedFiles));
    }
  }, [acceptedFiles, hideDropzoneIfHasData, maxFiles]);

  useEffect(() => getSelectedFiles(files), [files, getSelectedFiles]);

  const removeFile = (file) => () => {
    files.splice(files.indexOf(file), 1);
    acceptedFiles.splice(0);
    setFile([...files]);
    onRemoveDefault();
    // eslint-disable-next-line no-param-reassign
    if (hideDropzoneIfHasData) setHideDropZone(false);
  };

  useEffect(() => {
    if (fileRemovedOther) {
      acceptedFiles.splice(0);
      setHideDropZone(false);
    }
  }, [fileRemovedOther]);

  const previewUpload = (file) => {
    // TODO: change the logic for checking extensios here.
    if (previewIcon) return previewIcon;
    if (
      // prettier-ignore
      ['jpg', 'jpeg', 'gif', 'svg', 'webp', 'png'].filter((each) => file.name.includes(each)).length
    ) {
      return URL.createObjectURL(file);
    }
    return defaultPreviewImage;
  };
  const getSize = (file, type = 'KB') => {
    // const types = { KB: 10204, MB: 1e+6, };
    // file is in bytes
    // eslint-disable-next-line no-param-reassign
    file /= 1024;

    return `${Math.floor(file, 3)} ${type}`;
  };

  const showPreviewOverDropZone = useMemo(
    () => showPreviewOnDropZone && files && files[0],
    [showPreviewOnDropZone, files]
  );

  return (
    <>
      {!showPreviewOverDropZone && (
        <section
          className={clsx(!disableRootStyle && classes.dropZone, className)}
        >
          {!hideDropzoneOnData && (
            <div {...getRootProps({ className: 'dropzone' })}>
              <input disabled={disabled} {...getInputProps()} accept={accept} />
              {dropAreaComponent}
            </div>
          )}
        </section>
      )}
      {showPreviewOverDropZone && (
        <img
          className={previewClass}
          src={previewUpload(files[0])}
          alt={files[0].name}
        />
      )}
      <aside>
        {previewText && showPreviews && files.length > 0 && (
          <div className={clsx(previewTextClass, classes.previewText)}>
            {previewText}
          </div>
        )}
        <div>
          {showPreviews &&
            // prettier-ignore
            files.map((file, idx) => (
              <div
                key={`${idx}_${file?.name}`}
                className={clsx(classes.image_container)}
              >
                <div style={{ flex: '1 1 auto' }}>
                  {showFileInPreview && (
                  <img
                    className={clsx(classes.image, previewImageClass)}
                    src={previewUpload(file)}
                    alt={file.name}
                  />
                  )}
                  {showFileNamesInPreview && (
                    <div className={classes.fileSize}>
                      <span className={clsx(fileNameClass, classes.fileName, 'col-text-primary col-text-primary-op5 ')}>{file?.name}</span>
                      <span className={fileNameClass}>{getSize(file?.size)}</span>
                    </div>
                  )}
                  {/* <Typography
                    className="fs-12"
                    variant="caption"
                    component="p"
                  >
                    {getSize(file?.size)}
                  </Typography> */}
                </div>
                <div className={clsx(classes.deleteIcon)} onClick={removeFile(file)}>
                  <img src="assets/img/delete-file.svg" alt="File Deletion" />
                </div>
              </div>
            ))}
        </div>
      </aside>
    </>
  );
};

DropZone.defaultProps = {
  showPreviewsInDropzone: false,
  showPreviews: false,
  showFileNamesInPreview: true,
  previewText: '',
  getSelectedFiles: () => {},
  disableRootStyle: false,
  hideDropzoneIfHasData: false,
  className: '',
  dropAreaComponent: '',
  previewImageClass: '',
  previewTextClass: 'fs-14',
  previewIcon: '',
  fileNameClass: 'fs-14 col-grey',
  showFileInPreview: true,
  showPreviewOnDropZone: false,
  previewClass: 'image-preview',
  defaultFiles: [],
  multiple: true,
  accept: '',
  onDropRejected: () => {},
  onDropAccepted: () => {},
  onDropSelectedFile: () => {},
  onDrop: () => {},
  onRemoveDefault: () => {},
  maxSize: Infinity,
  fileRemovedOther: false,
  maxFiles: 1,
  onLimitExceed: () => {},
  disabled: false,
  onDragEnter: () => {},
  onDragLeave: () => {},
  defaultPreviewImage: 'assets/blurred.svg',
};

DropZone.propTypes = {
  showPreviewsInDropzone: PropTypes.bool,
  showPreviews: PropTypes.bool,
  showFileNamesInPreview: PropTypes.bool,
  previewText: PropTypes.string,
  getSelectedFiles: PropTypes.func,
  disableRootStyle: PropTypes.bool,
  hideDropzoneIfHasData: PropTypes.bool,
  className: PropTypes.string,
  dropAreaComponent: PropTypes.element,
  previewTextClass: PropTypes.string,
  previewImageClass: PropTypes.string,
  previewIcon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  fileNameClass: PropTypes.string,
  showFileInPreview: PropTypes.bool,
  showPreviewOnDropZone: PropTypes.bool,
  multiple: PropTypes.bool,
  previewClass: PropTypes.string,
  defaultFiles: PropTypes.instanceOf(Array),
  accept: PropTypes.string,
  onDropRejected: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropSelectedFile: PropTypes.func,
  onDrop: PropTypes.func,
  onRemoveDefault: PropTypes.func,
  maxSize: PropTypes.number,
  fileRemovedOther: PropTypes.bool,
  maxFiles: PropTypes.number,
  onLimitExceed: PropTypes.func,
  disabled: PropTypes.bool,
  onDragEnter: PropTypes.func,
  onDragLeave: PropTypes.func,
  defaultPreviewImage: PropTypes.string,
};

export default DropZone;
