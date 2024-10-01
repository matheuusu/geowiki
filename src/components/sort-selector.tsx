import { useState } from "react";
import { Check, ChevronDown, ChevronUp, ArrowUpDown } from "lucide-react";
import {
  useCountries,
  SortField,
  SortOrder,
} from "../context/countries-context";

interface SortOption {
  value: string;
  label: string;
  field: SortField;
  order: SortOrder;
}

export function SortSelector() {
  const { state, dispatch } = useCountries();
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions: SortOption[] = [
    { value: "name-asc", label: "A-Z", field: "name", order: "asc" },
    { value: "name-desc", label: "Z-A", field: "name", order: "desc" },
    {
      value: "population-desc",
      label: "Maior população",
      field: "population",
      order: "desc",
    },
    {
      value: "population-asc",
      label: "Menor população",
      field: "population",
      order: "asc",
    },
    { value: "area-desc", label: "Maior área", field: "area", order: "desc" },
    { value: "area-asc", label: "Menor área", field: "area", order: "asc" },
  ];

  function handleToggle() {
    setIsOpen(!isOpen);
  }

  function handleSelect(option: SortOption) {
    dispatch({
      type: "SET_SORT",
      payload: { field: option.field, order: option.order },
    });
    dispatch({ type: "APPLY_SORT" });
    setIsOpen(false);
  }

  const selectedOption = sortOptions.find(
    (option) =>
      option.field === state.sortField && option.order === state.sortOrder
  );

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2">
        <label
          htmlFor="sort-options-view-button"
          className="text-sm tracking-wide font-medium"
        >
          Organizar por:
        </label>
        <div className="relative">
          <input
            type="checkbox"
            id="sort-options-view-button"
            className="hidden"
            checked={isOpen}
            onChange={handleToggle}
          />
          <div
            className="flex items-center justify-between w-52 p-2 rounded-md 
            cursor-pointer text-white bg-customGreen-900"
            onClick={handleToggle}
          >
            <div className="flex items-center gap-2 font-medium">
              <ArrowUpDown className="w-5 h-5" />
              <span>{selectedOption ? selectedOption.label : "Selecione"}</span>
            </div>
            <div className="text-white">
              {isOpen ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          </div>
          {isOpen && (
            <ul
              className="absolute z-10 w-52 mt-1 bg-customGreen-600 border
             border-customGreen-900/10 rounded-md shadow-lg max-h-60 overflow-auto left-0"
            >
              {sortOptions.map((option) => (
                <li
                  key={option.value}
                  className="flex items-center p-2 cursor-pointer hover:bg-customGreen-300"
                  onClick={() => handleSelect(option)}
                >
                  <span>{option.label}</span>
                  {selectedOption?.value === option.value && (
                    <Check className="w-5 h-5 ml-auto text-customGreen-900" />
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
