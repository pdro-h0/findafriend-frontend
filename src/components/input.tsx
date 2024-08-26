import { ComponentProps, Dispatch } from "react";

interface InputProps extends ComponentProps<"input">{
  htmlFor: string;
  value: string;
  setValue: Dispatch<React.SetStateAction<string>>;
  id: string;
  name: string;
  type: string;
  labelText: string;
  patternRegex?: string
}

const Input = ({
  htmlFor,
  id,
  name,
  setValue,
  type,
  value,
  labelText,
}: InputProps) => {
  return (
    <div className="flex flex-col mb-4">
      <label htmlFor={htmlFor}>{labelText}</label>
      <input
      required
        value={value}
        onChange={(ev) => setValue(ev.target.value)}
        className="w-[488px] h-16 bg-[#F5F8Fa] rounded-2xl pl-2"
        id={id}
        name={name}
        type={type}
      />
    </div>
  );
};

export default Input;
