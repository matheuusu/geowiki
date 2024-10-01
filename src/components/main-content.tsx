import { useCountries } from "../context/countries-context";
import React, { useState, useEffect } from "react";
import { Search, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SortSelector } from "./sort-selector";

export function MainContent() {
  const { state, dispatch } = useCountries();
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: "SET_SEARCH_FILTER", payload: searchTerm });
    dispatch({ type: "APPLY_FILTERS" });
    dispatch({ type: "APPLY_SORT" });
  }, [searchTerm, dispatch]);

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  function handleCountryClick(countryName: string) {
    navigate(`/country/${encodeURIComponent(countryName)}`);
  }

  return (
    <div id="header" className="flex-1 p-4 ml-12 md:p-12 md:ml-80">
      <div className="grid gap-8">
        <div className="grid gap-3">
          <div className="grid md:flex justify-between items-center">
            <p className="text-customGreen-900 font-medium text-center">
              <strong className="bg-amber-200 ">
                {state.filteredCountries.length}
              </strong>{" "}
              Paises encontrados
            </p>
            <div className="flex bg-white w-full sm:w-80 rounded shadow-sm justify-between">
              <div className="px-3 py-1.5">
                <input
                  type="text"
                  className="bg-transparent flex-1 outline-none font-medium text-sm placeholder"
                  placeholder="Pesquisar paises..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="bg-customGreen-900 rounded-e px-2.5 flex items-center">
                <Search className="text-white size-4" />
              </div>
            </div>
          </div>
          <SortSelector />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative">
          {state.filteredCountries.map((country) => (
            <div
              key={country.name.common}
              className="border rounded shadow-md overflow-x-hidden relative"
              onMouseEnter={() => setHoveredCountry(country.name.common)}
              onMouseLeave={() => setHoveredCountry(null)}
              onClick={() => handleCountryClick(country.name.common)}
            >
              <img
                src={country.flags.png}
                alt={`Bandeira de ${country.name.common}`}
                className="w-full h-32 object-cover "
              />

              {hoveredCountry === country.name.common && (
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 
                flex items-center justify-center h-32 cursor-pointer"
                >
                  <span className="text-white font-medium">Ver detalhes</span>
                </div>
              )}

              <div className="bg-customGreen-900 h-5 -rotate-3 -mt-2"></div>
              <div className="bg-customGreen-600 h-1 -rotate-3 -mt-0.5"></div>

              <div className="p-1.5 bg-white">
                <h3 className="font-bold text-base text-customGreen-900 ">
                  {country.name.common}
                </h3>
                <p className="font-medium text-sm">
                  Capital: {country.capital?.[0] || "N/A"}
                </p>
                <p className="font-medium text-sm">
                  Região: {country.region || "N/A"}
                </p>
              </div>
            </div>
          ))}
          <div
            className="fixed right-4 sm:right-12 sm:bottom-10 bottom-4 rounded-full bg-customGreen-900
           text-white p-2 items-center shadow-md hover:bg-customGreen-600"
          >
            <a href="#header">
              <ChevronUp className="size-8" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
