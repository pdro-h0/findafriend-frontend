import { Dispatch } from "react";

interface FiltersProps {
  htmlFor: string;
  label: string;
  selectName: string;
  selectId: string;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
  opt1Text?: string;
  opt2Text: string;
  opt3Text: string;
  opt4Text: string;
  setCaracteristic: Dispatch<React.SetStateAction<undefined | string>>;
  className: string;
}

const Filters = (props: FiltersProps) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm" htmlFor={props.htmlFor}>
        {props.label}
      </label>
      <select
       defaultValue={props.opt1}
        required
        onChange={(ev) => props.setCaracteristic(ev.target.value)}
        className={props.className}
        name={props.selectName}
        id={props.selectId}
      >
        {props.opt1Text && (
          <option value="" disabled>
            {props.opt1Text}
          </option>
        )}
        <option value={props.opt2}>{props.opt2Text}</option>
        <option value={props.opt3}>{props.opt3Text}</option>
        <option value={props.opt4}>{props.opt4Text}</option>
      </select>
    </div>
  );
};

export default Filters;
