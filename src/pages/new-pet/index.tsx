import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Input from "../../components/input";
import SideBar from "../../components/side-bar";
import Filters from "../../components/filters";
import { api } from "../../lib/axios";
import { BiLogOut, BiMinus, BiPlus } from "react-icons/bi";
import dogFace from "../../assets/dog-face.png";
import { useNavigate } from "react-router-dom";
import { createStandaloneToast, Spinner } from "@chakra-ui/react";

const NewPet = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [requirementList, setRequirementList] = useState<string[]>([]);
  const [requirement, setRequirement] = useState("");
  const [cityName, setCityName] = useState("");
  const [age, setAge] = useState<string | undefined>("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [energyLevel, setEnergyLevel] = useState<string | undefined>("");
  const [size, setSize] = useState<string | undefined>("");
  const [environment, setEnvironment] = useState<string | undefined>("");
  const [independencyLevel, setIndependencyLevel] = useState<
    string | undefined
  >("");

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { toast } = createStandaloneToast();

  const addNewRequirement = () => {
    if (requirement !== "") {
      setRequirementList((prev) => [...prev, requirement]);
      setRequirement("");
    }
  };

  const removeRequirement = (itemToRemove: string) => {
    const requirementUpdated = requirementList.filter(
      (item) => item !== itemToRemove
    );

    setRequirementList(requirementUpdated);
  };

  const handleChangeFile = (ev: ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPhoto(imageUrl);
    }
  };

  const token = sessionStorage.getItem("pet-token");

  useEffect(() => {
    if (!token || token === "undefined") {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleCreatePet = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsLoading(true);

    api
      .post(
        "/new-pet",
        {
          name,
          about,
          requirement: requirementList,
          age,
          energyLevel,
          size,
          environment,
          independencyLevel,
          photo,
          cityName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setIsLoading(false);
        toast({
          title: "sucesso.",
          description: "Pet criado com sucesso",
          status: "success",
          duration: 9000,
          isClosable: true,
        });

        setTimeout(() => {
          navigate(0);
        },650);
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
  };

  return (
    <div className="bg-[#FDECED] flex">
      <SideBar />
      <div className="flex flex-col justify-center items-center mx-auto py-6 ">
        <div className="bg-[#0D3B66] rounded-xl w-[700px] flex justify-between items-center gap-2 py-7 px-16">
          <div className="size-16 bg-orange-500 rounded-xl flex items-center justify-center">
            <img src={dogFace} alt="rosto de um cachorro" className="size-10" />
          </div>

          <button
            onClick={() => {
              sessionStorage.removeItem("pet-token");
              navigate("/login");
            }}
            className="size-16 bg-[#114A80] rounded-xl"
          >
            <BiLogOut size={30} className="w-full" />
          </button>
        </div>

        <div className="bg-white w-[700px] rounded-xl text-[#0D3B66] px-20 py-16 mt-8">
          <h2 className="text-4xl font-extrabold mb-16">Adicione um pet</h2>

          <form onSubmit={handleCreatePet} className="flex flex-col gap-6">
            <Input
              htmlFor="name"
              value={name}
              id="name"
              name="name"
              type="text"
              labelText="Nome"
              setValue={setName}
            />

            <div className="flex flex-col mb-4">
              <label htmlFor="about" className="text-sm">
                Sobre
              </label>
              <textarea
                required
                value={about}
                onChange={(ev) => setAbout(ev.target.value)}
                className="w-[488px] h-16 bg-[#F5F8Fa] rounded-2xl pl-2"
                id="about"
                name="about"
              />
            </div>

            <Filters
              className="w-[488px] h-16 bg-[#F5F8Fa] rounded-2xl pl-2"
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
              className="w-[488px] h-16 bg-[#F5F8Fa] rounded-2xl pl-2"
              htmlFor="energyLevel"
              label="Nível de energia"
              opt1Text="Selecione"
              opt1=""
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
              className="w-[488px] h-16 bg-[#F5F8Fa] rounded-2xl pl-2"
              htmlFor="size"
              label="Tamanho"
              opt1Text="Selecione"
              opt1=""
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
              className="w-[488px] h-16 bg-[#F5F8Fa] rounded-2xl pl-2"
              htmlFor="independencyLevel"
              label="Nível de dependência"
              opt1Text="Selecione"
              opt1=""
              opt2="low"
              opt2Text="Pequno (pet independende)"
              opt3="normal"
              opt3Text="Normal"
              opt4="high"
              opt4Text="Grande (precisa de companhia sempre)"
              selectId="independencyLevel"
              selectName="independencyLevel"
              setCaracteristic={setIndependencyLevel}
            />

            <Filters
              className="w-[488px] h-16 bg-[#F5F8Fa] rounded-2xl pl-2"
              htmlFor="environment"
              label="Ambiente"
              opt1Text="Selecione"
              opt1=""
              opt2="small"
              opt2Text="Pequno"
              opt3="regular"
              opt3Text="Normal"
              opt4="wide"
              opt4Text="Amplo"
              selectId="environment"
              selectName="environment"
              setCaracteristic={setEnvironment}
            />

            <div className="flex flex-col">
              <label htmlFor="cityName">Cidade</label>
              <select
              defaultValue=""
                required
                onChange={(ev) => setCityName(ev.target.value)}
                className="w-[488px] h-16 bg-[#F5F8Fa] rounded-2xl pl-2"
                name="cityName"
                id="cityName"
              >
                <option value="" disabled>Selecione</option>
                <option value="city-1">Cidade 1</option>
                <option value="city-2">Cidade 2</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="photo">Fotos</label>
              <input
                required
                onChange={handleChangeFile}
                type="file"
                accept="image/*"
                name="photo"
                id="photo"
              />
            </div>

            <h2 className="text-4xl font-extrabold mb-16 mt-20">
              Requisitos para adoção
            </h2>

            <div className="flex flex-col">
              <label htmlFor="requirement">Requisitos</label>

              <div className="flex items-center">
                <input
                  type="text"
                  name="requirement"
                  id="requirement"
                  value={requirement}
                  className="w-[458px] h-16 bg-[#F5F8Fa] rounded-l-2xl outline-none pl-2"
                  onChange={(ev) => setRequirement(ev.target.value)}
                />

                <button
                  className=" h-16 bg-[#F5F8Fa] w-[30px] rounded-r-2xl "
                  onClick={addNewRequirement}
                  type="button"
                >
                  <BiPlus size={24} />
                </button>
              </div>
            </div>

            {requirementList.length > 0 && (
              <div className="flex flex-col gap-3">
                {requirementList.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#0D3B66] w-[488px] h-16 rounded-2xl flex justify-between items-center px-2"
                  >
                    <span className="text-white text-xl ">{item}</span>
                    <button
                      className=" h-16 bg-[#0D3B66] rounded-r-2xl "
                      onClick={() => removeRequirement(item)}
                      type="button"
                    >
                      <BiMinus size={24} fill="#fff" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              className={`bg-[#F4D35E] text-center w-[488px] h-16 rounded-2xl font-bold mt-32 flex justify-center items-center gap-2 ${
                isLoading && "bg-[#5f5223] cursor-not-allowed"
              }`}
            >
              Confirmar
              {isLoading && (
                <Spinner
                  thickness="2px"
                  speed="0.68s"
                  emptyColor="gray.200"
                  color="blue.500"
                  size="sm"
                />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPet;
