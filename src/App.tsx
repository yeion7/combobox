import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="Combobox-container">
      <div className="Combobox-container">
        <div className="Combobox">
          <div className="Combobox-label">Selecciona algo:</div>
          <div className="relative">
            <input type="text" className="Combobox-input" />
            <div className="Combobox-button">
              <svg viewBox="0 0 20 20" preserveAspectRatio="none" width="16" fill="transparent"
                stroke="#979797" stroke-width="1.1px">
                <path d="M1,6 L10,15 L19,6"></path>
              </svg>
            </div>
          </div>
          <div className="relative">
            <div className='Combobox-menu'>
              <div className="Combobox-item">Option 1</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
