import React, { useState, useRef } from 'react';
import './OTPInput.css'; // Create this CSS file for styling

const OTPInput = ({
  otp,
  setOtp,
}) => {
  
  const inputRefs = useRef([]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = element.value;

    setOtp(newOtp);

    // Move focus to the next input box
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === 'Backspace') {
      // Move focus to the previous input box
      if (index > 0) {
        inputRefs.current[index - 1].focus();
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  return (
    <div className="otp-container">
      {otp.map((data, index) => (
        <input
          className="otp-input"
          type="text"
          maxLength="1"
          key={index}
          value={data}
          ref={(el) => inputRefs.current[index] = el}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
  );
};

export default OTPInput;