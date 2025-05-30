// src/pages/AddQuestionPage.tsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';


import { v4 as uuidv4 } from 'uuid';
import type { RootState } from '../store';
import { addQuestion } from '../slices/eventsSlice';

const AddQuestionPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const event = useSelector((state: RootState) =>
    state.events.events.find((e) => e.id === eventId)
  );

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
    if (!eventId) return;
    dispatch(addQuestion({
      eventId,
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
    navigate(`/admin/event/${eventId}`);
  };

  if (!event) return <p className="text-red-500">Événement introuvable</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ajouter une question à "{event.title}"</h1>
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
          className="bg-blue-500 text-white px-4 py-2 rounded "
        >
          Ajouter la question
        </button>
      </form>
    </div>
  );
};

export default AddQuestionPage;
