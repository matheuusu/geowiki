import logoIcon from "../assets/logo-icon.svg";
import { ChevronsDownUp, ChevronsUpDown, Eraser } from "lucide-react";
import { CategorySelector } from "./category-selector";
import { useCountries } from "../context/countries-context";
import { SlideSelector } from "./slide-selector";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Sidebar() {
  const { state, dispatch } = useCountries();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  function handleRegionSelect(region: string) {
    dispatch({ type: "SET_REGION", payload: region });
    dispatch({ type: "APPLY_FILTERS" });
  }

  function handleSubregionSelect(subregion: string) {
    dispatch({ type: "SET_SUBREGION", payload: subregion });
    dispatch({ type: "APPLY_FILTERS" });
  }

  function handleClearFilters() {
    dispatch({ type: "RESET_FILTERS" });
  }

  function toggleSidebar() {
    setIsExpanded(!isExpanded);
  }

  useEffect(() => {
    function handleResize() {
      const isMobileDevice = window.innerWidth < 640;
      setIsMobile(isMobileDevice);
      if (!isMobileDevice) {
        setIsExpanded(true);
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {isExpanded && isMobile && (
        <div
          onClick={() => setIsExpanded(false)}
          className="fixed inset-0 bg-black opacity-40 z-10"
        ></div>
      )}
      <div
        className={`h-screen z-20 ${
          isExpanded ? "fixed w-4/5 sm:w-80" : "fixed w-12"
        } top-0 left-0 bg-customGreen-500 overflow-y-auto z-10 transition-all duration-300`}
      >
        <header className="flex flex-col items-center mt-4">
          <Link to="#">
            <img src={logoIcon} alt="Logo" className="w-10 h-10" />
          </Link>
          {isExpanded && (
            <Link
              to="#"
              className="text-3xl text-customGreen-900 font-montserrat font-bold"
            >
              GeoWiki
            </Link>
          )}
        </header>

        {isExpanded && (
          <div className="px-5 py-6 w-ful">
            <div className="h-0.5 bg-customGreen-600 my-6"></div>
            <div className="grid gap-6">
              <div className="flex justify-between items-center">
                <h2 className="font-bold text-lg">Filtros</h2>
                <button
                  onClick={handleClearFilters}
                  className="flex gap-1.5 font-bold text-sm items-center"
                >
                  <Eraser />
                  Limpar
                </button>
              </div>

              <div className="grid gap-8">
                <CategorySelector
                  onSelect={handleRegionSelect}
                  type="region"
                  placeholder="Selecione uma região"
                />

                {state.selectedRegion && (
                  <CategorySelector
                    onSelect={handleSubregionSelect}
                    type="subregion"
                    selectedRegion={state.selectedRegion}
                    placeholder="Selecione uma sub-região"
                  />
                )}

                <SlideSelector />
              </div>
            </div>
            <div className="h-0.5 bg-customGreen-600 mt-16 mb-8"></div>
            <footer className="text-center font-semibold text-xs grid">
              <span>Desenvolvido por Matheus</span>
              <span>@2024</span>
            </footer>
          </div>
        )}

        <button
          onClick={toggleSidebar}
          className={`sm:sr-only absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-customGreen-900 text-white rounded p-2 shadow-md ${
            isExpanded ? "block" : "block"
          }`}
        >
          {isExpanded ? (
            <ChevronsDownUp className="w-5 h-5 rotate-45" />
          ) : (
            <ChevronsUpDown className="w-5 h-5 rotate-45" />
          )}
        </button>
      </div>
    </>
  );
}
