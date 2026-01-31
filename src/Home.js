import { Context } from "./context"
import { useContext } from 'react'

export default function Home () {
  const value = useContext(Context)
  if (value.loading) {
    return <></>
  }
  return (
    <>
      <img src={value.image} width={300} alt='dog'/>
    </>
  )
}