import React, { useReducer } from 'react';
import matchSorter from 'match-sorter'
import './App.css';

import {
  ComboBox,
  ComboBoxLabel,
  ComboBoxInput,
  ComboBoxMenu,
  ComboBoxItem
} from './ComboBox';


import DATA from './data.json'

export type House = typeof DATA[0];

interface ComboBoxState {
  isOpen: boolean,
  inputValue: string,
  selectedItem: House | null
}

type Action = { type: "INPUT", payload: string }
  | { type: "SELECT", payload: House }
  | { type: "TOGGLE_MENU" }
  | { type: "CLEAR" }

const initialState: ComboBoxState = {
  isOpen: false,
  inputValue: '',
  selectedItem: null
}

const comboBoxReducer = (
  state: ComboBoxState = initialState,
  action: Action
): ComboBoxState => {
  switch (action.type) {
    case 'INPUT':
      return {
        ...state,
        inputValue: action.payload,
        isOpen: state.selectedItem ? !action.payload : !!action.payload
      }
    case 'SELECT':
      return {
        ...state,
        inputValue: action.payload.name,
        selectedItem: action.payload,
        isOpen: false
      }
    case 'TOGGLE_MENU':
      return {
        ...state,
        isOpen: !state.isOpen
      }
    case "CLEAR":
      return initialState
    default:
      throw new Error('Action not valid');
  }
}

const options = DATA

const App: React.FC = () => {
  const [state, dispatch] = useReducer(comboBoxReducer, initialState)

  return (
    <section>
      <ComboBox>
        <ComboBoxLabel>Selecciona una casa:</ComboBoxLabel>
        <ComboBoxInput
          value={state.inputValue}
          onChange={(e) => dispatch({ type: 'INPUT', payload: e.target.value })}
          toggleMenu={(e) => {
            e.preventDefault()
            dispatch({ type: "TOGGLE_MENU" })
          }}
          isOpen={state.isOpen}
          selectedItem={state.selectedItem}
          clear={() => dispatch({ type: 'CLEAR' })}
        />
        <ComboBoxMenu isOpen={state.isOpen}>
          {
              matchSorter(options, state.inputValue, {
                keys: ['name', 'words'],
              })
              .map((house) => (
                <ComboBoxItem
                  key={house.id}
                  onClick={() => dispatch({ type: 'SELECT', payload: house })}
                  isSelected={state.selectedItem ? state.selectedItem.id === house.id : false}
                >
                  {house.name}
                </ComboBoxItem>
              ))
          }
        </ComboBoxMenu>
      </ComboBox>
      {
        state.selectedItem && (
          <div style={{ textAlign: 'center' }}>
            <h3>{state.selectedItem.name}</h3>
            <figure>
              <img 
                src={state.selectedItem.image || ''} 
                alt={state.selectedItem.coatOfArms || ''} 
              />
              <figcaption>{state.selectedItem.words}</figcaption>
            </figure>
          </div>
        )
      }
    </section>
  );
}

export default App;
