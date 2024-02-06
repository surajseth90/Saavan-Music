import "./style.scss";

function Checkbox(props) {
  const {
    id,
    label,
    value,
    classes,
    defaultChecked,
    required,
    name,
    onChange,
  } = props;
  return (
    <div className="checkbox-container d-flex align-items-center">
      {/* <label className="container" htmlFor={id}> */}
      <input
        type="checkbox"
        id={id || ""}
        name={name}
        value={value || label}
        className={`input-checkbox ${classes}`}
        defaultChecked={defaultChecked || false}
        required={required || false}
        onChange={onChange}
      />
      {/* <span className="checkmark"></span> */}
      {/* </label> */}
      <label className="checkbox-label" htmlFor={id}>
        {label || value}
      </label>
    </div>
  );
}

export default Checkbox;
