import { useNavigate } from "react-router-dom";
import { petData } from ".";
import dogFace from "../../assets/dog-face.png";

interface PetItemProps {
  pet: petData;
}

const PetItem = ({ pet }: PetItemProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/pet/${pet.id}`)}
      className="w-72 h-52 rounded-2xl bg-white flex flex-col items-center hover:bg-[#0D3B66] group duration-200 cursor-pointer overflow-x-hidden text-ellipsis whitespace-nowrap"
    >
      <img
        className="w-[274px] h-[135px] rounded-2xl object-cover mt-1"
        src={pet.photo}
        alt={pet.name}
      />
      <div className="size-11 bg-red-500 ring ring-white duration-200 group-hover:ring-[#0D3B66] rounded-lg -mt-5 mb-2 flex items-center justify-center">
        <img className="size-4" src={dogFace} alt="cachorro" />
      </div>

      <span className="text-[#0D3B66] duration-200 font-semibold group-hover:text-white truncate w-full text-center pl-2">
        {pet.name}
      </span>
    </div>
  );
};

export default PetItem;
