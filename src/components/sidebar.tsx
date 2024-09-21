import logoIcon from "../assets/logo-icon.svg";
import { Eraser } from "lucide-react";

export function Sidebar() {
  return (
    <div className="h-screen w-80 bg-customGreen-500 px-5 py-6">
      <header className="flex flex-col items-center">
        <a href="#">
          <img src={logoIcon} alt="" />
        </a>
        <a
          href="#"
          className="text-3xl text-customGreen-900 font-montserrat font-bold"
        >
          GeoWiki
        </a>
      </header>

      <div className="h-0.5 bg-customGreen-600 my-6"></div>

      <div className="grid gap-6">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Filtros</h2>
          <button className="flex gap-1.5 font-bold text-sm items-center">
            <Eraser />
            Limpar
          </button>
        </div>

        <div>Matheus</div>
      </div>
    </div>
  );
}
