import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Spinner from '../assets/Spinner';
import Link from 'next/link';
import useStore from '../zustand/store';

interface Character {
  id: number;
  name: string;
  image: string;
}

export const ProductComponent: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const favorites = useStore((state) => state.favorites);
  const setFavorites = useStore((state) => state.setFavorites);
  const addFavorite = useStore((state) => state.addFavorite);
  const removeFavorite = useStore((state) => state.removeFavorite);
  const searchTerm = useStore((state) => state.searchTerm);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        setCharacters(response.data.results);
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [setFavorites]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gray-100 min-h-screen mt-10">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <p className="text-pink-600">Sitio por Bri</p>
          <hr className="border-gray-300 mt-5" />
        </header>
        <h2 className="text-xl font-bold mb-8 text-center">Galería de Personajes</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCharacters.map((character) => (
            <li
              key={character.id}
              className={classNames(
                'bg-white p-4 rounded-lg shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105 relative',
                {
                  'border-4 border-blue-500': favorites.includes(character.id),
                }
              )}
            >
              <div className="relative">
                <img src={character.image} alt={character.name} className="w-full h-auto rounded-lg mb-4" />
                <svg xmlns="http://www.w3.org/2000/svg" fill={favorites.includes(character.id) ? 'currentColor' : 'none'} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 absolute top-2 right-2 cursor-pointer" onClick={() => toggleFavorite(character.id)}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{character.name}</h3>
              <Link href={`/Character/${character.id}`}>
                <span className="text-blue-500 hover:text-blue-700 text-center block cursor-pointer">
                  Ver más
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};