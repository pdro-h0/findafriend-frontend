import CityFilter from "./components/city-filter";
import logo from "./assets/logo.png"

function App() {
  return (
    <div className="bg-red-500/90 h-screen flex justify-center items-center">
      <div className="flex w-[1273px] gap-32">
        <div className="">
          <img src={logo} className="mb-20 w-52" />
          <h2 className="text-7xl font-extrabold mb-28">
            Leve <br /> a felicidade <br /> para o seu lar
          </h2>
          <p className="text-2xl">
            Encontre o animal de estimação ideal <br /> para seu estilo de vida!
          </p>
        </div>

        <div className="flex items-center flex-col justify-center">
          <img className="pb-28" src="/dogs.png" alt="imagem com 4 cachorros" />

          <div className="flex gap-4 items-center">
            <label className="inline" htmlFor="cityName">
              Busque um amigo:
            </label>
            <CityFilter className="py-5 px-8"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
