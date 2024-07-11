"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function CharacterDetails({ params }: { params: { id: string } }) {
  const [character, setCharacter] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${params.id}`);
        setCharacter(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching character data');
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [params.id]);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <Link href="/">
          <span className="mb-6 inline-block bg-[#ffccd5] text-white font-semibold py-2 px-4 rounded hover:bg-[#ffb3ba] transition duration-300 ease-in-out">
            ← Regresar al Home
          </span>
        </Link>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 w-full md:pr-8">
            <h1 className="text-4xl font-bold mb-6">{character.name}</h1>
            <p className="text-lg mb-2"><strong>Nombre:</strong> {character.name}</p>
            <p className="text-lg mb-2"><strong>Especie:</strong> {character.species}</p>
            <p className="text-lg mb-2"><strong>Género:</strong> {character.gender}</p>
            <p className="text-lg mb-2"><strong>Estado:</strong> {character.status}</p>
          </div>
          <div className="md:w-1/2 w-full text-center">
            <img src={character.image} alt={character.name} className="w-full h-auto rounded-lg mb-4 md:mb-0" />
          </div>
        </div>
      </div>
    </div>
  );
}