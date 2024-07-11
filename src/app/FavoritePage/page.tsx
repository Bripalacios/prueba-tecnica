"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import useStore from '../zustand/store';

interface Character {
  id: number;
  name: string;
  image: string;
}

const FavoritePage: React.FC = () => {
  const favorites = useStore((state) => state.favorites);
  const setFavorites = useStore((state) => state.setFavorites);
  const reorderFavorites = useStore((state) => state.reorderFavorites);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, [setFavorites]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character');
        setCharacters(response.data.results.filter((character: Character) => favorites.includes(character.id)));
        setLoading(false);
      } catch (err) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [favorites]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    reorderFavorites(result.source.index, result.destination.index);
  };

  const toggleFavorite = (id: number) => {
    let updatedFavorites: number[];
    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter(favId => favId !== id);
    } else {
      updatedFavorites = [...favorites, id];
    }
    setFavorites(updatedFavorites);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-gray-100 min-h-screen mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <p className="text-pink-600">Sitio por Bri</p>
          <hr className="border-gray-300 mt-5" />
          <button onClick={() => router.back()} className="mt-4 bg-pink-500 text-white py-2 px-4 rounded">
            Volver
          </button>
        </header>
        <h2 className="text-xl font-bold mb-8 text-center">Personajes Favoritos</h2>
        {characters.length === 0 ? (
          <p className="text-center">No tienes personajes favoritos.</p>
        ) : (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="favorites">
              {(provided) => (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" {...provided.droppableProps} ref={provided.innerRef}>
                  {characters.map((character, index) => (
                    <Draggable key={character.id} draggableId={`${character.id}`} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={classNames(
                            'bg-white p-4 rounded-lg shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105 relative',
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
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default FavoritePage;