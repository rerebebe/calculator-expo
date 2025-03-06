// import { create } from 'zustand';
// import { storage } from './storage';

// export const useCalendarStore = create((set) => ({
//   notes: JSON.parse(storage.getString('notes') || '{}'),

//   addNote: (date: any, text: any) => {
//     set((state: any) => {
//       const updatedNotes = { ...state.notes, [date]: text };
//       storage.set('notes', JSON.stringify(updatedNotes));
//       return { notes: updatedNotes };
//     });
//   },

//   deleteNote: (date: any) => {
//     set((state: any) => {
//       const updatedNotes = { ...state.notes };
//       delete updatedNotes[date];
//       storage.set('notes', JSON.stringify(updatedNotes));
//       return { notes: updatedNotes };
//     });
//   },
// }));
