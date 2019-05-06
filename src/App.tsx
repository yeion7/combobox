import React from 'react';
import './App.css';
import ArrowIcon from './Components/ArrowIcon';

const ComboBox: React.FC = ({ children }) => (
  <div className='Combobox'>
    {children}
  </div>
)

const ComboBoxLabel: React.FC = ({ children }) => (
  <div className='Combobox-label'>
    {children}
  </div>
)

const ComboBoxInput: React.FC = () => (
  <div className="relative">
    <input type='text' className='Combobox-input'/>
    <div className='Combobox-button'>
      <ArrowIcon />
    </div>
  </div>
)

const ComboBoxMenu: React.FC<{isOpen?: boolean}> = ({ children, isOpen = false }) => {
  return (
    <div className="relative">
      <div className='Combobox-menu Combobox-menu__open'>
        {isOpen ? children : null}
      </div>
    </div>
  )
}

const ComboBoxItem: React.FC = ({ children }) => (
  <div className='Combobox-item Combobox-item__selected'>{children}</div>
)

const App: React.FC = () => {
  return (
    <ComboBox>
      <ComboBoxLabel>Selecciona algo:</ComboBoxLabel>
      <ComboBoxInput />
      <ComboBoxMenu>
        <ComboBoxItem>Option</ComboBoxItem>
      </ComboBoxMenu>
    </ComboBox>
  );
}

export default App;
