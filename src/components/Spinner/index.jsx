import React from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';

const Spinner = ({ numberOfBars = 8 }) => (
  <div className="spinner">
    {range(1, numberOfBars + 1).map((item) => (
      <div
        key={item}
        className="bar"
        style={{
          transform: `rotate(${(360 / numberOfBars) * (item - 1)}deg) translate(8px)`,
          animationDelay: `${-1.2 + (1.2 / numberOfBars) * (item - 1)}s`,
        }}
      />
    ))}
  </div>
);

Spinner.propTypes = {
  numberOfBars: PropTypes.number,
};

Spinner.defaultProps = {
  numberOfBars: 8,
};

export default Spinner;
