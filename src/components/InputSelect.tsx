'use client';

import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Button } from './Button';

const SelectInput = ({ options, placeholder, setState }: { options: string[]; placeholder: string; setState: (option: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');

  const handleSelect = (option: string) => {
    setState(option);
    setIsOpen(false);
    setSelectedOption(option);
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
          {options.map((option: string) => (
            <li
              key={option}
              className="p-2 cursor-pointer hover:bg-gray-100"
              role="option"
              aria-selected={false}
              tabIndex={0}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleSelect(option);
                }
              }}
            >
              {option}
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
export default SelectInput;
