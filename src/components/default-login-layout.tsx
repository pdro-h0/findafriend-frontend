import { Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";

const DefaultLoginLayout = () => {
  return (
    <div className="h-screen flex justify-center items-center gap-32">
      <div className="bg-red-500/90 rounded-2xl w-[488px] flex flex-col items-center">
        <img className="w-44 pt-28 mb-52" src={logo} alt="logo findafriend" />

        <img
          className="w-96 pb-10"
          src="./dogs.png"
          alt="imagem com cachorros"
        />
      </div>

      <Outlet />
    </div>
  );
};

export default DefaultLoginLayout;
