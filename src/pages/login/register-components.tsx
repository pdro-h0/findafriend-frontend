import { Dispatch, FormEvent, useState } from "react";
import Input from "../../components/input";
import { api } from "../../lib/axios";
import { createStandaloneToast, Spinner } from "@chakra-ui/react";

interface RegisterComponentProps {
  setIsLoginPage: Dispatch<React.SetStateAction<boolean>>;
}

const RegisterComponent = ({ setIsLoginPage }: RegisterComponentProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [personInCharge, setPersonInCharge] = useState("");
  const [orgName, setOrgName] = useState("");
  const [cep, setCep] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = createStandaloneToast();

  const handleRegister = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsLoading(true);

    if (password === confirmPassword) {
      api
        .post("/new-org", {
          email,
          password,
          personInCharge,
          cep,
          address,
          phoneNumber,
          orgName,
        })
        .then(() => {
          setIsLoading(false);
          setIsLoginPage(true);
          toast({
            title: "Sucesso.",
            description: "Organização criada",
            status: "success",
            duration: 9000,
            isClosable: true,
          });
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
    } else {
      setIsLoading(false);

      toast({
        title: "Erro.",
        description: "senha e confirmar senha diferentes",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <h2 className="font-bold text-5xl">Cadastre sua organização</h2>

      <form onSubmit={handleRegister} className="flex flex-col mt-28">
        <Input
          htmlFor="personInCharge"
          value={personInCharge}
          id="personInCharge"
          name="personInCharge"
          type="text"
          labelText="Nome do Responsavel"
          setValue={setPersonInCharge}
        />
        <Input
          htmlFor="orgName"
          value={orgName}
          id="orgName"
          name="orgName"
          type="text"
          labelText="Nome da Organização"
          setValue={setOrgName}
        />
        <Input
          htmlFor="email"
          value={email}
          id="email"
          name="email"
          type="email"
          labelText="Email"
          setValue={setEmail}
        />
        .........
        <Input
          htmlFor="cep"
          value={cep}
          id="cep"
          name="cep"
          type="text"
          required
          pattern="\d{5}-d\d{3}"
          labelText="Cep"
          setValue={setCep}
        />
        <Input
          htmlFor="addres"
          value={address}
          id="addres"
          name="addres"
          type="text"
          labelText="Endereço"
          setValue={setAddress}
        />
        <Input
          htmlFor="phoneNumber"
          value={phoneNumber}
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          labelText="Whatsapp"
          setValue={setPhone}
        />
        <Input
          htmlFor="password"
          value={password}
          id="password"
          name="password"
          type="password"
          labelText="Senha"
          setValue={setPassword}
        />
        <Input
          htmlFor="confirmPassword"
          value={confirmPassword}
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          labelText="Confirmar Senha"
          setValue={setConfirmPassword}
        />
        <button
          disabled={isLoading}
          className={`w-[488px] h-16 bg-[#0D3B66] font-bold text-white rounded-2xl mt-16 mb-5 flex justify-center items-center gap-2 ${
            isLoading && "bg-[#08243e] cursor-not-allowed"
          } `}
        >
          cadastar
          {isLoading && (
            <Spinner
              thickness="2px"
              speed="0.68s"
              emptyColor="gray.200"
              color="red.500"
              size="sm"
            />
          )}
        </button>
        <button
          className="text-[#0D3B66] font-bold underline w-[488px] text-center pb-6"
          type="button"
          onClick={() => setIsLoginPage(true)}
        >
          Já possui conta?
        </button>
      </form>
    </>
  );
};

export default RegisterComponent;
