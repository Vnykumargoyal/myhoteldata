/* eslint-disable no-restricted-syntax */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect } from 'react';
import MaterialStepper from '@material-ui/core/Stepper';
import StepConnector from '@material-ui/core/StepConnector';
import withStyles from '@material-ui/core/styles/withStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
// import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import clsx from 'clsx';

// import color from '../../constant/colors';
import useBreakpoints from '../../hooks/useBreakpoints';
import color from '../../constants/colors';

const BlurConnector = withStyles({
  alternativeLabel: {
    top: 12,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
    background: color.grey,
    height: '1px',
  },
  active: {
    '& $line': {
      borderColor: 'inherit',
      boxShadow: `0px 0px 10px 0px ${color.pastelGreen}`,
      borderWidth: '2px',
    },
  },
  completed: {
    '& $line': {
      borderColor: 'inherit',
      width: '100%',
      boxShadow: `0px 0px 10px 0px ${color.pastelGreen}`,
      borderWidth: '2px',
    },
  },
  line: {
    borderColor: color.lightGreyes,
  },
})(StepConnector);

const useStyles = makeStyles((theme) => ({
  stepStyle: {
    fontSize: '12px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px',
    },
  },
}));

const Stepper = ({
  activeStep,
  steps,
  orientation,
  alternativeLabel,
  className,
  labelContent,
  stepperCSS,
  stepDescClassName,
  stepTitleStyle,
}) => {
  const classes = useStyles();
  let styles = {
    width: '30%',
    borderColor: color.primary,
    borderWidth: '2px',
    transform: 'translateY(-0.5px)',
    boxShadow: `0px 0px 10px 0px ${color.pastelGreen}`,
    // filter: 'blur(1px)',
  };
  styles = { ...styles, ...stepperCSS }; // overrides styles with stepperCSS

  useEffect(() => {
    let stepperDOM = document.querySelector('.MuiStepIcon-active').parentElement
      .parentElement;
    if (stepperDOM.classList.contains('MuiStepLabel-vertical')) {
      return; // do nothing
    }
    // prettier-ignore
    // eslint-disable-next-line max-len
    stepperDOM = stepperDOM.parentElement.nextElementSibling?.querySelector(
      '.MuiStepConnector-line'
    ).style;
    if (stepperDOM) {
      // eslint-disable-next-line no-restricted-syntax
      // eslint-disable-next-line guard-for-in
      for (const style in styles) {
        stepperDOM[style] = styles[style]; // applies each style to the selected stepper
      }
    }

    // return () => {
    //   stepperDOM = null;
    // };

    // select and set overflow-x for parent element because it is not possible with className
    /*
    1
      2
    objective is to change css properties of 1 using 2
    */
    document.querySelector(
      '.MuiStepper-root.MuiStepper-horizontal'
    ).parentElement.style.overflowX = 'hidden';
  }, []);

  const { isLg } = useBreakpoints();
  const marginTop = isLg && '1.16rem';
  return (
    <MaterialStepper
      activeStep={activeStep}
      alternativeLabel={alternativeLabel}
      connector={<BlurConnector />}
      className={className}
      style={{
        paddingRight: 0,
        paddingLeft: 0,
        paddingTop: 0,
        marginTop,
        width: '108%',
        marginLeft: '-4%',
      }}
      orientation={orientation}
    >
      {steps.map(({ label, content }) => (
        <Step key={label} className={classes.stepStyle}>
          <StepLabel className={clsx(classes.stepStyle, stepTitleStyle)}>
            {label}
            {labelContent && (
            <Typography
              component="div"
              className={stepDescClassName}
            >
              {content}
            </Typography>
            )}
          </StepLabel>
        </Step>
      ))}
    </MaterialStepper>
  );
};

Stepper.defaultProps = {
  orientation: 'horizontal',
  alternativeLabel: true,
  labelContent: false,
  stepperCSS: {},
  className: '',
  stepDescClassName: '',
  stepTitleStyle: '',
};
Stepper.propTypes = {
  orientation: PropTypes.string,
  alternativeLabel: PropTypes.bool,
  labelContent: PropTypes.bool,
  steps: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeStep: PropTypes.number.isRequired,
  className: PropTypes.string,
  stepperCSS: PropTypes.objectOf(PropTypes.string),
  stepDescClassName: PropTypes.string,
  stepTitleStyle: PropTypes.string,
};
export default Stepper;
