import PropTypes from 'prop-types';

// prettier-ignore
const ConditionalRender = ({ condition, truthyComponent, falsyComponent }) => (
  condition ? truthyComponent : falsyComponent
);

ConditionalRender.propTypes = {
  condition: PropTypes.bool.isRequired,
  truthyComponent: PropTypes.oneOfType([PropTypes.array, PropTypes.element])
    .isRequired,
  falsyComponent: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
};

ConditionalRender.defaultProps = {
  falsyComponent: null,
};

export default ConditionalRender;
