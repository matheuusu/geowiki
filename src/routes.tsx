import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Countries } from "./pages/countries";
import { CountryDetails } from "./pages/country-details";
import { CountriesProvider } from "./context/countries-context";

export function AppRoutes() {
  return (
    <CountriesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/countries" element={<Countries />} />
          <Route path="/country/:countryName" element={<CountryDetails />} />

          <Route path="*" element={<Navigate to="/countries" />} />
        </Routes>
      </BrowserRouter>
    </CountriesProvider>
  );
}
