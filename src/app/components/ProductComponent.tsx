"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classNames from 'classnames';
import Spinner from '../assets/Spinner';


export const ProductComponent: React.FC = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCharacterId, setSelectedCharacterId] = useState<number | null>(null);

  useEffect(() => {
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
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className=" bg-gray-100 min-h-screen mt-10">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <p className="text-pink-600">Sitio por Bri</p>
 
          <hr className="border-gray-300 mt-5" />
        </header>
        <h2 className="text-xl font-bold mb-8 text-center">Galería de Personajes</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((character) => (
            <li
              key={character.id}
              className={classNames(
                'bg-white p-4 rounded-lg shadow-lg cursor-pointer transform transition-transform duration-200 hover:scale-105',
                {
                  'border-4 border-blue-500': selectedCharacterId === character.id,
                }
              )}
              onClick={() => setSelectedCharacterId(character.id)}
            >
              <h3 className="text-xl font-semibold mb-4 text-center">{character.name}</h3>
              <img src={character.image} alt={character.name} className="w-full h-auto rounded-lg mb-4" />
              <a
                href={`https://rickandmortyapi.com/api/character/${character.id}`}
                className="text-blue-500 hover:text-blue-700 text-center block"
                target="_blank" rel="noopener noreferrer"
              >
                Ver más
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductComponent;