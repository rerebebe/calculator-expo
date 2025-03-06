import { create } from 'zustand';

interface Participant {
  name: string;
  amount: number;
  isPayer: boolean;
  activity: string;
}

interface Event {
  id: string;
  title: string;
  date: Date;
  participants: Participant[];
  totalAmount: number;
}

interface EventsStore {
  events: Event[];
  addEvent: (event: Event) => void;
  updateEvent: (event: Event) => void;
  deleteEvent: (id: string) => void;
}

export const useEventsStore = create<EventsStore>((set) => ({
  events: [],
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (updatedEvent) =>
    set((state) => ({
      events: state.events.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      ),
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((event) => event.id !== id),
    })),
}));