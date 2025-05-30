// src/slices/eventsSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { PublicEvent, Question } from '../models/models'

interface EventsState {
  events: PublicEvent[]
  currentEvent?: string
}

const initialState: EventsState = {
    events: [
      {
        id: '1',
        title: 'Événement test',    // <- Ici doit y avoir un titre
        questions: [
          {
            id: 'q1',
            content: 'Question test 1',
            upvotes: 0,
            author: 'Alice',
            color: '#FF0000',
            position: { x: 0, y: 0 },
            size: { width: 100, height: 50 },
            createdAt: new Date().toISOString(),
          },
          {
            id: 'q2',
            content: 'Question test 2',
            upvotes: 0,
            author: 'Bob',
            color: '#00FF00',
            position: { x: 10, y: 20 },
            size: { width: 120, height: 60 },
            createdAt: new Date().toISOString(),
          }
        ]
      }
    ]
  }
  

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setCurrentEvent: (state, action: PayloadAction<string>) => {
      state.currentEvent = action.payload
    },
    upvoteQuestion: (
      state,
      action: PayloadAction<{ eventId: string; questionId: string }>
    ) => {
      const event = state.events.find((e) => e.id === action.payload.eventId)
      const question = event?.questions.find((q) => q.id === action.payload.questionId)
      if (question) {
        question.upvotes += 1
      }
    },
    addQuestion: (
      state,
      action: PayloadAction<{ eventId: string; question: Question }>
    ) => {
      const event = state.events.find((e) => e.id === action.payload.eventId);
      if (event) {
        event.questions.push(action.payload.question);
      }
    },
    deleteQuestion: (
      state,
      action: PayloadAction<{ eventId: string; questionId: string }>
    ) => {
      const { eventId, questionId } = action.payload
      const event = state.events.find((e) => e.id === eventId)
      if (event) {
        event.questions = event.questions.filter((q) => q.id !== questionId)
      }
    },
    
  },
})

export const { setCurrentEvent, upvoteQuestion, addQuestion, deleteQuestion } = eventsSlice.actions
export default eventsSlice.reducer
