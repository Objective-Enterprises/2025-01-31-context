import { useEffect, useState, useReducer } from 'react'
import GuestList from './GuestList'
import Settings from './Settings'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Home from './Home'
import Indicator from './Indicator'
import { Context } from './context'

const INVITE = 'INVITE'
const START = 'START'
const UNINVITE = 'UNINVITE'
const FINISH = 'FINISH'

export default function App() {
  function reducer (state, action) {
    if (action.type === START) {
      const newState = { ...state, loading: true }
      return newState
    }
    if (action.type === START) {
      return { ...state, loading: false, image: action.payload }
    }
    if (action.type === INVITE) {
      const newGuests = [...state.guests, action.payload]
      return { ...state, guests: newGuests }
    }
    if (action.type === UNINVITE) {
      const newGuests = state.guests.filter(guest => guest !== action.payload)
      return { ...state, guests: newGuests }
    }
  }
  const [state, dispatch] = useReducer(reducer, {
    guests: ['Dorothy', 'Zelda', 'Tallulah'],
    image: undefined,
    loading: false
  })
  console.log('state', state)
  async function download() {
    dispatch({ type: START })
    const url = 'https://dog.ceo/api/breeds/image/random'
    const response = await fetch(url)
    const data = await response.json()
    dispatch({ type: FINISH, payload: data.message })
  }
  useEffect(() => {
    download()
  }, [])
  function invite(name) {
    dispatch({ type: INVITE, payload: name })
  }
  function uninvite(name) {
    dispatch({ type: UNINVITE, payload: name })
  }
  const value = { ...state, download, invite, uninvite }
  return (
    <BrowserRouter>
      <Context value={value}>
        <h1>Dog Party App</h1>
        <Indicator />
        <div>
          <Link to="/">Home</Link> | <Link to="/guests">Guests</Link> | <Link to="/settings">Settings</Link>
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/guests' element={<GuestList />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </Context>
    </BrowserRouter>
  )
}