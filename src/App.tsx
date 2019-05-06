import React, { useReducer } from 'react';
import './App.css';
import {
  ComboBox,
  ComboBoxLabel,
  ComboBoxInput,
  ComboBoxMenu,
  ComboBoxItem
} from './ComboBox';

interface ComboBoxState {
  isOpen: boolean,
  inputValue: string,
  selectedItem: number | null
}

type Action = { type: "INPUT", payload: string }
  | { type: "SELECT", payload: { id: number, label: string } }
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
        inputValue: action.payload.label,
        selectedItem: action.payload.id,
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

const options = [{ id: 1, label: 'Mango' }, { id: 2, label: 'Manzana' }]

const App: React.FC = () => {
  const [state, dispatch] = useReducer(comboBoxReducer, initialState)

  return (
    <ComboBox>
      <ComboBoxLabel>Selecciona algo:</ComboBoxLabel>
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
          options
            .filter(({ label }) => label.includes(state.inputValue))
            .map(({ id, label }) => (
              <ComboBoxItem
                key={id}
                onClick={() => dispatch({ type: 'SELECT', payload: { id, label } })}
                isSelected={state.selectedItem === id}
              >
                {label}
              </ComboBoxItem>
            ))
        }
      </ComboBoxMenu>
    </ComboBox>
  );
}

export default App;
