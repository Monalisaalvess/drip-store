import { useId } from "react"
import "./FormField.css"

// Campo de formulário com label, máscara opcional e mensagem de erro
// onChange(name, valor) recebe o valor já formatado pela máscara
function FormField({
  label,
  name,
  value,
  onChange,
  error,
  mask,
  required = false,
  type = "text",
  placeholder,
  inputMode,
  autoComplete,
  half = false,
}) {
  const id = useId()
  return (
    <div className={`form-field${half ? " form-field--half" : ""}`}>
      <label htmlFor={id} className="form-field__label">
        {label}
        {required && " *"}
      </label>
      <input
        id={id}
        className={`form-field__input${error ? " form-field__input--error" : ""}`}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(e) => onChange(name, mask ? mask(e.target.value) : e.target.value)}
      />
      {error && (
        <p id={`${id}-error`} className="form-field__error">
          {error}
        </p>
      )}
    </div>
  )
}

export default FormField
