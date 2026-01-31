import { Context } from "./context"
import { useContext } from 'react'

export default function GuestList () {
  const value = useContext(Context)
  const guestItems = value.guests.map(guest => {
    return <div key={guest}>{guest}</div>
  })
  return (
    <>
      <h2>Guests</h2>
      {guestItems}
    </>
  )
}