import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCountries, Country } from "../context/countries-context";
import { ChevronLeft } from "lucide-react";

export function CountryDetails() {
  const { countryName } = useParams<{ countryName: string }>();
  const { state, dispatch } = useCountries();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,subregion,population,area,languages,currencies,timezones,tld,idd,translation"
        );

        const data = await response.json();
        dispatch({ type: "SET_COUNTRIES", payload: data });
      } catch (error) {
        console.error("Error ao buscar paises", error);
      }
    }

    fetchCountries();

    const selectedCountry = state.countries.find(
      (country) =>
        country.name.common.toLowerCase() ===
        decodeURIComponent(countryName || "").toLowerCase()
    );
    dispatch({
      type: "SET_SELECTED_COUNTRY",
      payload: selectedCountry ?? null,
    });
  }, [countryName, state.countries]);

  function formatLanguages(
    languages: Record<string, string> | undefined
  ): string {
    if (!languages) return "Não disponível";
    return Object.values(languages).join(", ");
  }

  function handleClickNavigate() {
    navigate("/countries");
  }

  function formatCurrencies(country: Country | null | undefined): string {
    if (!country || !country.currencies) {
      return "Informação de moeda não disponível";
    }

    const currencyEntries = Object.entries(country.currencies);

    if (currencyEntries.length === 0) {
      return "Nenhuma moeda listada";
    }

    const formattedCurrencies = currencyEntries.map(([code, details]) => {
      const name = details.name || "Nome não disponível";
      const symbol = details.symbol || "Símbolo não disponível";
      return `${code}: ${name} (${symbol})`;
    });

    if (formattedCurrencies.length === 1) {
      return formattedCurrencies[0];
    }

    return formattedCurrencies.join(", ");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <button
          onClick={handleClickNavigate}
          className="flex items-center rounded py-1.5 px-3 font-medium mb-6 text-white bg-customGreen-900 hover:bg-customGreen-800 transition-colors"
        >
          <ChevronLeft className="mr-1" />
          Voltar
        </button>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-4">
              <img
                className="w-full h-auto rounded"
                src={state.selectedCountry?.flags.png}
                alt={`Bandeira de ${state.selectedCountry?.name.common}`}
              />
            </div>

            <div className="w-full md:w-1/2 p-4">
              <h1 className="font-bold text-2xl text-customGreen-900 mb-4">
                {state.selectedCountry?.name.common}
              </h1>
              <p className="mb-4">
                <span className="font-semibold">Nome oficial:</span>{" "}
                {state.selectedCountry?.name.official}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p>
                    <span className="font-semibold">Capital:</span>{" "}
                    {state.selectedCountry?.capital}
                  </p>
                  <p>
                    <span className="font-semibold">Região:</span>{" "}
                    {state.selectedCountry?.region}
                  </p>
                  <p>
                    <span className="font-semibold">Sub-Região:</span>{" "}
                    {state.selectedCountry?.subregion}
                  </p>
                  <p>
                    <span className="font-semibold">Idiomas falados:</span>{" "}
                    {formatLanguages(state.selectedCountry?.languages)}
                  </p>
                  <p>
                    <span className="font-semibold">População:</span>{" "}
                    {state.selectedCountry?.population?.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-semibold">Área:</span>{" "}
                    {state.selectedCountry?.area?.toLocaleString()} km²
                  </p>
                  <p>
                    <span className="font-semibold">Moeda:</span>{" "}
                    {formatCurrencies(state.selectedCountry)}
                  </p>
                  <p>
                    <span className="font-semibold">Fuso horário:</span>{" "}
                    {state.selectedCountry?.timezones?.[0]}
                  </p>
                  <p>
                    <span className="font-semibold">Domínio de internet:</span>{" "}
                    {state.selectedCountry?.tld?.[0]}
                  </p>
                  <p>
                    <span className="font-semibold">Código de discagem:</span>{" "}
                    {state.selectedCountry?.idd.root}
                    {state.selectedCountry?.idd.suffixes?.[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
