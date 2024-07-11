import { create } from 'zustand';

const useStore = create((set) => ({
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  favorites: [],
  setFavorites: (newFavorites) => {
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    set({ favorites: newFavorites });
  },
  addFavorite: (id) => set((state) => {
    let updatedFavorites;
    if (state.favorites.includes(id)) {
      updatedFavorites = state.favorites;
    } else {
      if (state.favorites.length >= 5) {
        updatedFavorites = [...state.favorites.slice(1), id];
      } else {
        updatedFavorites = [...state.favorites, id];
      }
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
    return { favorites: updatedFavorites };
  }),
  removeFavorite: (id) => set((state) => {
    const updatedFavorites = state.favorites.filter((favId) => favId !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    return { favorites: updatedFavorites };
  }),
  reorderFavorites: (startIndex, endIndex) => set((state) => {
    const result = Array.from(state.favorites);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    localStorage.setItem('favorites', JSON.stringify(result));
    return { favorites: result };
  }),
}));

export default useStore;