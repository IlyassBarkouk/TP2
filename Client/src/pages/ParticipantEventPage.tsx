import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import EventPanel from '../components/EventPanel';
import type { RootState } from '../store';
import EventSwitcher from '../components/EventSwitcher';

const ParticipantEventPage: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();

  const event = useSelector((state: RootState) =>
    state.events.events.find((e) => e.id === eventId)
  );

  if (!event) return <p>Événement introuvable.</p>;

  // Copier et trier les questions par upvotes décroissants
  const sortedEvent = {
    ...event,
    questions: [...event.questions].sort((a, b) => b.upvotes - a.upvotes),
  };

  return (
    <div className="p-4">
      <EventSwitcher basePath="event" />
      <EventPanel event={sortedEvent} />
    </div>
  );
};


export default ParticipantEventPage;
