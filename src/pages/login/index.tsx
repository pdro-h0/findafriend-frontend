import { FormEvent, useState } from "react";
import logo from "../../assets/logo.png";
import { api } from "../../lib/axios";
import Input from "../../components/input";
import { useNavigate } from "react-router-dom";
import RegisterComponent from "./register-components";
import { createStandaloneToast, Spinner } from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { toast } = createStandaloneToast();

  const handleLogin = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsLoading(true);

    api
      .post("/sessions", {
        email,
        password,
      })
      .then((response) => {
        setIsLoading(false);
        sessionStorage.setItem("pet-token", response.data.token);
        navigate("/new-pet");
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
    <div className="h-screen flex justify-center gap-32 py-2">
      <div className="bg-red-500/90 rounded-2xl w-[488px] flex flex-col items-center">
        <img className="w-44 pt-28 mb-52" src={logo} alt="logo findafriend" />

        <img
          className="w-96 pb-10"
          src="./dogs.png"
          alt="imagem com cachorros"
        />
      </div>

      <div className="text-[#0D3B66]">
        {isLoginPage ? (
          <>
            <h2 className="font-bold text-5xl">Boas-vindas!</h2>
            <span className="font-extralight">
              Email: email@email.com | senha: 12345
            </span>

            <form onSubmit={handleLogin} className="flex flex-col  mt-24">
              <Input
                htmlFor="email"
                value={email}
                id="email"
                name="email"
                type="email"
                labelText="Email"
                setValue={setEmail}
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

              <button
                disabled={isLoading}
                className={`w-[488px] flex justify-center items-center gap-2 h-16 bg-[#0D3B66] font-bold text-white rounded-2xl mt-16 mb-5 ${
                  isLoading && "bg-[#08243e] cursor-not-allowed"
                }`}
              >
                Login
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
                type="button"
                onClick={() => setIsLoginPage(false)}
                className="w-[488px] h-16 bg-[#D3E2E5] text-center font-bold rounded-2xl"
              >
                Cadastrar organização
              </button>
            </form>
          </>
        ) : (
          <RegisterComponent setIsLoginPage={setIsLoginPage} />
        )}
      </div>
    </div>
  );
};

export default Login;
