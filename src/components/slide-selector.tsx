import { useCountries } from "../context/countries-context";

export function SlideSelector() {
  const { state, dispatch } = useCountries();

  function handlePopulationFilterChange(range: string) {
    dispatch({ type: "SET_POPULATION_FILTER", payload: range });
    dispatch({ type: "APPLY_FILTERS" });
  }

  const populationOptions = [
    { value: "lt1m", label: "Menor que 1M", position: "left-[10%]" },
    { value: "1m-10m", label: "1M a 10M", position: "left-[35%]" },
    { value: "10m-100m", label: "10M a 100M", position: "left-[60%]" },
    { value: "gt100m", label: "Maior que 100M", position: "left-[85%]" },
  ];

  return (
    <div className="w-full">
      <h3 className="text-sm tracking-wide font-medium mb-6">População</h3>

      <div className="relative w-full">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-0.5 bg-black"></div>

        <div className="relative w-full h-full flex">
          {populationOptions.map((option) => (
            <label
              key={option.value}
              className="flex-1 relative cursor-pointer"
            >
              <input
                type="radio"
                name="population-filter"
                value={option.value}
                checked={state.populationFilter === option.value}
                onChange={() => handlePopulationFilterChange(option.value)}
                className="sr-only"
              />
              <span
                className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-7 h-7 rounded-full border-2 
                ${
                  state.populationFilter === option.value
                    ? "border-4 scale-75"
                    : "border-2"
                } 
                border-black bg-white transition-all duration-150 ease-in-out`}
              ></span>
            </label>
          ))}
        </div>

        {state.populationFilter && (
          <div
            className={`absolute top-1/2 transform -translate-y-1/2 w-3 h-3 bg-black rounded-full border-2 border-white transition-all duration-150 ease-in-out
              ${
                populationOptions.find(
                  (opt) => opt.value === state.populationFilter
                )?.position
              }
            `}
          ></div>
        )}

        <span
          className="absolute left-1/2 transform -translate-x-1/2 mt-8 text-sm font-bold transition-all duration-150 ease-in-out"
          style={{
            left: state.populationFilter
              ? populationOptions.find(
                  (opt) => opt.value === state.populationFilter
                )?.position
              : "50%",
            opacity: 1,
          }}
        >
          {state.populationFilter
            ? populationOptions.find(
                (opt) => opt.value === state.populationFilter
              )?.label
            : "Todos os países"}
        </span>
      </div>
    </div>
  );
}
