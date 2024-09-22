import { useState, useEffect } from "react";
import { Check, ChevronDown, ChevronUp, Globe } from "lucide-react";

// Interface para os dados dos países
interface Country {
  name: { common: string };
  region: string;
  subregion: string;
}

// Interface para as opções do seletor
interface Option {
  value: string;
  label: string;
}

// Props para o componente CategorySelector
interface CategorySelectorProps {
  onSelect: (value: string) => void;
  type: "region" | "subregion";
  selectedRegion?: string;
  placeholder: string;
}

export function CategorySelector({
  onSelect,
  type,
  selectedRegion,
  placeholder,
}: CategorySelectorProps) {
  // Estado para controlar se o menu dropdown está aberto ou fechado
  const [isOpen, setIsOpen] = useState(false);
  // Estado para armazenar a opção selecionada
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  // Estado para armazenar a lista de opções
  const [options, setOptions] = useState<Option[]>([]);

  // Efeito para buscar os dados quando o componente for montado
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,region,subregion"
        );
        const data: Country[] = await response.json();

        let uniqueOptions: Set<string>;
        if (type === "region") {
          // Para regiões, pegamos todas as regiões únicas
          uniqueOptions = new Set(data.map((country) => country.region));
        } else {
          // Para sub-regiões, filtramos primeiro pela região selecionada
          uniqueOptions = new Set(
            data
              .filter((country) => country.region === selectedRegion)
              .map((country) => country.subregion)
          );
        }

        // Convertemos o Set para um array de objetos Option
        const optionsArray = Array.from(uniqueOptions)
          .filter(Boolean) // Remove valores vazios ou null
          .map((value) => ({ value, label: value }));

        setOptions(optionsArray);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    fetchData();
  }, [type, selectedRegion]);

  // Função para alternar a abertura/fechamento do dropdown
  function handleToggle() {
    setIsOpen(!isOpen);
  }

  // Função para lidar com a seleção de uma opção
  function handleSelect(option: Option) {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.value);
  }

  return (
    <div className="relative">
      <div className="select">
        {/* Área clicável para abrir/fechar o dropdown */}
        <div className="relative grid gap-2">
          <label
            htmlFor={`options-view-button-${type}`}
            className="text-sm tracking-wide font-medium"
          >
            {type === "region" ? "Região" : "Sub-região"}
          </label>
          <input
            type="checkbox"
            id={`options-view-button-${type}`}
            className="hidden"
            checked={isOpen}
            onChange={handleToggle}
          />
          {/* Botão de seleção */}
          <div
            className="flex items-center justify-between w-full p-2 rounded-md cursor-pointer bg-customGreen-600"
            onClick={handleToggle}
          >
            <div className="flex items-center gap-2 font-medium">
              {selectedOption ? (
                <>
                  <Globe className="w-5 h-5" />
                  <span>{selectedOption.label}</span>
                </>
              ) : (
                placeholder
              )}
            </div>
            <div className="text-gray-500">
              {isOpen ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          </div>
        </div>
        {/* Lista de opções */}
        {isOpen && (
          <ul
            className="absolute z-10 w-full mt-1 bg-customGreen-600 border
           border-customGreen-900/10 rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {options.map((option) => (
              <li
                key={option.value}
                className="flex items-center p-2 cursor-pointer hover:bg-customGreen-300"
                onClick={() => handleSelect(option)}
              >
                <Globe className="w-5 h-5 mr-2" />
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
  );
}
