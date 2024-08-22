import { FloatingLabel, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FloatingInputSelect = ({
  label,
  value,
  onChange,
  options,
  type = 'text',
  placeholder,
  name,
  isInvalid = false,
  errorMessage = '',
}) => {
  return (
    <FloatingLabel controlId={`floatingInput-${name}`} label={label} className="mb-3">
      {type === 'select' ? (
        <Form.Select name={name} value={value} onChange={onChange} required isInvalid={isInvalid}>
          <option value="">{placeholder || 'Choose...'}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      ) : (
        <Form.Control
          type={type}
          placeholder={placeholder || label}
          value={value}
          name={name}
          onChange={onChange}
          required
          isInvalid={isInvalid}
        />
      )}
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </FloatingLabel>
  );
};

FloatingInputSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  isInvalid: PropTypes.bool,
  errorMessage: PropTypes.string
};

export default FloatingInputSelect;
