import { useNavigate } from "react-router-dom";
import dogFace from "../assets/dog-face.png";
import { BiArrowBack } from "react-icons/bi";

const SideBar = () => {
  const navigate = useNavigate();

  return (
    <div className="w-24 h-screen bg-[#E44449] flex flex-col justify-between items-center py-6">
      <button onClick={() => navigate("/")}>
        <img src={dogFace} alt="rosto de um cachorro" />
      </button>
      <button
        onClick={() => navigate(-1)}
        className={`bg-[#F4D35E] rounded-2xl font-extrabold size-12`}
        type="button"
      >
        <BiArrowBack fill="#0D3B66" className="w-full" size={30} />
      </button>
    </div>
  );
};

export default SideBar;
