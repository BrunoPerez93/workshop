import InputForm from "../InputForm";

const InputField = ({ name, label, asterisco, type = 'text', value, onChange, readOnly = false }) => {
  return (
    <InputForm
      name={name}
      label={label}
      asterisco={asterisco}
      type={type}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
};

export default InputField;
