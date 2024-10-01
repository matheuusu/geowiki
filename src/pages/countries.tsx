import { useEffect } from "react";
import { CountriesProvider, useCountries } from "../context/countries-context";
import { Sidebar } from "../components/sidebar";
import { MainContent } from "../components/main-content";

function AppContent() {
  const { dispatch } = useCountries();

  useEffect(() => {
    async function fetchCountries() {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,subregion,population,area,languages,currencies,timezones,tld,idd"
        );

        const data = await response.json();
        dispatch({ type: "SET_COUNTRIES", payload: data });
      } catch (error) {
        console.error("Error ao buscar paises", error);
      }
    }

    fetchCountries();
  }, [dispatch]);

  return (
    <div className="flex relative">
      <Sidebar />
      <MainContent />
    </div>
  );
}

export function Countries() {
  return (
    <CountriesProvider>
      <AppContent />
    </CountriesProvider>
  );
}
