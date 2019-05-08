import React, { useReducer, useMemo, useRef, EventHandler, MouseEvent } from 'react';
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
import { generateId, normalizeArrowKey, scrollIntoView } from './utils';
import XIcon from './Components/XIcon';
import ArrowIcon from './Components/ArrowIcon';

export type House = typeof DATA[0];

interface ComboBoxState {
  isOpen: boolean,
  inputValue: string,
  selectedItem: House | null,
  highlightedIndex: number | null
}

type Action = { type: "INPUT", payload: string }
  | { type: "SELECT", payload: House }
  | { type: "TOGGLE_MENU" }
  | { type: "OPEN_MENU" }
  | { type: "CLOSE_MENU" }
  | { type: "CLEAR" }
  | { type: "HIGHLIGH", payload: number }

const initialState: ComboBoxState = Object.freeze({
  isOpen: false,
  inputValue: '',
  selectedItem: null,
  highlightedIndex: null
})

const comboBoxReducer = (
  state: ComboBoxState = initialState,
  action: Action
): ComboBoxState => {
  switch (action.type) {
    case 'INPUT':
      return {
        ...state,
        inputValue: action.payload,
        isOpen: !!action.payload
      }
    case 'SELECT':
      return {
        ...state,
        inputValue: action.payload.name,
        selectedItem: action.payload,
        isOpen: false
      }
    case 'OPEN_MENU':
      return {
        ...state,
        isOpen: true
      }
    case 'CLOSE_MENU':
      return {
        ...state,
        isOpen: false
      }
    case 'TOGGLE_MENU':
      return {
        ...state,
        isOpen: !state.isOpen
      }
    case "HIGHLIGH":
      return {
        ...state,
        highlightedIndex: action.payload
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
  const inputRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLUListElement>(null)
  const optionsSorted = matchSorter(options, state.inputValue, {
    keys: ['name', 'words'],
  })

  const id = useMemo(() => `${generateId()}`, [])
  const menuId = `${id}-menu`
  const labelId = `${id}-label`
  const inputId = `${id}-input`
  const getItemId = ((index: number) => `${id}-item-${index}`)
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const getItemNodeFromIndex= (index: number) => {
    return document.getElementById(getItemId(index))
  }

  const clear = () => {
    dispatch({ type: 'CLEAR' })
    focusInput()
  }

  const toggleMenu: EventHandler<MouseEvent<HTMLButtonElement>> = (e) => {
    e.preventDefault()
    dispatch({ type: "TOGGLE_MENU" })
    focusInput()
  }

  const isOpen = state.isOpen && optionsSorted.length > 0

  return (
    <section>
      <ComboBox
        role='combobox'
        aria-labelledby={labelId}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
        aria-controls={inputId}
        aria-owns={menuId}
      >
        <ComboBoxLabel
          id={labelId}
          htmlFor={inputId}
        >
          Selecciona una casa:
        </ComboBoxLabel>
        <ComboBoxInput
          id={inputId}
          ref={inputRef}
          value={state.inputValue}
          onChange={(e) => {
            e.preventDefault()
            dispatch({ type: 'INPUT', payload: e.target.value })
          }}
          onKeyDown={(e) => {
            const key = normalizeArrowKey(e)

            if (key === 'Enter' && state.highlightedIndex !== null) {
              e.preventDefault()
              dispatch({
                type: 'SELECT',
                payload: optionsSorted[state.highlightedIndex]
              })
            }

            if (key === 'ArrowDown') {
              e.preventDefault()
              dispatch({ type: "OPEN_MENU" })

              const newIndex = state.highlightedIndex !== null
              ? (state.highlightedIndex + 1) % optionsSorted.length
              : 0

              dispatch({
                type: 'HIGHLIGH',
                payload: newIndex
              })

              scrollIntoView(getItemNodeFromIndex(newIndex), menuRef.current)
            }

            if (key === 'ArrowUp') {
              e.preventDefault()
              dispatch({ type: "OPEN_MENU" })
              
              const newIndex = state.highlightedIndex !== null
              ? (state.highlightedIndex - 1 + optionsSorted.length) % optionsSorted.length
              : optionsSorted.length - 1

              dispatch({
                type: 'HIGHLIGH',
                payload: newIndex
              })

              scrollIntoView(getItemNodeFromIndex(newIndex), menuRef.current)
            }

            if (key === 'Escape') {
              e.preventDefault()
              dispatch({ type: "CLEAR" })
            }
          }}
          onKeyUp={(e) => {
            e.preventDefault()
          }}
          isOpen={isOpen}
          buttonBox={
            <button
              className='Combobox-button'
              onClick={(state.selectedItem && !isOpen) ? clear : toggleMenu}
              aria-label={isOpen ? 'Cerrar Menu' : 'Abrir Menu'}
              aria-haspopup="true"
              onKeyDown={(e) => {
                const key = normalizeArrowKey(e)

                if (key === 'Enter' && state.highlightedIndex !== null && isOpen) {
                  e.preventDefault()
                  dispatch({
                    type: 'SELECT',
                    payload: optionsSorted[state.highlightedIndex]
                  })
                }

                if (key === 'ArrowDown') {
                  e.preventDefault()
                  dispatch({ type: "OPEN_MENU" })
                  dispatch({
                    type: 'HIGHLIGH',
                    payload: state.highlightedIndex !== null
                      ? (state.highlightedIndex + 1) % optionsSorted.length
                      : 0
                  })
                }
    
                if (key === 'ArrowUp') {
                  e.preventDefault()
                  dispatch({ type: "OPEN_MENU" })
                  dispatch({
                    type: 'HIGHLIGH',
                    payload: state.highlightedIndex !== null
                      ? (state.highlightedIndex - 1 + optionsSorted.length) % optionsSorted.length
                      : optionsSorted.length - 1
                  })
                }
              }}
            >
              {(isOpen || state.selectedItem) ? <XIcon /> : <ArrowIcon />}
            </button>
          }
          aria-autocomplete="list"
          aria-controls={menuId}
          aria-multiline="false"
          aria-activedescendant={
            state.highlightedIndex
              ? getItemId(state.highlightedIndex)
              : undefined
          }
        />
        <ComboBoxMenu
          id={menuId}
          isOpen={isOpen}
          role="listbox"
          aria-labelledby={labelId}
          ref={menuRef}
        >
          {
            optionsSorted
              .map((house, index) => (
                <ComboBoxItem
                  role="option"
                  aria-selected={
                    state.selectedItem
                      ? state.selectedItem.id === house.id
                      : state.highlightedIndex === index
                  }
                  className={
                    state.highlightedIndex === index
                      ? 'Combobox-item__highlighted'
                      : ''
                  }
                  isSelected={
                    state.selectedItem
                      ? state.selectedItem.id === house.id
                      : false
                  }
                  id={getItemId(index)}
                  key={house.id}
                  onClick={() => dispatch({ type: 'SELECT', payload: house })}
                  onMouseMove={() => {
                    dispatch({ type: 'HIGHLIGH', payload: index })
                  }}
                >
                  {house.name}
                </ComboBoxItem>
              ))
          }
        </ComboBoxMenu>
      </ComboBox>
      {
        state.selectedItem && (
          <section style={{ textAlign: 'center' }}>
            <h3 >{state.selectedItem.name}</h3>
            <figure>
              <img
                src={state.selectedItem.image || ''}
                alt={state.selectedItem.coatOfArms || ''}
              />
              <figcaption>{state.selectedItem.words}</figcaption>
            </figure>
          </section>
        )
      }
    </section>
  );
}

export default App;
