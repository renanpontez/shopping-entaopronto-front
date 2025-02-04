import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Button } from './atoms/Button';

type OptionType = {
  label: string;
  value: string;
};

type SelectInputType = {
  options: OptionType[];
  placeholder: string;
  onOptionSelected: (option: string) => void;
  selectedOption: string;
};

export const SelectInput = ({
  options,
  placeholder,
  onOptionSelected,
  selectedOption,
}: SelectInputType) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onOptionSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-64">
      {!isOpen && (
        <Button
          variant="secondary-outlined"
          type="button"
          Icon={<MdKeyboardArrowDown />}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="text-secondary-dark">{selectedOption || placeholder}</span>
        </Button>
      )}
      {isOpen && (
        <ul onMouseLeave={() => setIsOpen(false)} className="absolute w-full mt-2 bg-white border border-darkLight rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
          {options.map((option: OptionType) => (
            <li
              key={option.value}
              className="p-2 cursor-pointer hover:bg-gray-100"
              role="option"
              aria-selected={false}
              tabIndex={0}
              onClick={() => handleSelect(option.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleSelect(option.value);
                }
              }}
            >
              {option.label}
            </li>
          ))}
          { selectedOption && (
            <li
              className="p-2 cursor-pointer hover:bg-gray-100"
              role="option"
              aria-selected={false}
              tabIndex={0}
              onClick={() => handleSelect('')}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleSelect('');
                }
              }}
            >
              Remover filtro
            </li>
          ) }
        </ul>
      )}
    </div>
  );
};
