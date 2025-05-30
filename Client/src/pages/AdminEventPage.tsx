import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store'
import { deleteQuestion } from '../slices/eventsSlice'
import Question from '../components/Question'
import EventSwitcher from '../components/EventSwitcher'

const AdminEventPage = () => {
    const dispatch = useDispatch()
    const { eventId } = useParams()
    const event = useSelector((state: RootState) =>
        state.events.events.find((e) => e.id === eventId)
    )

    if (!event) {
        return (
            <div className="flex items-center justify-center h-screen bg-blue-50 px-4">
                <p className="text-lg font-semibold text-blue-600 text-center">Événement introuvable.</p>
            </div>
        )
    }

    return (
        
        <div className="min-h-screen bg-blue-50 p-4 sm:p-6">
            <EventSwitcher basePath="admin" />
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-4 sm:p-6">
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-800 mb-4 sm:mb-6 text-center sm:text-left">
                    Admin : {event.title}
                </h1>
                <div className="space-y-4">
                    {event.questions.map((q) => (
                        <div
                            key={q.id}
                            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-blue-100 border border-blue-300 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="w-full sm:w-auto flex-1">
                                <Question eventId={event.id} question={q} />
                            </div>

                            <button
                                onClick={() =>
                                    dispatch(deleteQuestion({ eventId: event.id, questionId: q.id }))
                                }
                                className="text-red-500 hover:text-red-700 font-medium whitespace-nowrap"
                            >
                                Supprimer
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default AdminEventPage
