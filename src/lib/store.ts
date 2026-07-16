import { create } from "zustand";

interface FilterStore {
  searchKeyword: string;
  selectedProvinsi: string;
  selectedKota: string;
  selectedJurusan: string;
  page: number;

  setSearchKeyword: (value: string) => void;
  setSelectedProvinsi: (value: string) => void;
  setSelectedKota: (value: string) => void;
  setSelectedJurusan: (value: string) => void;
  setPage: (page: number) => void;
  resetFilter: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  searchKeyword: "",
  selectedProvinsi: "",
  selectedKota: "",
  selectedJurusan: "",
  page: 1,

  setSearchKeyword: (value) => set({ searchKeyword: value }),
  setSelectedProvinsi: (value) =>
    set({
      selectedProvinsi: value,
      selectedKota: "", // reset kota saat provinsi berubah (opsional)
      page: 1,
    }),
  setSelectedKota: (value) =>
    set({
      selectedKota: value,
      page: 1,
    }),
  setSelectedJurusan: (value) =>
    set({
      selectedJurusan: value,
      page: 1,
    }),
  setPage: (page) => set({ page }),

  resetFilter: () =>
    set({
      searchKeyword: "",
      selectedProvinsi: "",
      selectedKota: "",
      selectedJurusan: "",
      page: 1,
    }),
}));