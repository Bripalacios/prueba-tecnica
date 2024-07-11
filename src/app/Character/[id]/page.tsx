"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">{character.name}</h1>
      <img src={character.image} alt={character.name} className="w-full h-auto rounded-lg mb-4" />
      <p><strong>Status:</strong> {character.status}</p>
      <p><strong>Species:</strong> {character.species}</p>
      <p><strong>Gender:</strong> {character.gender}</p>
    </div>
  );
}