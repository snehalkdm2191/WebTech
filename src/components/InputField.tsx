//@ts-nocheck
import { useRef } from "react";

export default function InputField({ onChange, options, state }) {
  const { key, label, placeholder, type, mode, required } = options;

  // Properties
  const inputReference = useRef(null);

  return (
    <div className="form-group">
      <label className={key}>{label}</label>
        <input
          ref={inputReference}
          value={state}
          type={type}
          className="form-control"
          placeholder={mode === "edit" ? state : placeholder}
          required={required}
          onChange={() => onChange(key, inputReference.current.value)}
        ></input>
    </div>
  );
}
