// src/pages/AddQuestionPage.tsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { v4 as uuidv4 } from 'uuid';
import type { RootState } from '../store';
import { addQuestion } from '../slices/eventsSlice';

const AddQuestionPage = () => {
  const { eventId: paramEventId } = useParams<{ eventId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const events = useSelector((state: RootState) => state.events.events);

  // État local pour eventId sélectionné (initialisé à celui de l'URL si présent)
  const [selectedEventId, setSelectedEventId] = useState<string | undefined>(paramEventId);

  // Trouve l'événement correspondant à selectedEventId
  const event = events.find((e) => e.id === selectedEventId);

  const [form, setForm] = useState({
    content: '',
    author: '',
    color: '#000000',
    x: 0,
    y: 0,
    width: 100,
    height: 50,
    isAnonymous: false
  });

  // Si l'eventId dans l'URL change, on synchronise selectedEventId (utile si tu navigues directement)
  useEffect(() => {
    setSelectedEventId(paramEventId);
  }, [paramEventId]);

  const handleEventChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedEventId(e.target.value);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;
    const val = type === 'checkbox' && 'checked' in event.target
      ? (event.target as HTMLInputElement).checked
      : value;
  
    setForm((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId) return alert('Veuillez choisir un événement');

    dispatch(addQuestion({
      eventId: selectedEventId,
      question: {
        id: uuidv4(),
        content: form.content,
        author: form.author,
        color: form.color,
        isAnonymous: form.isAnonymous,
        position: { x: Number(form.x), y: Number(form.y) },
        size: { width: Number(form.width), height: Number(form.height) },
        createdAt: new Date().toISOString(),
        upvotes: 0,
      }
    }));
    navigate(`/admin/event/${selectedEventId}`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ajouter une question</h1>

      {/* Sélecteur d'événement */}
      <label htmlFor="eventSelect" className="block mb-2 font-semibold">Choisissez un événement :</label>
      <select
        id="eventSelect"
        value={selectedEventId ?? ''}
        onChange={handleEventChange}
        className="mb-6 p-2 border rounded w-full"
      >
        <option value="" disabled>-- Sélectionnez un événement --</option>
        {events.map((e) => (
          <option key={e.id} value={e.id}>
            {e.title}
          </option>
        ))}
      </select>

      {/* Affiche formulaire uniquement si un événement est sélectionné */}
      {event ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Pour l'événement : {event.title}</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              name="content"
              placeholder="Contenu de la question"
              value={form.content}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="author"
              placeholder="Auteur"
              value={form.author}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <input
              type="color"
              name="color"
              value={form.color}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isAnonymous"
                checked={form.isAnonymous}
                onChange={handleChange}
              />
              Poser anonymement
            </label>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Ajouter la question
            </button>
          </form>
        </>
      ) : (
        <p className="text-gray-500">Veuillez sélectionner un événement pour poser une question.</p>
      )}
    </div>
  );
};

export default AddQuestionPage;
