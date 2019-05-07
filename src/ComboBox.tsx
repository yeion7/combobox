import React, { LabelHTMLAttributes } from 'react';
import ArrowIcon from './Components/ArrowIcon';
import XIcon from './Components/XIcon';
import { House } from './App';

export const ComboBox: React.FC = ({ children }) => (
  <div className='Combobox'>
    {children}
  </div>
);

export const ComboBoxLabel: React.FC<LabelHTMLAttributes<HTMLLabelElement>> = ({ children, ...restProps }) => (
  <label 
    className='Combobox-label' 
    {...restProps}
  >
    {children}
  </label>
);

interface Input {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  toggleMenu: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  clear: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  selectedItem: House | null;
  isOpen: boolean;
  id: string
}

export const ComboBoxInput: React.FC<Input> = ({
  value,
  onChange,
  toggleMenu,
  isOpen,
  selectedItem,
  clear,
  id
}) => (
    <div className="relative">
      <input
        id={id}
        type='text'
        className={`Combobox-input ${isOpen ? "Combobox-input__open" : ''}`}
        value={value}
        onChange={onChange}
      />
      <button className='Combobox-button' onClick={(selectedItem && !isOpen) ? clear : toggleMenu}>
        {(isOpen || selectedItem) ? <XIcon /> : <ArrowIcon />}
      </button>
    </div>
  );

interface Menu {
  isOpen?: boolean;
  id: string
}
export const ComboBoxMenu: React.FC<Menu> = ({ children, isOpen = false, id }) => {
  return (
    <div className="relative">
      <ul className={`Combobox-menu ${isOpen ? 'Combobox-menu__open' : ''}`} id={id}>
        {isOpen ? children : null}
      </ul>
    </div>
  );
};

interface Item {
  onClick: any;
  isSelected: boolean;
  id: string
}
export const ComboBoxItem: React.FC<Item> = ({ children, onClick, isSelected, id }) => (
  <li
    id={id}
    className={`Combobox-item ${isSelected ? 'Combobox-item__selected' : ''}`}
    onClick={onClick}>
    {children}
  </li>
);
