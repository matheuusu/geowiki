import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  act,
} from "react";

export interface Country {
  name: {
    common: string;
    official: string;
  };
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area: number;
  languages?: { [key: string]: string };
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  timezones: string[];
  tld?: string[];
  idd: {
    root: string;
    suffixes?: string[];
  };
}

export type SortField = "name" | "population" | "area";
export type SortOrder = "asc" | "desc";

// Definindo o estado inicial
interface CountriesState {
  countries: Country[];
  filteredCountries: Country[];
  selectedCountry: Country | null;
  selectedRegion: string;
  selectedSubregion: string;
  populationFilter: string;
  searchTerm: string;
  sortField: SortField;
  sortOrder: SortOrder;
}

// Definindo as ações possíveis
type CountriesAction =
  | { type: "SET_COUNTRIES"; payload: Country[] }
  | { type: "SET_REGION"; payload: string }
  | { type: "SET_SUBREGION"; payload: string }
  | { type: "SET_SELECTED_COUNTRY"; payload: Country | null }
  | { type: "SET_POPULATION_FILTER"; payload: string }
  | { type: "SET_SEARCH_FILTER"; payload: string }
  | { type: "APPLY_FILTERS" }
  | { type: "RESET_FILTERS" }
  | { type: "SET_SORT"; payload: { field: SortField; order: SortOrder } }
  | { type: "APPLY_SORT" };

// Criando o contexto
const CountriesContext = createContext<
  | {
      state: CountriesState;
      dispatch: React.Dispatch<CountriesAction>;
    }
  | undefined
>(undefined);

// Função reducer para gerenciar o estado
function countriesReducer(
  state: CountriesState,
  action: CountriesAction
): CountriesState {
  switch (action.type) {
    case "SET_SORT":
      return {
        ...state,
        sortField: action.payload.field,
        sortOrder: action.payload.order,
      };

    case "APPLY_SORT":
      return {
        ...state,
        filteredCountries: [...state.filteredCountries].sort((a, b) => {
          let comparison = 0;
          switch (state.sortField) {
            case "name":
              comparison = a.name.common.localeCompare(b.name.common);
              break;
            case "population":
              comparison = a.population - b.population;
              break;
            case "area":
              comparison = a.area - b.area;
              break;
          }
          return state.sortOrder === "asc" ? comparison : -comparison;
        }),
      };

    case "SET_SELECTED_COUNTRY":
      return { ...state, selectedCountry: action.payload };

    case "SET_SEARCH_FILTER":
      return { ...state, searchTerm: action.payload };

    case "SET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        filteredCountries: action.payload,
      };

    case "SET_REGION":
      return {
        ...state,
        selectedRegion: action.payload,
        selectedSubregion: "",
      };

    case "SET_SUBREGION":
      return { ...state, selectedSubregion: action.payload };

    case "SET_POPULATION_FILTER":
      return { ...state, populationFilter: action.payload };

    case "APPLY_FILTERS":
      return {
        ...state,
        filteredCountries: state.countries.filter(
          (country) =>
            (!state.selectedRegion ||
              country.region === state.selectedRegion) &&
            (!state.selectedSubregion ||
              country.subregion === state.selectedSubregion) &&
            applyPopulationFilter(country.population, state.populationFilter) &&
            country.name.common
              .toLowerCase()
              .includes(state.searchTerm.toLowerCase())
        ),
      };

    case "RESET_FILTERS":
      return {
        ...state,
        selectedRegion: "",
        selectedSubregion: "",
        populationFilter: "",
        filteredCountries: state.countries, // Reset para todos os países
      };
    default:
      return state;
  }
}

// Função auxiliar para aplicar o filtro de população
function applyPopulationFilter(population: number, filter: string): boolean {
  switch (filter) {
    case "lt1m":
      return population < 1000000;
    case "1m-10m":
      return population >= 1000000 && population < 10000000;
    case "10m-100m":
      return population >= 10000000 && population < 100000000;
    case "gt100m":
      return population >= 100000000;
    default:
      return true; // Se não houver filtro, retorna true para todos os países
  }
}

// Provedor do contexto
export function CountriesProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(countriesReducer, {
    countries: [],
    filteredCountries: [],
    selectedCountry: null,
    selectedRegion: "",
    selectedSubregion: "",
    populationFilter: "",
    searchTerm: "",
    sortField: "name",
    sortOrder: "asc",
  });

  return (
    <CountriesContext.Provider value={{ state, dispatch }}>
      {children}
    </CountriesContext.Provider>
  );
}

// Hook personalizado para usar o contexto
export function useCountries() {
  const context = useContext(CountriesContext);
  if (context === undefined) {
    throw new Error("useCountries must be used within a CountriesProvider");
  }
  return context;
}
