'use client';
import { create } from 'zustand';

type Store = {
  activeHeader: string;
  activePageTab: string;
  setHeader: (id: string) => void;
  setPageTab: (id: string) => void;
  resetPageTab: (id: string) => void;
};

export const useHeaderStore = create<Store>((set) => ({
  activeHeader: 'performance',
  activePageTab: '',
  setHeader: (id) => set({ activeHeader: id, activePageTab: '' }),
  setPageTab: (id) => set({ activePageTab: id }),
  resetPageTab: (id) => set({ activePageTab: id }),
}));