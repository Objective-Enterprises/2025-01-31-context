import { useContext } from 'react'
import { Context } from './context'

export default function Indicator () {
  const value = useContext(Context)
  if (value.loading) {
    return <div>Loading image...</div>
  }
  return <div>Image loaded! <button onClick={value.download}>Download</button></div>
}