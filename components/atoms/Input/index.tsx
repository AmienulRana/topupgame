import React from "react";

export interface InputProps {
  label: string;
  type: string;
  placeholder: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number;
  disabled?: boolean;
}

const Input = (props: InputProps) => {
  const { label, type, placeholder, onBlur, onChange, value, disabled } = props;
  return (
    <div className="pt-30">
      <label
        htmlFor={label}
        className="form-label text-lg fw-medium color-palette-1 mb-10"
      >
        {label}
      </label>
      <input
        type={type}
        className="form-control rounded-pill text-lg"
        id={label}
        name="name"
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
    </div>
  );
};

export default Input;
