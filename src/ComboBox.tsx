import React, { LabelHTMLAttributes, forwardRef } from 'react';

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
  isOpen: boolean;
  id: string,
  buttonBox: React.ReactNode | null
}

type InputElement = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const ComboBoxInput = forwardRef<HTMLInputElement, Input & InputElement>(({
  value,
  onChange,
  isOpen,
  id,
  onKeyDown,
  buttonBox = null,
  ...restProps
}, ref) => (
    <div className="relative">
      <input
        {...restProps}
        id={id}
        type='text'
        ref={ref}
        className={`Combobox-input ${isOpen ? "Combobox-input__open" : ''}`}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {buttonBox}
    </div>
  ));

interface Menu {
  isOpen?: boolean;
  id: string
}
type ULElement = React.DetailedHTMLProps<React.HTMLAttributes<HTMLUListElement>, HTMLUListElement>
export const ComboBoxMenu = forwardRef<HTMLUListElement, Menu & ULElement>
  (({ children, isOpen = false, id, ...restProps }, ref) => {
    return (
      <div className="relative">
        <ul
          {...restProps}
          className={`Combobox-menu ${isOpen ? 'Combobox-menu__open' : ''}`}
          id={id}
          ref={ref}
        >
          {isOpen ? children : null}
        </ul>
      </div>
    );
  });

interface Item {
  onClick: any;
  isSelected: boolean;
  id: string
}
type LIElement = React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>
export const ComboBoxItem: React.FC<Item & LIElement> =
  ({ children, onClick, isSelected, id, className = '', ...restProps }) => (
    <li
      {...restProps}
      id={id}
      className={`Combobox-item ${className} ${isSelected ? 'Combobox-item__selected' : ''}`}
      onClick={onClick}
    >
      {children}
    </li>
  );
