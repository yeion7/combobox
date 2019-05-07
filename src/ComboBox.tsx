import React from 'react';
import ArrowIcon from './Components/ArrowIcon';
import XIcon from './Components/XIcon';
import { House } from './App';

export const ComboBox: React.FC = ({ children }) => (
  <div className='Combobox'>
    {children}
  </div>
);

export const ComboBoxLabel: React.FC = ({ children }) => (
  <div className='Combobox-label'>
    {children}
  </div>
);

interface Input {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  toggleMenu: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  clear: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  selectedItem: House | null;
  isOpen: boolean;
}

export const ComboBoxInput: React.FC<Input> = ({
  value,
  onChange,
  toggleMenu,
  isOpen,
  selectedItem,
  clear
}) => (
    <div className="relative">
      <input
        type='text'
        className={`Combobox-input ${isOpen ? "Combobox-input__open" : ''}`}
        value={value}
        onChange={onChange}
      />
      <div className='Combobox-button' onClick={(selectedItem && !isOpen) ? clear : toggleMenu}>
        {(isOpen || selectedItem) ? <XIcon /> : <ArrowIcon />}
      </div>
    </div>
  );

interface Menu {
  isOpen?: boolean;
}
export const ComboBoxMenu: React.FC<Menu> = ({ children, isOpen = false }) => {
  return (<div className="relative">
    <div className={`Combobox-menu ${isOpen ? 'Combobox-menu__open' : ''}`}>
      {isOpen ? children : null}
    </div>
  </div>);
};

interface Item {
  onClick: any;
  isSelected: boolean;
}
export const ComboBoxItem: React.FC<Item> = ({ children, onClick, isSelected }) => (
  <div className={`Combobox-item ${isSelected ? 'Combobox-item__selected' : ''}`} onClick={onClick}>
    {children}
  </div>
);
