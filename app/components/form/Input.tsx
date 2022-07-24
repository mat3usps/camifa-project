import classNames from "classnames";
import { forwardRef } from "react";

interface IInputProps {
  autoFocus?: boolean;
  helperMessage?: string;
  id: string;
  initialValue?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  errorMessage?: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password";
}

const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      autoFocus,
      helperMessage,
      id,
      initialValue,
      isDisabled,
      isRequired,
      errorMessage,
      label,
      type = "text",
      ...rest
    },
    ref
  ) => {
    const hasError = !!errorMessage;
    const hasHelperMessage = !!helperMessage;

    return (
      <div className="form-control w-full">
        <label htmlFor={id} className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          autoFocus={autoFocus}
          aria-invalid={hasError ? true : undefined}
          aria-describedby={
            hasHelperMessage ? `${id}-helper-message` : undefined
          }
          aria-errormessage={hasError ? `${id}-error` : undefined}
          className={classNames("input input-bordered input-md w-full", {
            "input-error": hasError,
          })}
          defaultValue={initialValue}
          disabled={isDisabled}
          id={id}
          name={id}
          ref={ref}
          required={isRequired}
          type={type}
          {...rest}
        />
        {hasHelperMessage && (
          <div className="label" id={`${id}-helper-message`}>
            <span className="label-text-alt">{helperMessage}</span>
          </div>
        )}
        {hasError && (
          <div className="label" id={`${id}-error`}>
            <span className="label-text-alt text-red-700">{errorMessage}</span>
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
