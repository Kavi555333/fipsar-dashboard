'use client';
import { create } from 'zustand';

type Store = {
  activeHeader: string;
  activePageTab: string;
  setHeader: (id: string) => void;
  setPageTab: (id: string) => void;
};

export const useHeaderStore = create<Store>((set) => ({
  // default header (must exist in header-tabs.csv)
  activeHeader: 'performance',

  // page tab will be set dynamically based on header
  activePageTab: '',

  // setHeader: (id) =>
  //   set({
  //     activeHeader: id,
  //     activePageTab: '', // reset page tab ONLY when header changes
  //   }),

   setHeader: (id) =>
      set((state) => {
          if (state.activeHeader === id) return state; // KEY FIX
          return { activeHeader: id, activePageTab: '' }
    }),


  setPageTab: (id) =>
    set({
      activePageTab: id,
    }),
}));