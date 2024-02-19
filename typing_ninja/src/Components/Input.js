import React from "react";

const Input = React.forwardRef((props, ref) => {
  const { className, value, onChange, type, onKeyPress } = props;

  return (
    <input
      ref={ref}
      type={type}
      className={className}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyPress}
      autoFocus
    />
  );
});

export default Input;
