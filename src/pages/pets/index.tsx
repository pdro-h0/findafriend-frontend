import { useNavigate, useParams } from "react-router-dom";
import CityFilter from "../../components/city-filter";
import { useCallback, useEffect, useState } from "react";
import { api } from "../../lib/axios";
import Filters from "../../components/filters";
import PetItem from "./pet-item";
import dogFace from "../../assets/dog-face.png";
import { Spinner, createStandaloneToast } from "@chakra-ui/react";

export interface petData {
  id: string;
  name: string;
  about: string;
  cityName: string;
  orgId: string;
  age: "puppy" | "adult" | "old";
  size: "small" | "normal" | "big";
  energyLevel: "low" | "normal" | "high";
  independencyLevel: "low" | "normal" | "high";
  environment: "small" | "regular" | "wide";
  photo: string;
  requirement: string[];
}

const Pets = () => {
  const [pets, setPets] = useState<petData[]>([]);
  const [age, setAge] = useState<string | undefined>();
  const [energyLevel, setEnergyLevel] = useState<string | undefined>();
  const [size, setSize] = useState<string | undefined>();
  const [independencyLevel, setIndependencyLevel] = useState<
    string | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  const { cityName } = useParams();

  const navigate = useNavigate();

  const { toast } = createStandaloneToast();

  const petsFiltered = pets.filter((pet) => {
    const isAgeMatch = age ? pet.age === age : true;

    const isEnergyLevelMatch = energyLevel
      ? pet.energyLevel === energyLevel
      : true;

    const isIndependencyLevelMatch = independencyLevel
      ? pet.independencyLevel === independencyLevel
      : true;

    const isSizeMatch = size ? pet.size === size : true;

    return (
      isAgeMatch &&
      isEnergyLevelMatch &&
      isIndependencyLevelMatch &&
      isSizeMatch
    );
  });

  const fetchData = useCallback(() => {
    const caracteristic = { age, energyLevel, size, independencyLevel };
    setIsLoading(true);

    api
      .get(`/pets/${cityName}`, {
        data: {
          caracteristic,
        },
      })
      .then((response) => {
        setIsLoading(false);
        setPets(response.data.pet);
      })
      .catch((error) => {
        setIsLoading(false);

        if (typeof error.response.data.error === "string") {
          toast({
            title: "Erro.",
            description: error.response.data.error,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        } else if (typeof error.response.data.error === "object") {
          toast({
            title: "Erro.",
            description: error.response.data.error[0].message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        }
      });
  }, [cityName, age, energyLevel, size, independencyLevel]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleResetSearch = () => {
    setAge("");
    setEnergyLevel("");
    setSize("");
    setIndependencyLevel("");
  };

  return (
    <div className="flex bg-[#FDECED]">
      <div className="bg-[#E44449] w-[392px] h-screen flex flex-col">
        <button onClick={() => navigate("/")} className="mx-14 my-6">
          <img className="size-9" src={dogFace} alt="cachorro" />
        </button>
        <div className="flex gap-4 px-14 pb-6">
          <CityFilter className="px-2 py-5" />
        </div>

        <div className="bg-[#F15156] flex flex-col px-14 flex-1 pt-9">
          <h4 className="mb-7">Filtros</h4>

          <div className="flex flex-col gap-3">
            <Filters
              className="bg-[#F75F64] rounded-2xl outline-red-900/80 px-2 py-4"
              htmlFor="age"
              label="Idade"
              opt1=""
              opt1Text="Selecione"
              opt2="puppy"
              opt2Text="Filhote"
              opt3="adult"
              opt3Text="Adulto"
              opt4="old"
              opt4Text="Velho"
              selectId="age"
              selectName="age"
              setCaracteristic={setAge}
            />

            <Filters
              className="bg-[#F75F64] rounded-2xl outline-red-900/80 px-2 py-4"
              htmlFor="energyLevel"
              label="Nível de energia"
              opt1=""
              opt1Text="Selecione"
              opt2="low"
              opt2Text="01"
              opt3="normal"
              opt3Text="02"
              opt4="high"
              opt4Text="03"
              selectId="energyLevel"
              selectName="energyLevel"
              setCaracteristic={setEnergyLevel}
            />

            <Filters
              className="bg-[#F75F64] rounded-2xl outline-red-900/80 px-2 py-4"
              htmlFor="size"
              label="Tamanho"
              opt1=""
              opt1Text="Selecione"
              opt2="small"
              opt2Text="Pequno"
              opt3="normal"
              opt3Text="Normal"
              opt4="big"
              opt4Text="Grande"
              selectId="size"
              selectName="size"
              setCaracteristic={setSize}
            />

            <Filters
              className="bg-[#F75F64] rounded-2xl outline-red-900/80 px-2 py-4"
              htmlFor="independencyLevel"
              label="Nível de dependência"
              opt1=""
              opt1Text="Selecione"
              opt2="low"
              opt2Text="Pequno"
              opt3="normal"
              opt3Text="Normal"
              opt4="high"
              opt4Text="Grande"
              selectId="independencyLevel"
              selectName="independencyLevel"
              setCaracteristic={setIndependencyLevel}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-1 h-screen flex justify-center items-center bg-[#FDECED]">
          <Spinner
            thickness="4.5px"
            speed="0.68s"
            emptyColor="gray.200"
            color="red.500"
            size="xl"
          />
        </div>
      ) : (
        <div className="bg-[#FDECED] flex-1 pt-20 pl-8">
          <div className="flex justify-between w-full">
            <h3 className="text-[#0D3B66] font-semibold">
              Encontre{" "}
              <span className="font-extrabold">
                {petsFiltered.length} amigos
              </span>{" "}
              na sua cidade
            </h3>

            <button
              onClick={handleResetSearch}
              type="button"
              className="bg-[#F4D35E] rounded-2xl text-[#0D3B66] font-bold px-4 py-1 mr-4"
            >
              Resetar filtros
            </button>
          </div>

          <div className="flex flex-wrap gap-6 mt-14 pb-1">
            {petsFiltered.map((pet) => (
              <PetItem pet={pet} key={pet.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pets;
