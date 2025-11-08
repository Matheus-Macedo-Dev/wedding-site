import PropTypes from 'prop-types';
import { useState } from 'react';

export default function Input({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false,
  disabled = false,
  className = '',
  ...props
}) {
  const [isFocused, setIsFocused] = useState(false);

  const inputBaseStyles = `
    w-full px-4 py-3 rounded-lg border transition-all duration-300
    focus:outline-none focus:ring-2 focus:ring-offset-1
    disabled:bg-gray-100 disabled:cursor-not-allowed
  `;

  const inputStateStyles = error
    ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
    : 'border-gray-300 focus:ring-primary focus:border-primary';

  const labelStyles = `
    block text-sm font-medium mb-2 transition-colors duration-300
    ${error ? 'text-red-500' : isFocused ? 'text-primary' : 'text-text-dark'}
  `;

  const renderInput = () => {
    const commonProps = {
      id: name,
      name,
      value,
      onChange,
      placeholder,
      required,
      disabled,
      onFocus: () => setIsFocused(true),
      onBlur: () => setIsFocused(false),
      className: `${inputBaseStyles} ${inputStateStyles} ${className}`,
      ...props
    };

    if (type === 'textarea') {
      return (
        <textarea
          {...commonProps}
          rows={4}
        />
      );
    }

    if (type === 'select') {
      return (
        <select {...commonProps}>
          {props.options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return <input type={type} {...commonProps} />;
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className={labelStyles}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {renderInput()}
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'email', 'password', 'number', 'tel', 'textarea', 'select']),
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string
    })
  )
};
