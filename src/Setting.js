import { Context } from "./context"
import { useContext } from 'react'

export default function Setting(props) {
  const value = useContext(Context)
  const invited = value.guests.includes(props.name)
  return (
    <button
      onClick={() => {
        if (invited) {
          value.uninvite(props.name)
        } else {
          value.invite(props.name)
        }
      }}
    >
      {props.name}: {invited ? 'Invited' : 'Not Invited'}
    </button>
  )
}