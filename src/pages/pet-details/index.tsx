import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { petData } from "../pets";
import SideBar from "../../components/side-bar";
import { SlEnergy } from "react-icons/sl";
import { MdOutlinePanorama } from "react-icons/md";
import { FaDog, FaWhatsapp } from "react-icons/fa";
import dogFcae from "../../assets/dog-face.png"
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber"

interface petDetailsData extends petData {
  org: {
    orgName: string;
    address: string;
    phoneNumber: string;
  };
}

const PetDetails = () => {
  const [pet, setPet] = useState<petDetailsData>();

  const { petId } = useParams();

  const fetchData = useCallback(() => {
    api.get(`/pet/${petId}`).then((response) => {
      setPet(response.data);
    });
  }, [petId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  let displayEnergyLevel;
  let displayEnvironment;
  let displaySize;

  switch (pet?.energyLevel) {
    case "high":
      displayEnergyLevel = "Muita Enegria";
      break;
    case "low":
      displayEnergyLevel = "Pouca Enegria";
      break;
    case "normal":
      displayEnergyLevel = "Enegria Normal";
      break;

    default:
      break;
  }

  switch (pet?.environment) {
    case "wide":
      displayEnvironment = "Ambiante Amplo";
      break;
    case "regular":
      displayEnvironment = "Ambiante Normal";
      break;
    case "small":
      displayEnvironment = "Ambiante Pequeno";
      break;

    default:
      break;
  }

  switch (pet?.size) {
    case "small":
      displaySize = "Pequenino";
      break;
    case "big":
      displaySize = "Grandão";
      break;
    case "normal":
      displaySize = "Tamanho Normal";
      break;

    default:
      break;
  }

  const handleMessage = () =>{
    const mensage = `Olá, gostaria de conversar à respeito do(a) ${pet?.name}`;
    
    window.open(
      `https://wa.me/${pet?.org.phoneNumber
        .split("-")
        .join("")}?text=${mensage}`
    );
  }

  return (
    <div className="bg-[#FDECED] flex">
      <SideBar />

      <div className="bg-white w-[700px] mx-auto text-[#0D3B66] rounded-2xl mt-5 mb-5">
        <img
          className="h-80 w-full rounded-t-2xl object-cover"
          src={pet?.photo}
          alt={pet?.name}
        />

        <div className="px-16 mt-16">
          <h1 className="font-extrabold text-5xl mb-6 break-all">
            {pet?.name}
          </h1>

          <p className="font-semibold text-lg mb-10 break-words">
            {pet?.about}
          </p>

          <div className="flex gap-3">
            <div className="flex flex-col w-44 h-[106px] border rounded-3xl justify-center pl-7 gap-y-2">
              <SlEnergy size={24} />
              {displayEnergyLevel}
            </div>
            <div className="flex flex-col w-44 h-[106px] border rounded-3xl justify-center pl-7 gap-y-2">
              <MdOutlinePanorama size={24} />
              {displayEnvironment}
            </div>
            <div className="flex flex-col w-44 h-[106px] border rounded-3xl justify-center pl-7 gap-y-2">
              <FaDog size={24} />
              {displaySize}
            </div>
          </div>

          <div className="bg-[#D3E2E5] w-[548px] h-px mt-10 mb-14" />

          <div className="flex gap-4">
            <div className="size-16 bg-[#F27006] rounded-xl flex justify-center items-center">
              <img
                src={dogFcae}
                alt="roste de um cachorro"
                className="size-7"
              />
            </div>

            <div className="flex flex-col">
              <h2 className="text-3xl font-bold">{pet?.org.orgName}</h2>

              <span className="font-semibold mt-1 mb-4">
                {pet?.org.address}
              </span>

              <span className="w-52 h-14 bg-[#E6F7FB] rounded-xl text-] font-bold flex items-center justify-center gap-2">
                <IoLogoWhatsapp size={24} fill="#0D3B66" />
                {formatPhoneNumber(pet?.org.phoneNumber)}
              </span>
            </div>
          </div>

          <div className="bg-[#D3E2E5] w-[548px] h-px mt-10 mb-14" />

          <h2 className="text-3xl font-bold mb-10">Requesitos para adoção</h2>

          {pet?.requirement.map((item, index) => (
            <div
              key={index}
              className="flex gap-3 items-center bg-[#FDECED] text-[#F15156] font-bold w-[556px] min-h-14 border border-[#F15156] rounded-xl mb-4"
            >
              <span className="ml-10">
                <AiOutlineExclamationCircle size={24} />
              </span>
              {item}
            </div>
          ))}

          <div className="bg-[#D3E2E5] w-[548px] h-px mt-10 mb-14" />

          <button
            onClick={handleMessage}
            className="w-[556px] h-14 border rounded-2xl bg-[#3CDC8C] text-white font-bold text-lg mb-20 flex justify-center items-center gap-4 hover:bg-[#238956] transition-colors"
          >
            <FaWhatsapp size={24} fill="#fff" />
            Entrar em contato
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
