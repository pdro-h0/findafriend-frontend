import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface CityFilterProps {
  className: string;
}

const CityFilter = ({ className }: CityFilterProps) => {
  const [cityName, setCityName] = useState("");

  const navigate = useNavigate();
  return (
    <>
      <select
        defaultValue=""
        className={`bg-red-900/40 rounded-2xl outline-red-900/80 ${className}`}
        name="cityName"
        id="cityName"
        onChange={(ev) => setCityName(ev.target.value)}
      >
        <option value="" disabled>
          Escolha uma cidade
        </option>
        <option className="border-none" value="city-1">
          Cidade 1
        </option>
        <option className="border-none" value="city-2">
          Cidade 2
        </option>
      </select>

      <button
        onClick={() => {
          if (cityName !== "") {
            navigate(`/pets/${cityName}`);
          }
        }}
        className={`bg-[#F4D35E] rounded-2xl font-bold size-16 text-center `}
        type="button"
      >
        <BiSearch className="w-full" fill="#0D3B66" size={32} />
      </button>
    </>
  );
};

export default CityFilter;
