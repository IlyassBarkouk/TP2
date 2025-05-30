import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'

interface Props {
  basePath: 'admin' | 'participant' | 'event'  // J'ajoute 'event' pour la complétude
}

const EventSwitcher: React.FC<Props> = ({ basePath }) => {
  const events = useSelector((state: RootState) => state.events.events)
  const { eventId } = useParams()
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  if (basePath === 'admin') {
    navigate(`/admin/event/${e.target.value}`)
  } else if (basePath === 'participant' || basePath === 'event') {
    navigate(`/event/${e.target.value}`)
  }
}


  return (
    <div className="mb-4">
      <label className="text-sm font-medium text-gray-700 mr-2">
        Choisir un événement :
      </label>
      <select
        value={eventId}
        onChange={handleChange}
        className="border border-gray-300 rounded-md px-3 py-1"
      >
        {events.map((event) => (
          <option key={event.id} value={event.id}>
            {event.title}
          </option>
        ))}
      </select>
    </div>
  )
}

export default EventSwitcher
