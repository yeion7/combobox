import React, { LabelHTMLAttributes } from 'react';
import ArrowIcon from './Components/ArrowIcon';
import XIcon from './Components/XIcon';
import { House } from './App';

type DivElement = React.FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>>
export const ComboBox: DivElement = ({ children, ...restProps }) => (
  <div className='Combobox' {...restProps}>
    {children}
  </div>
);

export const ComboBoxLabel: React.FC<LabelHTMLAttributes<HTMLLabelElement>> =
  ({ children, ...restProps }) => (
    <label
      {...restProps}
      className='Combobox-label'
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
  id,
  ...restProps
}) => (
    <div className="relative">
      <input
        {...restProps}
        id={id}
        type='text'
        className={`Combobox-input ${isOpen ? "Combobox-input__open" : ''}`}
        value={value}
        onChange={onChange}
      />
      <button
        className='Combobox-button'
        onClick={(selectedItem && !isOpen) ? clear : toggleMenu}
        aria-label={isOpen ? 'Cerrar Menu' : 'Abrir Menu'}
        aria-haspopup="true"
      >
        {(isOpen || selectedItem) ? <XIcon /> : <ArrowIcon />}
      </button>
    </div>
  );

interface Menu {
  isOpen?: boolean;
  id: string
}
type ULElement = React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>
export const ComboBoxMenu: React.FC<Menu & ULElement> = ({ children, isOpen = false, id, ...restProps }) => {
  return (
    <div className="relative">
      <ul
        {...restProps}
        className={`Combobox-menu ${isOpen ? 'Combobox-menu__open' : ''}`}
        id={id}
      >
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
type LIElement = React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
export const ComboBoxItem: React.FC<Item & LIElement> =
  ({ children, onClick, isSelected, id, ...restProps }) => (
    <li
      {...restProps}
      id={id}
      className={`Combobox-item ${isSelected ? 'Combobox-item__selected' : ''}`}
      onClick={onClick}
    >
      {children}
    </li>
  );
